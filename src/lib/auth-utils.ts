// src/lib/auth-utils.ts

import { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Definisikan tipe data untuk payload token kita agar aman secara tipe
interface TokenPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
}

export const verifyAuth = async (req: NextRequest): Promise<TokenPayload | null> => {
    // 1. Ambil token dari cookie di request yang masuk
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return null; // Tidak ada token, berarti tidak login
    }

    // 2. Ambil secret key dari environment variables
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET is not set in .env file");
        return null;
    }

    try {
        // 3. Verifikasi token menggunakan secret key
        const decoded = jwt.verify(token, secret) as TokenPayload;
        return decoded; // Jika valid, kembalikan payload (berisi id, email, role)
    } catch (error) {
        console.error("Invalid token:", error);
        return null; // Token tidak valid atau kedaluwarsa
    }
};