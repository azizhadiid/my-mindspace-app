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

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; background-color:#f4f4f7; padding:40px 0; color:#333;">
                <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background:#fff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
                    <tr>
                        <td style="background: linear-gradient(to right, #ef4444, #ec4899); padding:40px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:bold;">
                                Please reset your password
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:40px; text-align:left;">
                            <p style="color:#6b7280; font-size:16px; line-height:24px; margin-bottom:20px;">
                                Hello,
                            </p>
                            <p style="color:#6b7280; font-size:16px; line-height:24px; margin-bottom:30px;">
                                We have sent you this email in response to your request to reset your password on your MindSpace account.
                            </p>
                            <p style="color:#6b7280; font-size:16px; line-height:24px; margin-bottom:30px;">
                                To reset your password, please follow the link below:
                            </p>
                            <div style="text-align:center; margin-bottom:40px;">
                                <a href="${resetUrl}" style="display:inline-block; background: linear-gradient(to right, #ef4444, #ec4899); color:#ffffff; font-weight:bold; text-decoration:none; padding:14px 28px; border-radius:9999px;">
                                    Reset Password
                                </a>
                            </div>
                            <p style="color:#9ca3af; font-size:14px; text-align:center;">
                                Please ignore this email if you did not request a password change.
                            </p>
                        </td>
                    </tr>
                </table>
                <div style="text-align:center; margin-top:30px; color:#9ca3af; font-size:12px;">
                    <p>MindSpace © ${new Date().getFullYear()}</p>
                    <p>1912 Mcwhorter Road, FL 30046</p>
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