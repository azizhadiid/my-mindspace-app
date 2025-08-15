import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();

        // Validasi sederhana
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Lengkapi semua data" }, { status: 400 });
        }

        // Cek apakah email sudah ada
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role, // default: MEMBER
            },
        });

        // Hapus password dari objek user sebelum dikirim ke client untuk keamanan
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({ message: "User berhasil dibuat", user: userWithoutPassword }, { status: 201 }); // Status 201 Created
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}