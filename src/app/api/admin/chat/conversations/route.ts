// app/api/admin/chat/conversations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromRequest } from "@/lib/auth-utils";

export async function GET(req: Request) {
    const user = await getCurrentUserFromRequest(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        // 1. Ambil semua pesan yang melibatkan admin (baik sebagai pengirim atau penerima)
        // dan juga member.
        const allMessages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        sender: { role: "ADMIN" },
                        receiver: { role: "MEMBER" },
                    },
                    {
                        sender: { role: "MEMBER" },
                        receiver: { role: "ADMIN" },
                    },
                ],
            },
            include: {
                sender: { select: { id: true, name: true, role: true } },
                receiver: { select: { id: true, name: true, role: true } },
            },
            orderBy: {
                createdAt: "asc", // Ambil dari yang terlama ke terbaru
            },
        });

        // 2. Proses di server untuk mengelompokkan pesan berdasarkan member
        const conversations = new Map<
            string,
            {
                memberId: string;
                memberName: string;
                lastMessage: string;
                lastMessageTimestamp: Date;
                // Kita tidak bisa menghitung unread count tanpa field `isRead` di schema
                unread: number;
            }
        >();

        for (const message of allMessages) {
            // Tentukan siapa member dalam percakapan ini
            const member =
                message.sender.role === "MEMBER" ? message.sender : message.receiver;

            if (member) {
                conversations.set(member.id, {
                    memberId: member.id,
                    memberName: member.name || "Member",
                    lastMessage: message.content,
                    lastMessageTimestamp: message.createdAt,
                    unread: 0, // Placeholder, schema Anda belum mendukung `isRead`
                });
            }
        }

        // 3. Ubah Map menjadi array dan urutkan berdasarkan pesan terbaru
        const conversationList = Array.from(conversations.values()).sort(
            (a, b) =>
                b.lastMessageTimestamp.getTime() - a.lastMessageTimestamp.getTime()
        );

        return NextResponse.json(conversationList);
    } catch (err) {
        console.error("Failed to get admin conversations:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}