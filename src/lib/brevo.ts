// file: src/lib/brevo.ts

const brevoApiKey = process.env.BREVO_API_KEY;

export async function sendBrevoEmail(toEmail: string, subject: string, htmlContent: string) {
    if (!brevoApiKey) {
        console.error("Brevo API key is not set. Please check your .env.local file.");
        return;
    }

    const payload = {
        sender: {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [
            {
                email: toEmail,
            },
        ],
        subject,
        htmlContent,
    };

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "api-key": brevoApiKey,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to send email via Brevo:", errorData);
            throw new Error("Failed to send email");
        }

        console.log("Email sent successfully via Brevo!");
    } catch (error) {
        console.error("An error occurred while sending email:", error);
        throw error;
    }
}

// 👇 TAMBAHKAN FUNGSI BARU DI BAWAH INI 👇
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
    const formattedPhone = psychologistPhone.startsWith('0')
        ? '62' + psychologistPhone.substring(1)
        : psychologistPhone;
    const waLink = `https://wa.me/${formattedPhone}`;

    // Format tanggal agar mudah dibaca
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Asia/Jakarta' // Pastikan timezone sesuai
    }).format(consultationDate);

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

    // Panggil fungsi generic yang sudah Anda buat
    try {
        await sendBrevoEmail(toEmail, subject, htmlContent);
        console.log(`Email konfirmasi konsultasi berhasil dikirim ke ${toEmail}`);
    } catch (error) {
        console.error("Gagal mengirim email konfirmasi konsultasi:", error);
        // Penting: Jangan throw error lagi agar proses utama tidak berhenti
    }
}