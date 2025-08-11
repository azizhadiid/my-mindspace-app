import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // 1. Cek user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "Email atau Password Anda Salah!" }, { status: 404 });
        }

        // 2. Verifikasi password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Email atau Password Anda Salah!" }, { status: 401 });
        }

        // 3. Buat JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        // 4. Simpan token di cookie
        const res = NextResponse.json({
            message: "Login sukses",
            role: user.role,
        });
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return res;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}
