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

        if (!response.ok) {
            console.error("Gemini error:", data);
            return NextResponse.json({ error: "Gemini API error", details: data }, { status: 502 });
        }

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Maaf, saya tidak bisa merespons saat ini.";

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("MindBot API Error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
