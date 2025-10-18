// lib/auth.ts
import { prisma } from "./prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export type CurrentUser = {
    id: string;
    email: string;
    role: "ADMIN" | "MEMBER" | "PSIKOLOG";
};

export async function getCurrentUserFromRequest(req: Request) {
    try {
        const cookieHeader = req.headers.get("cookie") || "";
        const match = cookieHeader.split(";").map(s => s.trim()).find(s => s.startsWith("token="));
        if (!match) return null;
        const token = match.split("=")[1];
        if (!token) return null;

        const payload = jwt.verify(token, JWT_SECRET) as CurrentUser;
        if (!payload?.id) return null;

        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: { id: true, name: true, email: true, role: true },
        });
        return user;
    } catch (err) {
        console.error("getCurrentUserFromRequest error:", err);
        return null;
    }
}
