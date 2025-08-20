import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const resetRecord = await prisma.passwordResetToken.findUnique({ where: { token } });

        if (!resetRecord || resetRecord.expiresAt < new Date()) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Hash password baru
        const hashed = await bcrypt.hash(password, 10);

        // Update password user
        await prisma.user.update({
            where: { id: decoded.id },
            data: { password: hashed },
        });

        // Hapus token biar sekali pakai
        await prisma.passwordResetToken.delete({ where: { token } });

        return NextResponse.json({ message: "Password reset successfully" });
    } catch (err) {
        console.error("Reset password error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
