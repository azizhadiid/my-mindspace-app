// src/app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server'; // 🔄 Import NextRequest
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-utils';


// Fungsi GET: Mengambil riwayat chat
export async function GET(req: NextRequest) { // 🔄 Tambahkan req sebagai parameter
    try {
        const tokenPayload = await verifyAuth(req); // 🔄 Panggil petugas keamanan
        if (!tokenPayload) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const adminId = process.env.ADMIN_USER_ID;
        if (!adminId) {
            return new NextResponse('Admin not configured', { status: 500 });
        }

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    // 🔄 Gunakan tokenPayload.id
                    { senderId: tokenPayload.id, receiverId: adminId },
                    { senderId: adminId, receiverId: tokenPayload.id },
                ],
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        return NextResponse.json(messages);

    } catch (error) {
        console.error("[CHAT_GET_ERROR]", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}


// Fungsi POST: Mengirim pesan baru
export async function POST(req: NextRequest) { // 🔄 Tambahkan req sebagai parameter
    try {
        const tokenPayload = await verifyAuth(req); // 🔄 Panggil petugas keamanan
        if (!tokenPayload) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const adminId = process.env.ADMIN_USER_ID;
        if (!adminId) {
            return new NextResponse('Admin not configured', { status: 500 });
        }

        const body = await req.json();
        const { content } = body;

        if (!content) {
            return new NextResponse('Content is required', { status: 400 });
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId: tokenPayload.id, // 🔄 Gunakan tokenPayload.id
                receiverId: adminId,
                content: content,
            }
        });

        return NextResponse.json(newMessage);

    } catch (error) {
        console.error("[CHAT_POST_ERROR]", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}