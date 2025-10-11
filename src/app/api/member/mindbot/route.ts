import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-2.0-flash"; // atau gemini-1.5-pro, sesuai kebutuhan
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(req: Request) {
    try {
        const { input } = await req.json();

        if (!input) {
            return NextResponse.json({ error: "Missing input message" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
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
