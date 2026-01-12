// src/app/api/send-email/route.ts

import { NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/brevo';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Validasi input sederhana
        if (!name || !email || !message) {
            return NextResponse.json({ error: { message: 'All fields are required' } }, { status: 400 });
        }

        const subject = `New Contact Message from ${name}`;

        // --- DESAIN EMAIL BARU (HTML) ---
        const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color:#f8fafc; padding:40px 0; color:#334155;">
            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background:#ffffff; border-radius:16px; box-shadow:0 10px 25px rgba(0,0,0,0.05); overflow:hidden; border: 1px solid #e2e8f0;">
                
                <tr>
                    <td style="background: linear-gradient(135deg, #ec4899 0%, #ef4444 100%); padding:40px 30px; text-align:center;">
                        <h2 style="color:#ffffff; margin:0; font-size:24px; font-weight:800; letter-spacing: -0.5px;">
                            New Message Received! 📬
                        </h2>
                        <p style="color:rgba(255,255,255,0.9); margin:8px 0 0; font-size:15px; font-weight:500;">
                            You have a new inquiry from the Contact Form
                        </p>
                    </td>
                </tr>
                
                <tr>
                    <td style="padding:40px 30px;">
                        
                        <div style="background-color:#fff1f2; border-left: 4px solid #ec4899; padding:20px; border-radius:8px; margin-bottom:30px;">
                            <p style="margin:0 0 10px; font-size:14px; color:#831843; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">
                                Sender Details
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="30" style="vertical-align:top; padding-bottom:8px;">👤</td>
                                    <td style="padding-bottom:8px;">
                                        <strong style="color:#1e293b;">${name}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30" style="vertical-align:top;">✉️</td>
                                    <td>
                                        <a href="mailto:${email}" style="color:#ec4899; text-decoration:none; font-weight:500;">${email}</a>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <p style="color:#64748b; font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
                            Message Content:
                        </p>
                        <div style="background-color:#f1f5f9; border:1px solid #e2e8f0; border-radius:12px; padding:25px; font-size:16px; line-height:1.6; color:#334155; font-style:italic;">
                            "${message}"
                        </div>
                        
                        <div style="text-align:center; margin-top:40px;">
                            <a href="mailto:${email}?subject=Re: Response to your inquiry via MindSpace" 
                               style="display:inline-block; background: linear-gradient(to right, #ec4899, #ef4444); color:#ffffff; font-weight:bold; text-decoration:none; padding:14px 32px; border-radius:50px; box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3); transition: all 0.2s ease;">
                                ↩️ Reply to ${name}
                            </a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td style="background-color:#f8fafc; padding:20px; text-align:center; border-top:1px solid #e2e8f0;">
                        <p style="color:#94a3b8; font-size:12px; margin:0;">
                            This email was sent automatically from <strong>MindSpace Website</strong>.
                        </p>
                        <p style="color:#94a3b8; font-size:12px; margin:5px 0 0;">
                            © ${new Date().getFullYear()} MindSpace Inc. All rights reserved.
                        </p>
                    </td>
                </tr>
                
            </table>
        </div>
        `;

        // Kirim ke Admin (Email Anda)
        // Pastikan process.env.BREVO_SENDER_EMAIL adalah email admin Anda
        // Di sini kita mengirim KE admin (email tujuan = sender email kita sendiri di env, atau bisa hardcode email admin lain)
        const adminEmail = process.env.BREVO_SENDER_EMAIL || "azizalhadiid55@gmail.com";

        await sendBrevoEmail(adminEmail, subject, htmlContent);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending contact email:', error);
        return NextResponse.json({ error: { message: 'Failed to send email' } }, { status: 500 });
    }
}