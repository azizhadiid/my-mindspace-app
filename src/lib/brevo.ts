// src/lib/brevo.ts

/**
 * Fungsi utama untuk mengirim email menggunakan Brevo API (SMTP)
 */
export async function sendBrevoEmail(toEmail: string, subject: string, htmlContent: string) {
    // 1. PENTING: Baca variabel environment DI DALAM fungsi (Runtime)
    // Agar terbaca dengan benar saat fungsi dipanggil
    const apiKey = process.env.BREVO_API_KEY;
    const senderName = process.env.BREVO_SENDER_NAME || "MindSpace Support";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "admin@mindspace.com";

    // 2. Debugging (Cek apakah key terbaca)
    if (!apiKey) {
        console.error("❌ CRITICAL ERROR: BREVO_API_KEY is missing in .env file.");
        throw new Error("Server configuration error: Missing Email API Key");
    }

    // URL API Brevo v3
    const url = "https://api.brevo.com/v3/smtp/email";

    // Payload sesuai dokumentasi Brevo
    const payload = {
        sender: {
            name: senderName,
            email: senderEmail,
        },
        to: [
            {
                email: toEmail,
            },
        ],
        subject: subject,
        htmlContent: htmlContent,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": apiKey, // Header wajib untuk autentikasi
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Failed to send email via Brevo:", JSON.stringify(errorData, null, 2));
            throw new Error(`Email failed: ${errorData.message || response.statusText}`);
        }

        console.log(`✅ Email sent successfully to ${toEmail}`);
        return await response.json();

    } catch (error) {
        console.error("⚠️ Error in sendBrevoEmail function:", error);
        throw error;
    }
}

/**
 * Fungsi khusus untuk mengirim email konfirmasi konsultasi
 * Memanggil fungsi sendBrevoEmail di dalamnya
 */
export async function sendConsultationConfirmationEmail({
    toEmail,
    userName,
    psychologistName,
    psychologistPhone,
    consultationDate
}: {
    toEmail: string;
    userName: string;
    psychologistName: string;
    psychologistPhone: string;
    consultationDate: Date;
}) {
    const subject = "✅ Confirmation of Your Consultation Schedule Has Been Successful";

    // Format nomor telepon untuk link WhatsApp (misal: 0812... -> 62812...)
    // Pastikan psychologistPhone tidak undefined/null
    const phone = psychologistPhone || "";
    const formattedPhone = phone.startsWith('0')
        ? '62' + phone.substring(1)
        : phone;
    const waLink = `https://wa.me/${formattedPhone}`;

    // Format tanggal agar mudah dibaca (Bahasa Indonesia)
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Asia/Jakarta'
    }).format(new Date(consultationDate));

    // Buat konten HTML untuk email
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color:#f4f4f7; padding:40px 0; color:#333;">
        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background:#fff; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1); overflow:hidden; border: 1px solid #e5e7eb;">
            
            <tr>
                <td style="background: linear-gradient(to right, #ef4444, #ec4899); padding:30px 20px; text-align:center;">
                    <h1 style="color:#ffffff; margin:0; font-size:26px; font-weight:bold;">
                        Your Consultation Session is Confirmed!
                    </h1>
                    <p style="color:#fce7f3; margin:5px 0 0; font-size:16px;">
                        We have successfully received your payment.
                    </p>
                </td>
            </tr>
            
            <tr>
                <td style="padding:40px; text-align:left;">
                    <p style="color:#4b5563; font-size:18px; line-height:26px; margin:0 0 20px;">
                        Hallo <strong>${userName}</strong>,
                    </p>
                    <p style="color:#6b7280; font-size:16px; line-height:24px; margin-bottom:30px;">
                        Thank you for trusting us. We are pleased to inform you that your consultation session has been successfully confirmed.
                    </p>

                    <div style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:20px; margin-bottom:30px;">
                        <h3 style="margin:0 0 15px; font-size:18px; color:#1f2937;">Your Schedule Details:</h3>
                        <p style="font-size:16px; color:#4b5563; margin:0 0 10px;">
                            <strong>Psikolog:</strong> &nbsp; ${psychologistName}
                        </p>
                        <p style="font-size:16px; color:#4b5563; margin:0;">
                            <strong>Jadwal:</strong> &nbsp; ${formattedDate}
                        </p>
                    </div>
                    
                    <p style="color:#6b7280; font-size:16px; line-height:24px; margin-bottom:30px;">
                        The next step is to contact your psychologist via WhatsApp to start a conversation or confirm session details.
                    </p>
                    
                    <div style="text-align:center; margin-bottom:30px;">
                        <a href="${waLink}" target="_blank" style="display:inline-block; background-color:#25D366; color:#ffffff; font-weight:bold; text-decoration:none; padding:14px 28px; border-radius:50px;">
                            Contact via WhatsApp
                        </a>
                    </div>
                    
                    <p style="color:#9ca3af; font-size:14px; text-align:center;">
                        If you have any questions regarding your order, please contact our support team.
                    </p>
                </td>
            </tr>
            
        </table>
        
        <div style="text-align:center; margin-top:30px; color:#9ca3af; font-size:12px;">
            <p>MindSpace © ${new Date().getFullYear()}</p>
            <p>Jalan Sehat Jiwa No. 1, Jakarta, Indonesia</p>
        </div>
    </div>
    `;

    // Panggil fungsi generic sendBrevoEmail
    try {
        await sendBrevoEmail(toEmail, subject, htmlContent);
        console.log(`✅ Confirmation email sent to ${toEmail}`);
    } catch (error) {
        console.error("❌ Failed to send confirmation email:", error);
        // Kita tangkap error di sini agar tidak memutus flow transaksi utama (jika ada)
        // Tapi tetap di-log di server
    }
}