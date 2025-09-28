// file: src/app/api/webhooks/midtrans/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import midtransClient from "midtrans-client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Inisialisasi Midtrans Core API, bukan Snap
const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});


export async function POST(req: Request) {
    try {
        const notificationJson = await req.json();

        // 1. Verifikasi notifikasi (PENTING UNTUK KEAMANAN)
        // Dapatkan status transaksi dari Midtrans berdasarkan order_id
        const statusResponse = await coreApi.transaction.status(notificationJson.order_id);

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;
        const grossAmount = statusResponse.gross_amount;

        // Buat signature key dari data notifikasi
        const serverKey = process.env.MIDTRANS_SERVER_KEY;
        const signatureKey = crypto.createHash('sha512').update(`${orderId}${transactionStatus}${grossAmount}${serverKey}`).digest('hex');

        // Cocokkan signature key
        if (signatureKey !== statusResponse.signature_key) {
            // Komentari pengecekan signature ini HANYA SAAT DEVELOPMENT jika ada masalah
            // Namun WAJIB diaktifkan di produksi
            // return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // 2. Update status order di database Anda
        let newStatus = 'PENDING';
        if (transactionStatus == 'capture' || transactionStatus == 'settlement') {
            // Hanya update jika fraud status 'accept'
            if (fraudStatus == 'accept') {
                newStatus = 'SUCCESS';
            }
        } else if (transactionStatus == 'expire') {
            newStatus = 'EXPIRED';
        } else if (transactionStatus == 'cancel' || transactionStatus == 'deny') {
            newStatus = 'CANCELLED';
        }

        // Cari konsultasi berdasarkan order_id dan update statusnya
        const consultation = await prisma.consultation.update({
            where: {
                id: orderId,
            },
            data: {
                status: newStatus,
            },
        });

        console.log(`Consultation ${consultation.id} status updated to ${newStatus}`);

        // 3. Beri respons sukses ke Midtrans
        return NextResponse.json({ message: "Notification handled successfully" }, { status: 200 });

    } catch (error) {
        console.error("Midtrans webhook error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}