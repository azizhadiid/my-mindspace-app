// app/api/consultation/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function PATCH(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        // --- 1. Autorisasi: Cek Token & Role Admin (Sama seperti sebelumnya) ---
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
        if (decoded.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // --- 2. Ambil ID dari URL dan status baru dari Body Request ---
        const { id } = await context.params;
        const { status } = await req.json();

        // --- 3. Validasi Input ---
        if (!id) {
            return NextResponse.json({ error: 'Consultation ID is required' }, { status: 400 });
        }
        if (!status || !['pay', 'cancelled'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status provided' }, { status: 400 });
        }

        // --- 4. Update Data di Database menggunakan Prisma ---
        const updatedConsultation = await prisma.consultation.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            },
        });

        // --- 5. Kirim Response Sukses ---
        return NextResponse.json(updatedConsultation, { status: 200 });

    } catch (error: any) {
        console.error('Failed to update consultation:', error);

        // Handle jika ID tidak ditemukan
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}