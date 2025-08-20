import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ error: "Email not found" }, { status: 404 });
        }

        // Generate reset token (JWT exp 15 min)
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "15m" });

        // Simpan ke DB
        await prisma.passwordResetToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000),
            },
        });

        // Kirim email pakai Brevo
        await fetch("https://api.brevo.com/v3/smtp/azizalhadiid88@gmail.com", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": process.env.BREVO_API_KEY!, // simpan di .env
            },
            body: JSON.stringify({
                sender: { name: "MindSpace", email: "azizalhadiid88@gmail.com" },
                to: [{ email: user.email, name: user.name }],
                subject: "Reset Your Password",
                htmlContent: `
          <p>Hello ${user.name},</p>
          <p>Click link below to reset your password:</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/resetPassword?token=${token}">
            Reset Password
          </a>
        `,
            }),
        });

        return NextResponse.json({ message: "Reset email sent" });
    } catch (err) {
        console.error("Forgot password error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
