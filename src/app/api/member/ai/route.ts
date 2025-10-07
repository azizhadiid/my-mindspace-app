import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const runtime = 'edge';

// Fungsi untuk mengubah pesan menjadi format yang dimengerti Google
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
    contents: messages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        })),
});

export async function POST(req: Request) {
    const { messages } = await req.json();

    // 1. Ambil pesan terakhir dari pengguna
    const lastUserMessage = messages[messages.length - 1].content;

    // 2. (RAG) Cari konten relevan di database Anda
    const relevantTips = await prisma.mentalHealthTip.findMany({
        where: {
            OR: [
                { title: { contains: lastUserMessage, mode: 'insensitive' } },
                { content: { contains: lastUserMessage, mode: 'insensitive' } },
                { topic: { contains: lastUserMessage, mode: 'insensitive' } },
            ],
        },
        take: 3,
    });

    // 3. Buat konteks dari data yang ditemukan untuk diberikan ke Gemini
    const context = relevantTips.length > 0
        ? `Berikut adalah beberapa tips dan informasi relevan dari database MindspaceApp yang bisa Anda gunakan sebagai referensi utama:\n\n` +
        relevantTips.map(tip => `## ${tip.title}\n${tip.content}`).join('\n\n') +
        `\n\n---
      Berdasarkan informasi di atas, jawab pertanyaan pengguna dengan empati.`
        : '';

    // 4. Gabungkan system prompt, riwayat chat, dan konteks dari database
    const systemPrompt = `Anda adalah "MindBot", asisten AI dari MindspaceApp yang berempati, suportif, dan bijaksana. Tugas Anda adalah memberikan tips, wawasan, dan dukungan terkait kesehatan mental berdasarkan pengetahuan Anda dan informasi yang diberikan. Selalu gunakan bahasa yang ramah, positif, dan mudah dimengerti. 
  
  PENTING: Selalu berikan disclaimer bahwa Anda bukan pengganti profesional medis. Jika topik sangat sensitif atau menunjukkan krisis, sarankan pengguna untuk segera mencari bantuan profesional dari psikolog atau psikiater.
  
  JAWAB SELALU DALAM BAHASA INDONESIA.`;

    const promptWithContext = [
        { role: 'system', content: systemPrompt },
        ...messages,
        // Tambahkan konteks secara "diam-diam" ke dalam history
        ...(context ? [{ role: 'system', content: `[Konteks Tambahan]\n${context}` }] : []),
    ];

    // 5. Panggil Gemini API dengan format yang sudah disiapkan
    const geminiStream = await genAI
        .getGenerativeModel({ model: 'gemini-1.5-flash' })
        .generateContentStream(buildGoogleGenAIPrompt(promptWithContext));

    // 6. Konversi output Gemini ke stream yang bisa dibaca frontend
    const stream = GoogleGenerativeAIStream(geminiStream);

    // 7. Kirimkan stream sebagai respons
    return new StreamingTextResponse(stream);
}
