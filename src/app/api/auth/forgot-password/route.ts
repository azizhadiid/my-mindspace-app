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
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/resetPassword?token=${token}`;
        const lockIcon = "https://img.icons8.com/ios-filled/50/ffffff/lock.png"; // contoh icon putih transparan

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; background-color:#f4f4f7; padding:40px 0; color:#333;">
                <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background:#ffecfe; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
                <tr>
                    <td style="padding:20px; text-align:center;">
                    <img src="${lockIcon}" alt="Lock Icon" width="50" height="50" style="display:block; margin:0 auto 10px;" />
                    <h1 style="color:#ffffff; margin:0; font-size:24px;">MindSpace</h1>
                    <h2 style="color:#111827; font-size:24px; margin-bottom:10px;">Forgot your password?</h2>
                    <p style="color:#6b7280; font-size:16px; line-height:24px; margin-bottom:30px;">
                        Hey ${user.name || ""}, we received a request to reset your password.<br/>
                        Let’s get you a new one!
                    </p>
                    <a href="${resetUrl}" style="display:inline-block; background:#4f46e5; color:#ffffff; font-weight:bold; text-decoration:none; padding:14px 28px; border-radius:6px;">
                        RESET MY PASSWORD
                    </a>
                    <p style="color:#6b7280; font-size:14px; line-height:20px; margin-top:30px;">
                        Having trouble? Copy and paste this link into your browser:<br/>
                        <a href="${resetUrl}" style="color:#4f46e5; word-break:break-all;">${resetUrl}</a>
                    </p>
                    <p style="color:#9ca3af; font-size:12px; margin-top:40px;">
                        Didn’t request a password reset? You can safely ignore this email.
                    </p>
                    </td>
                </tr>
                </table>
                <div style="text-align:center; margin-top:30px; color:#9ca3af; font-size:12px;">
                <p>MindSpace © ${new Date().getFullYear()}</p>
                </div>
            </div>       
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