import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Biasanya simpan di .env
// NEXTAUTH_SECRET atau JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // 1. Cek input
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password required" }, { status: 400 });
        }

        // 2. Cari user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // 3. Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // 4. Buat token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5. Simpan ke cookie (HttpOnly biar aman)
        const response = NextResponse.json(
            { message: "Login success", role: user.role }, // ⬅️ kirim role ke client
            { status: 200 }
        );
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 hari
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
