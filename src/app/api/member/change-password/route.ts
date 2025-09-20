import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function PATCH(req: Request) {
    try {
        // 1. Ambil token dari cookie
        const cookieHeader = req.headers.get("cookie");
        const token = cookieHeader
            ?.split(";")
            .find((c) => c.trim().startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // 2. Verifikasi token
        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        // 3. Ambil data request
        const { currentPassword, newPassword, confirmNewPassword } =
            await req.json();

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        if (newPassword !== confirmNewPassword) {
            return NextResponse.json(
                { message: "New passwords do not match." },
                { status: 400 }
            );
        }

        // 4. Cari user di DB
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // 5. Cek password lama
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return NextResponse.json(
                { message: "Current password is incorrect." },
                { status: 400 }
            );
        }

        // 6. Hash password baru
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 7. Update password
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json(
            { message: "Password updated successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Change password error:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
