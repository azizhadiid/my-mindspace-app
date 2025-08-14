import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const token = req.headers.get("cookie")?.split("token=")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
        if (decoded.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        const articleId = params.id;

        // Ambil data artikel untuk mendapatkan path gambar
        const articleToDelete = await prisma.article.findUnique({
            where: { id: articleId },
            select: { image: true }
        });

        if (!articleToDelete) {
            return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
        }

        // Hapus file gambar dari server
        if (articleToDelete.image) {
            const imagePath = path.join(process.cwd(), "public", articleToDelete.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await prisma.article.delete({
            where: { id: articleId },
        });

        return NextResponse.json({ message: "Artikel berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting article:", error);
        return NextResponse.json({ error: "Terjadi kesalahan saat menghapus artikel" }, { status: 500 });
    }
}