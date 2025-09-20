import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(req: Request) {
    try {
        const cookieHeader = req.headers.get("cookie");
        const token = cookieHeader
            ?.split(";")
            .find((c) => c.trim().startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { memberProfile: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (err) {
        console.error("Profile GET error:", err);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        // 🔹 Verifikasi token
        const cookieHeader = req.headers.get("cookie");
        const token = cookieHeader
            ?.split(";")
            .find((c) => c.trim().startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        const formData = await req.formData();

        // ambil input text
        const name = formData.get("name") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const dateOfBirth = formData.get("dateOfBirth") as string;
        const gender = formData.get("gender") as string;
        const consultationPreference = formData.get("consultationPreference") as string;
        const consultationPurpose = formData.get("consultationPurpose") as string;
        const mentalHealthHistory = formData.get("mentalHealthHistory") as string;
        const relatedMedicalConditions = formData.get("relatedMedicalConditions") as string;
        const urgencyLevel = formData.get("urgencyLevel") as string;

        // ambil file foto
        const photoFile = formData.get("photoProfile") as File | null;
        let photoPath: string | undefined;

        // 🔹 Cari profil lama
        const existingProfile = await prisma.memberProfile.findUnique({
            where: { userId: decoded.id },
        });

        if (photoFile && photoFile.size > 0) {
            // Simpan ke folder public/img/profile
            const bytes = await photoFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${decoded.id}_${Date.now()}_${photoFile.name}`;
            const uploadDir = path.join(process.cwd(), "public", "img", "profile");
            const filePath = path.join(uploadDir, fileName);

            // Pastikan folder ada
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Jika ada foto lama → hapus
            if (existingProfile?.photoProfile) {
                const oldPath = path.join(process.cwd(), "public", existingProfile.photoProfile);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            // Tulis file baru
            fs.writeFileSync(filePath, buffer);

            // Simpan relative path
            photoPath = `/img/profile/${fileName}`;
        }

        // 🔹 Update User (name) & MemberProfile
        const updatedUser = await prisma.user.update({
            where: { id: decoded.id },
            data: {
                name,
                memberProfile: {
                    upsert: {
                        create: {
                            photoProfile: photoPath || existingProfile?.photoProfile,
                            phoneNumber,
                            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                            gender: gender ? (gender.toUpperCase() as any) : null,
                            consultationPreference: consultationPreference
                                ? (consultationPreference.toUpperCase() as any)
                                : null,
                            consultationPurpose,
                            mentalHealthHistory,
                            relatedMedicalConditions,
                            urgencyLevel: urgencyLevel ? (urgencyLevel.toUpperCase() as any) : null,
                        },
                        update: {
                            photoProfile: photoPath || existingProfile?.photoProfile,
                            phoneNumber,
                            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                            gender: gender ? (gender.toUpperCase() as any) : null,
                            consultationPreference: consultationPreference
                                ? (consultationPreference.toUpperCase() as any)
                                : null,
                            consultationPurpose,
                            mentalHealthHistory,
                            relatedMedicalConditions,
                            urgencyLevel: urgencyLevel ? (urgencyLevel.toUpperCase() as any) : null,
                        },
                    },
                },
            },
            include: { memberProfile: true },
        });

        return NextResponse.json({ message: "Profile updated", user: updatedUser });
    } catch (err) {
        console.error("Profile update error:", err);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
