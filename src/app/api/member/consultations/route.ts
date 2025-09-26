import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

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
        const { psychologistName, date, time, type, topic, description, urgency } = body;

        if (!psychologistName || !date || !time || !type || !topic || !urgency) {
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

        // 5. Beri respons sukses
        return NextResponse.json(newConsultation, { status: 201 });

    } catch (error) {
        console.error("Failed to create consultation:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}