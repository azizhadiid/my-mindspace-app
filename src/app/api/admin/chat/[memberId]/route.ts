// app/api/admin/chat/[memberId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromRequest } from "@/lib/auth-utils";
// import { z } from "zod";

// // Skema validasi untuk Zod
// const messageSchema = z.object({
//     content: z.string().min(1, "Content required"),
// });

/**
 * GET: Mengambil riwayat chat spesifik antara Admin dan Member
 */
export async function GET(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    const user = await getCurrentUserFromRequest(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { memberId } = params;
    if (!memberId) {
        return NextResponse.json({ error: "Member ID required" }, { status: 400 });
    }

    try {
        // Logika ini mirip dengan GET di sisi member, tapi dari perspektif admin
        // Mengambil semua chat antara (SEMUA ADMIN) dan (MEMBER INI)
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    // 1. Pesan DARI member ini KE admin
                    {
                        senderId: memberId,
                        receiver: { role: "ADMIN" },
                    },
                    // 2. Pesan DARI admin KE member ini
                    {
                        sender: { role: "ADMIN" },
                        receiverId: memberId,
                    },
                ],
            },
            include: {
                sender: { select: { id: true, name: true, role: true } },
                receiver: { select: { id: true, name: true, role: true } },
            },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json(messages);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * POST: Admin mengirim pesan ke Member
 */
export async function POST(req: Request, { params }: { params: { memberId: string } }) {
    const user = await getCurrentUserFromRequest(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { memberId } = params;

    const member = await prisma.user.findFirst({
        where: { id: memberId, role: "MEMBER" },
    });
    if (!member) {
        return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    try {
        const body = await req.json();
        if (!body.content || typeof body.content !== "string" || body.content.trim().length === 0) {
            return NextResponse.json({ error: "Content required" }, { status: 400 });
        }

        const createdMessage = await prisma.message.create({
            data: {
                senderId: user.id,
                receiverId: memberId,
                content: body.content.trim(),
            },
            include: {
                sender: { select: { id: true, name: true, role: true } },
                receiver: { select: { id: true, name: true, role: true } },
            },
        });

        return NextResponse.json(createdMessage, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}