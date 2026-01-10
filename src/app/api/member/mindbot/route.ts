import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

// 🛠️ UPDATE: Menggunakan Gemini 2.5 Flash (Model Standar 2026)
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// 🧠 SYSTEM INSTRUCTION (ENFORCED ENGLISH)
const SYSTEM_INSTRUCTION = `
You are MindBot, a professional yet empathetic mental health assistant for "MindSpace".

CRITICAL RULES:
1. **LANGUAGE**: You must ONLY speak in ENGLISH. If the user speaks another language (like Indonesian), politely reply in English that you can only communicate in English.
2. **ROLE**: Act as a supportive counselor. Listen actively.
3. **SAFETY**: If a user mentions suicide or self-harm, IMMEDIATELY provide standard emergency hotline info.
4. **LIMITATION**: Do not provide medical diagnoses.
5. **CONTEXT**: You have access to the database of psychologists.
`;

export async function POST(req: Request) {
    try {
        const { input } = await req.json();

        // 1. Auth Check (Optional but recommended)
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        let userId: string | null = null;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey") as { id: string };
                userId = decoded.id;
            } catch (err) { console.warn("Token issue:", err); }
        }

        if (!input) return NextResponse.json({ error: "Input required" }, { status: 400 });
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return NextResponse.json({ error: "API Key missing" }, { status: 500 });

        // ==================================================================================
        // 🔍 DATABASE LOGIC: PSYCHOLOGIST & PRICE RECOMMENDATION
        // ==================================================================================

        // Regex untuk mendeteksi niat mencari psikolog atau tanya harga
        const doctorIntent = /(find|looking for|need|recommend|search) (psychologist|therapist|doctor|counselor)/i;
        const priceIntent = /(price|cost|fee|how much|expensive|cheap)/i;
        const problemIntent = /(anxiety|depression|stress|family|marriage|child|kid|teen|career|work|sleep|insomnia)/i;

        // Jika user bertanya tentang psikolog, harga, atau menyebutkan masalah spesifik
        if (doctorIntent.test(input) || priceIntent.test(input) || problemIntent.test(input)) {

            // 1. Deteksi Spesialisasi berdasarkan input user
            let specializationFilter: string | undefined;

            // Mapping kata kunci user ke data 'specialization' di database
            if (/child|kid|baby|parenting/i.test(input)) specializationFilter = "Children";
            else if (/teen|adolescent|school/i.test(input)) specializationFilter = "Teenager";
            else if (/family|marriage|wife|husband|couple|divorce/i.test(input)) specializationFilter = "Family";
            else if (/career|work|job|burnout|office/i.test(input)) specializationFilter = "Career";
            else if (/anxiety|depression|stress|mood/i.test(input)) specializationFilter = "Clinical"; // Asumsi ada spesialisasi 'Clinical' atau sesuaikan

            // 2. Query Database
            const whereClause: Prisma.PsychologistWhereInput = {
                verified: true, // Hanya ambil yang terverifikasi
                ...(specializationFilter && {
                    specialization: { contains: specializationFilter, mode: Prisma.QueryMode.insensitive }
                })
            };

            const psychologists = await prisma.psychologist.findMany({
                where: whereClause,
                orderBy: { rating: 'desc' }, // Urutkan rating tertinggi
                take: 3
            });

            // 3. Susun Jawaban (Strictly English)
            if (psychologists.length === 0) {
                // Jika tidak ada spesialisasi khusus, tawarkan yang umum
                if (specializationFilter) {
                    return NextResponse.json({
                        reply: `I currently couldn't find a specialist specifically for *${specializationFilter}*. However, you can browse our top-rated psychologists in the "Consultation" menu.`
                    });
                }
                // Fallback ke general AI jika database kosong
            } else {
                const formattedList = psychologists.map(p => {
                    // Format harga ke IDR (tapi teks tetap Inggris)
                    // Asumsi field p.price string "150000" atau angka
                    return `• **${p.name}**\n  - Specialization: ${p.specialization}\n  - Rating: ⭐ ${p.rating}/5\n  - Price: ${p.price}`;
                }).join("\n\n");

                const intro = specializationFilter
                    ? `Here are our best psychologists specializing in **${specializationFilter}**:`
                    : `Here are some of our highly-rated psychologists based on your request:`;

                return NextResponse.json({
                    reply: `${intro}\n\n${formattedList}\n\nWould you like to book a session with one of them?`
                });
            }
        }

        // ==================================================================================
        // 🤖 AI CHAT LOGIC (Strictly English via System Instruction)
        // ==================================================================================

        const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                contents: [{ role: "user", parts: [{ text: input }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 300, // Jawaban padat
                }
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 429) {
                return NextResponse.json({ reply: "I'm currently overwhelmed. Please try again in a moment. (Quota Limit)" });
            }
            return NextResponse.json({ reply: "I am having trouble connecting right now. Please try again." });
        }

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm listening...";
        return NextResponse.json({ reply });

    } catch (err) {
        console.error("Server Error:", err);
        return NextResponse.json({ reply: "Internal system error." }, { status: 500 });
    }
}