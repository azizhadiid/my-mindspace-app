import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import midtransClient from "midtrans-client";
import { sendConsultationConfirmationEmail } from "@/lib/brevo";

const prisma = new PrismaClient();

const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // const statusResponse = await core.transaction.notification(body);
        const orderId = body.order_id;
        const transactionStatus = body.transaction_status;
        const details = body.consultationDetails;

        // 🔎 Ambil detail booking dari order_id
        // Misalnya orderId format: consult-{userId}-timestamp
        const [_, userId] = orderId.split("-");

        // Validasi sederhana
        if (!details) {
            return NextResponse.json({ error: "Missing consultation details" }, { status: 400 });
        }

        // Gabungkan tanggal dan waktu dari user menjadi satu objek Date
        const consultationDateTime = new Date(`${details.date}T${details.time}`);

        if (transactionStatus === "capture" || transactionStatus === "settlement") {
            // sukses bayar
            const newConsultation = await prisma.consultation.create({
                data: {
                    userId: userId,
                    name_psikolog: details.psychologistName, // <-- Gunakan data dari 'details'
                    type: details.type,                     // <-- Gunakan data dari 'details'
                    date: consultationDateTime,             // <-- Gunakan tanggal & waktu pilihan user
                    main_topic: details.topic,              // <-- Gunakan data dari 'details'
                    description: details.description,       // <-- Gunakan data dari 'details'
                    urgency: details.urgency,               // <-- Gunakan data dari 'details'
                    status: "pay", // atau "confirmed" sesuai logika Anda
                },
            });
            // --- MULAI LOGIKA PENGIRIMAN EMAIL ---
            console.log("Pembayaran berhasil, mencoba mengirim email...");

            // 2. Ambil data lengkap dari DB untuk dikirim via email
            const user = await prisma.user.findUnique({ where: { id: userId } });
            const psychologist = await prisma.psychologist.findUnique({ where: { id: details.psychologistId } });

            if (user && psychologist) {
                // 3. Panggil fungsi pengirim email dengan data yang relevan
                await sendConsultationConfirmationEmail({
                    toEmail: user.email,
                    userName: user.name || user.email.split('@')[0], // Fallback jika user tidak punya nama
                    psychologistName: psychologist.name,
                    psychologistPhone: psychologist.phoneNumber,
                    consultationDate: newConsultation.date,
                });
            } else {
                console.error(`Data User (ID: ${userId}) atau Psikolog (ID: ${details.psychologistId}) tidak ditemukan di DB.`);
            }
            // --- SELESAI LOGIKA PENGIRIMAN EMAIL ---

        } else if (transactionStatus === "pending") {
            await prisma.consultation.create({
                data: {
                    userId: userId,
                    name_psikolog: details.psychologistName, // <-- Gunakan data dari 'details'
                    type: details.type,                     // <-- Gunakan data dari 'details'
                    date: consultationDateTime,             // <-- Gunakan tanggal & waktu pilihan user
                    main_topic: details.topic,              // <-- Gunakan data dari 'details'
                    description: details.description,       // <-- Gunakan data dari 'details'
                    urgency: details.urgency,               // <-- Gunakan data dari 'details'
                    status: "pending", // atau "confirmed" sesuai logika Anda
                },
            });
        } else if (transactionStatus === "deny" || transactionStatus === "expire" || transactionStatus === "cancel") {
            // tidak usah simpan
            console.log("Payment failed/expired, no consultation saved");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Midtrans notification error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
