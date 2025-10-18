// app/api/member/chat/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromRequest } from "@/lib/auth-utils";


export async function GET(req: Request) {
    const user = await getCurrentUserFromRequest(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // only members can access this endpoint
    if (user.role !== "MEMBER") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: user.id, receiver: { role: "ADMIN" } },
                    { receiverId: user.id, sender: { role: "ADMIN" } },
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
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const user = await getCurrentUserFromRequest(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "MEMBER") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    try {
        const body = await req.json();
        const content = (body.content || "").toString().trim();
        if (!content) return NextResponse.json({ error: "Content required" }, { status: 400 });

        // Pilih admin (mis: admin pertama) — bisa disesuaikan
        const admin = await prisma.user.findFirst({ where: { role: "ADMIN" }, orderBy: { createdAt: "asc" } });
        if (!admin) return NextResponse.json({ error: "No admin available" }, { status: 500 });

        const created = await prisma.message.create({
            data: {
                senderId: user.id,
                receiverId: admin.id,
                content,
            },
            include: {
                sender: { select: { id: true, name: true } },
                receiver: { select: { id: true, name: true } },
            },
        });

        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
