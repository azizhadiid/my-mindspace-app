import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import midtransClient from "midtrans-client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Midtrans Config
const snap = new midtransClient.Snap({
    isProduction: false, // ganti true kalau sudah live
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
});

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export async function POST(req: Request) {
    try {
        // 1. Otentikasi: Ambil token dari cookie
        const cookieStore = await cookies(); // <-- TAMBAHKAN AWAIT DI SINI
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        // Verifikasi token untuk mendapatkan user ID
        let payload: JwtPayload;
        try {
            payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        } catch (error) {
            return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        // 2. Ambil dan validasi data dari body request
        const body = await req.json();
        const { psychologistName, date, time, type, topic, description, urgency, price } = body;

        if (!psychologistName || !date || !time || !type || !topic || !urgency || !price) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 3. Transformasi data tanggal dan waktu
        // Gabungkan string tanggal dan waktu menjadi objek Date yang valid
        const consultationDateTime = new Date(`${date}T${time}`);
        if (isNaN(consultationDateTime.getTime())) {
            return NextResponse.json({ error: "Invalid date or time format" }, { status: 400 });
        }

        // 4. Simpan ke database menggunakan Prisma
        const newConsultation = await prisma.consultation.create({
            data: {
                userId: payload.id, // ID pengguna dari token JWT
                name_psikolog: psychologistName,
                type: type,
                date: consultationDateTime,
                main_topic: topic,
                description: description || null, // Handle deskripsi opsional
                urgency: urgency,
                // status default 'pending' akan diatur oleh Prisma
            },
        });

        // 💳 Buat transaksi Midtrans
        const transaction = await snap.createTransaction({
            transaction_details: {
                order_id: `consult-${newConsultation.id}-${Date.now()}`,
                gross_amount: parseInt(price.replace(/\D/g, "")), // ambil angka dari "Rp 350.000"
            },
            customer_details: {
                first_name: payload.email.split("@")[0],
                email: payload.email,
            },
            item_details: [
                {
                    id: "consultation",
                    price: parseInt(price.replace(/\D/g, "")),
                    quantity: 1,
                    name: `Consultation with ${psychologistName}`,
                },
            ],
        });

        // 5. Beri respons sukses
        return NextResponse.json({ token: transaction.token });

    } catch (error) {
        console.error("Failed to create consultation:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}