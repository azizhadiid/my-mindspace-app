// app/api/member/article/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const article = await prisma.article.findUnique({
            where: {
                id: id,
            },
        });

        if (!article) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({ article });

    } catch (error) {
        console.error("Error fetching article:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}