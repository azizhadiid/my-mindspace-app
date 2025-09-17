import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// GET handler to fetch a single article by ID
export async function GET(
    req: Request,
    context: { params: { id: string } } // Mengubah params menjadi bagian dari objek context
) {
    try {
        // Ambil id dari params dengan cara yang disarankan Next.js
        const { id } = context.params;

        const article = await prisma.article.findUnique({
            where: { id: id },
            include: { author: { select: { name: true } } } // Opsional: include author name
        });

        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error("Error fetching single article:", error);
        return NextResponse.json({ error: "An error occurred while retrieving the article" }, { status: 500 });
    }
}

// PUT handler to update an article by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const token = req.headers.get("cookie")?.split("token=")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
        if (decoded.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        const articleId = params.id;
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const publishDate = new Date(formData.get("publishDate") as string);
        const content = formData.get("content") as string;
        const imageFile = formData.get("image") as File; // Bisa jadi File baru atau string URL lama

        let imageUrl: string | undefined;

        // Cek apakah ada file gambar baru diupload
        if (imageFile && imageFile.size > 0) { // Cek juga ukuran file untuk memastikan ini file beneran
            // Hapus gambar lama jika ada
            const existingArticle = await prisma.article.findUnique({
                where: { id: articleId },
                select: { image: true }
            });

            if (existingArticle?.image) {
                const oldImagePath = path.join(process.cwd(), "public", existingArticle.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Simpan file baru
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const fileName = `${Date.now()}-${imageFile.name}`;
            const filePath = path.join(process.cwd(), "public/uploads/article", fileName);
            fs.writeFileSync(filePath, buffer);
            imageUrl = `/uploads/article/${fileName}`;
        } else {
            // Jika tidak ada file baru diupload, gunakan gambar yang sudah ada (dari imagePreview di frontend)
            // Asumsi: frontend mengirimkan URL gambar lama jika tidak ada perubahan
            imageUrl = formData.get("image") as string;
        }

        const updatedArticle = await prisma.article.update({
            where: { id: articleId },
            data: {
                title,
                category,
                publishDate,
                content,
                image: imageUrl, // Update URL gambar
            },
        });

        return NextResponse.json({ message: "Artikel berhasil diperbarui", article: updatedArticle });
    } catch (error) {
        console.error("Error updating article:", error);
        return NextResponse.json({ error: "Terjadi kesalahan saat memperbarui artikel" }, { status: 500 });
    }
}

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