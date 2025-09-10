import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan ada prisma client

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const where: any = {
        AND: [
            search ? { title: { contains: search, mode: "insensitive" } } : {},
            category && category !== "All" ? { category } : {},
        ],
    };

    const totalItems = await prisma.article.count({ where });
    const totalPages = Math.ceil(totalItems / limit);

    const articles = await prisma.article.findMany({
        where,
        orderBy: { publishDate: "desc" },
        skip: (page - 1) * limit,
        take: limit,
    });

    return NextResponse.json({
        articles,
        totalItems,
        totalPages,
        currentPage: page,
    });
}

