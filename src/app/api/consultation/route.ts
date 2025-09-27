// app/api/consultation/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function GET(req: NextRequest) {
    try {
        // --- 1. Autorisasi: Cek Token & Role Admin ---
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
        } catch (error) {
            return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
        }

        if (decoded.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden: Access denied' }, { status: 403 });
        }

        // --- 2. Ambil Parameter dari URL (Search & Pagination) ---
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '8', 10); // Samakan dengan itemsPerPage di frontend

        const skip = (page - 1) * limit;

        // --- 3. Buat Kondisi Query Prisma ---
        const whereCondition = search
            ? {
                OR: [
                    {
                        user: {
                            name: {
                                contains: search,
                                mode: 'insensitive' as const, // Case-insensitive search
                            },
                        },
                    },
                    {
                        name_psikolog: {
                            contains: search,
                            mode: 'insensitive' as const,
                        },
                    },
                    {
                        main_topic: {
                            contains: search,
                            mode: 'insensitive' as const,
                        },
                    },
                ],
            }
            : {};

        // --- 4. Fetch Data & Hitung Total ---
        const [consultations, totalItems] = await prisma.$transaction([
            prisma.consultation.findMany({
                where: whereCondition,
                include: {
                    user: { // Ambil data user terkait (untuk nama)
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc', // Tampilkan yang terbaru dulu
                },
                skip: skip,
                take: limit,
            }),
            prisma.consultation.count({ where: whereCondition }),
        ]);

        // --- 5. Kirim Response ---
        return NextResponse.json({
            data: consultations,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        });

    } catch (error) {
        console.error('Failed to fetch consultations:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// TODO: Anda bisa menambahkan fungsi POST, PUT, DELETE di sini nanti
// untuk handleAction (update status) dan handleDelete