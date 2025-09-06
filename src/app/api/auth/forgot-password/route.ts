// file: src/app/api/auth/forgot-password/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendBrevoEmail } from '@/lib/brevo';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        // Cari user di database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Untuk keamanan, berikan pesan yang sama apakah email terdaftar atau tidak
            return NextResponse.json({ message: 'If the email is registered, a link will be sent.' }, { status: 200 });
        }

        // Buat token reset password yang unik
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // Token valid 1 jam

        // Simpan token di tabel PasswordResetToken
        await prisma.passwordResetToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt,
            },
        });

        // Kirim email berisi tautan reset
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
        const emailHtml = `
            <p>Halo,</p>
            <p>Kami menerima permintaan untuk mereset password akun Anda. Silakan klik tautan di bawah ini untuk melanjutkan:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>Tautan ini akan kedaluwarsa dalam 1 jam.</p>
            <p>Jika Anda tidak meminta reset password ini, abaikan email ini.</p>
        `;

        await sendBrevoEmail(user.email, "Reset Your Account Password", emailHtml);

        return NextResponse.json({ message: 'A password reset link has been sent to your email.' }, { status: 200 });

    } catch (error) {
        console.error('Error during forgot password process:', error);
        return NextResponse.json({ message: 'An error occurred on the server.' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}