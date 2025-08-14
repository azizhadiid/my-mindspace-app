import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // penting untuk JWT

export async function POST(req: Request) {
    try {
        const token = req.headers.get("cookie")?.split("token=")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
        if (decoded.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const publishDate = new Date(formData.get("publishDate") as string);
        const content = formData.get("content") as string;
        const image = formData.get("image") as File;

        // Simpan file ke folder public/uploads
        const buffer = Buffer.from(await image.arrayBuffer());
        const fileName = `${Date.now()}-${image.name}`;
        const filePath = path.join(process.cwd(), "public/uploads/article", fileName);
        fs.writeFileSync(filePath, buffer);

        const article = await prisma.article.create({
            data: {
                title,
                category,
                publishDate,
                content,
                image: `/uploads/article/${fileName}`,
                authorId: decoded.id,
            },
        });

        return NextResponse.json({ message: "Artikel berhasil ditambahkan", article });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}
