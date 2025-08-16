// lib/server.ts
import { cookies } from 'next/headers'; // Ini hanya bisa di server components/server functions
import * as jwt from 'jsonwebtoken';

export function getAuthUser() {
    const cookieStore = cookies(); // Mengakses cookies di Server Component/Function
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return {
            id: (decoded as any).id,
            email: (decoded as any).email,
            role: (decoded as any).role,
        };
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
}