// file: src/app/api/auth/reset-password/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { token, newPassword } = await request.json();

        // 1. Validasi password baru
        if (!newPassword || newPassword.length < 6) {
            return NextResponse.json({ message: 'Password baru minimal 6 karakter.' }, { status: 400 });
        }

        // 2. Cari token di database dan cek apakah token valid
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return NextResponse.json({ message: 'Token tidak valid atau sudah kedaluwarsa.' }, { status: 400 });
        }

        // 3. Enkripsi password baru
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 4. Perbarui password pengguna
        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword },
        });

        // 5. Hapus token agar tidak bisa digunakan lagi
        await prisma.passwordResetToken.delete({
            where: { id: resetToken.id },
        });

        return NextResponse.json({ message: 'Password berhasil direset!' }, { status: 200 });

    } catch (error) {
        console.error('Error saat proses reset password:', error);
        return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}