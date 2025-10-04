import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import midtransClient from "midtrans-client";

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

        // 🔎 Ambil detail booking dari order_id
        // Misalnya orderId format: consult-{userId}-timestamp
        const [_, userId] = orderId.split("-");

        if (transactionStatus === "capture" || transactionStatus === "settlement") {
            // sukses bayar
            await prisma.consultation.create({
                data: {
                    userId: userId, // relasi otomatis ke tabel User
                    name_psikolog: body.item_details?.[0]?.name ?? "Unknown Psychologist",
                    type: "video",
                    date: new Date(),
                    urgency: "medium",
                    status: "pay",
                    main_topic: "General Consultation", // <-- WAJIB isi
                    description: "", // <-- optional, bisa kosong
                },
            });
            // console.log("Midtrans Notification:", statusResponse);
            // console.log("Body:", body);
            // console.log("Extracted userId:", userId);

        } else if (transactionStatus === "pending") {
            await prisma.consultation.create({
                data: {
                    userId: userId,
                    name_psikolog: body.item_details?.[0]?.name ?? "Unknown Psychologist",
                    type: "video",
                    date: new Date(),
                    urgency: "medium",
                    status: "pending",
                    main_topic: "General Consultation",
                    description: "",
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
