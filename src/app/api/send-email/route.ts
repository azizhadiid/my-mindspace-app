// file: src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { sendBrevoEmail } from "@/lib/brevo"; // Import fungsi helper yang sudah ada

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        // Validasi input
        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const subject = `Pesan baru dari ${name}`;

        // Buat konten HTML
        const htmlContent = `
          <h2>Pesan Baru dari Website</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Pesan:</strong></p>
          <p>${message}</p>
        `;

        // Gunakan fungsi dari brevo.ts, bukan fetch manual lagi
        // Target email dikirim ke email admin (BREVO_SENDER_EMAIL)
        await sendBrevoEmail(
            process.env.BREVO_SENDER_EMAIL as string,
            subject,
            htmlContent
        );

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Error sending email:", error); // Log error agar mudah debugging
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}