import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        // Cari token di database
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!resetToken) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // Cek expired
        if (resetToken.expiresAt < new Date()) {
            return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
        }

        // Hash password baru
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password
        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword },
        });

        // Hapus token agar tidak bisa dipakai lagi
        await prisma.passwordResetToken.delete({
            where: { id: resetToken.id },
        });

        return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
