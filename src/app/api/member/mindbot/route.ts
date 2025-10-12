import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

const GEMINI_MODEL = "gemini-2.0-flash"; // atau gemini-1.5-pro, sesuai kebutuhan
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(req: Request) {
    try {
        const { input } = await req.json();
        // 🧩 Ambil token dari cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        let userId: string | null = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey") as {
                    id: string;
                    email: string;
                    role: string;
                };
                userId = decoded.id;
            } catch (err) {
                console.warn("Invalid or expired token:", err);
            }
        }

        if (!input) {
            return NextResponse.json({ error: "Missing input message" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
        }

        // 🔍 Deteksi apakah pertanyaan tentang konsultasi
        const consultationPattern = /(konsultasi|consultation|jadwal konsultasi|status konsultasi)/i;
        // 🔍 Jika pertanyaan tentang konsultasi
        if (consultationPattern.test(input)) {
            if (!userId) {
                return NextResponse.json({
                    reply:
                        "You are not logged in yet 🌸 Please log in first to see your consultation schedule.",
                });
            }

            const consultations = await prisma.consultation.findMany({
                where: { userId },
                orderBy: { date: "asc" },
                take: 5,
            });

            if (consultations.length === 0) {
                return NextResponse.json({
                    reply:
                        "You currently don't have a consultation scheduled on MindSpace. You can create a new one by clicking the *Create New Consultation* menu. 🌿",
                });
            }

            // Format ke teks
            const formatted = consultations
                .map((c, i) => {
                    const date = new Date(c.date).toLocaleString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    const urgencyText =
                        c.urgency === "high"
                            ? "🔥 Urgent"
                            : c.urgency === "medium"
                                ? "⚡ Medium"
                                : "🕊️ Low";

                    return `${i + 1}. **${c.name_psikolog}** (${c.type}) – ${c.main_topic}
                        📅 ${date}
                        📌 Status: ${c.status}
                        🎯 Priority: ${urgencyText}`;
                })
                .join("\n\n");

            const reply = `Here is your consultation schedule at MindSpace:\n\n${formatted}\n\nHope your consultation session goes smoothly 🌼`;

            return NextResponse.json({ reply });
        }

        // 🔍 Deteksi apakah pertanyaan tentang psikolog terbaik
        const bestPsychologistPattern = /(psikolog terbaik|best psychologist|recommended psychologist|top psychologist)/i;

        if (bestPsychologistPattern.test(input)) {
            // 🔸 Ambil psikolog dengan rating tertinggi dari database
            const topPsychologists = await prisma.psychologist.findMany({
                orderBy: { rating: "desc" },
                take: 3, // misalnya ambil 3 terbaik
            });

            if (topPsychologists.length === 0) {
                return NextResponse.json({
                    reply: "There is currently no psychologist data on MindSpace.",
                });
            }

            // 🔸 Format jawaban alami
            const formatted = topPsychologists
                .map((p, i) => {
                    // Jika p.price berupa string (misalnya "250000"), ubah jadi number
                    const priceNumber = parseFloat(p.price.replace(/[^\d]/g, "")) || 0;

                    // Format ke Rupiah
                    const priceFormatted = new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                    }).format(priceNumber);

                    return `${i + 1}. **${p.name}** (${p.specialization}) – ⭐ ${p.rating.toFixed(
                        1
                    )}/5, experience ${p.experience}, cost ${priceFormatted}.`;
                })
                .join("\n");

            const reply = `Here are some of the best psychologists on MindSpace based on the highest ratings:\n\n${formatted}\n\nAll of these psychologists have been verified and are ready to help you 💬`;

            return NextResponse.json({ reply });
        }

        // Kirim permintaan ke Gemini
        const response = await fetch(GEMINI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: input }],
                    },
                ],
            }),
        });

        const data = await response.json();

        // 🔹 Cek error dari Gemini
        if (!response.ok) {
            console.error("Gemini error:", data);

            // 🔸 Tangani error kuota/token habis
            if (
                data.error?.status === "RESOURCE_EXHAUSTED" ||
                data.error?.message?.toLowerCase()?.includes("quota") ||
                data.error?.message?.toLowerCase()?.includes("exceeded") ||
                data.error?.message?.toLowerCase()?.includes("token")
            ) {
                return NextResponse.json({
                    reply:
                        "Sorry, MindBot is currently taking a break because the daily usage limit has been reached. Please try again later 💖",
                });
            }

            // 🔸 Tangani error key tidak valid
            if (data.error?.status === "UNAUTHENTICATED") {
                return NextResponse.json({
                    reply:
                        "Oops, MindBot is having trouble connecting to the server. Please try again later. 🌸",
                });
            }

            // 🔸 Default error lain
            return NextResponse.json(
                { reply: "Sorry, MindBot is experiencing problems. Please try again later 🌼" },
                { status: 502 }
            );
        }

        // ✅ Kalau sukses
        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I can't respond at this time.";

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("MindBot API Error:", err);
        return NextResponse.json(
            {
                reply:
                    "Oops, an error occurred on the server. Please try again later. 🌷",
            },
            { status: 500 }
        );
    }
}
