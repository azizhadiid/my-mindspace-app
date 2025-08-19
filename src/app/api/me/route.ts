import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(req: Request) {
    try {
        // Ambil cookie dari request
        const cookieHeader = req.headers.get("cookie");
        const token = cookieHeader
            ?.split(";")
            .find(c => c.trim().startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        // ambil data user dari DB
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true, role: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("ME endpoint error:", error);
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
}
