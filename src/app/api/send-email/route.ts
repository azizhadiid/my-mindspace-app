import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "api-key": process.env.BREVO_API_KEY!, // ambil dari .env
            },
            body: JSON.stringify({
                sender: {
                    email: process.env.BREVO_SENDER_EMAIL,
                    name: process.env.BREVO_SENDER_NAME,
                },
                to: [
                    {
                        email: process.env.BREVO_SENDER_EMAIL, // email admin penerima pesan
                    },
                ],
                subject: `Pesan baru dari ${name}`,
                htmlContent: `
          <h2>Pesan Baru dari Website</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Pesan:</strong></p>
          <p>${message}</p>
        `,
            }),
        });

        if (!res.ok) {
            const error = await res.json();
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
