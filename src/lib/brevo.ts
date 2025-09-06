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