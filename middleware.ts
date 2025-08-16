import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Definisikan mapping rute default untuk setiap role
const roleRedirects: Record<string, string> = {
    ADMIN: "/admin/dashboard",
    MEMBER: "/member/home",
    PSIKOLOG: "/psikolog/dashboard",
    // Tambahkan role lain jika ada
    DEFAULT: "/auth/login",
};

// Definisikan rute publik yang tidak memerlukan autentikasi
const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/", // Halaman beranda bisa jadi publik
    "/api/register", // API register harus publik
    "/api/login",    // API login harus publik
    // Tambahkan rute publik lainnya jika ada
];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("token")?.value;

    // 1. Lewati rute publik
    if (
        publicRoutes.includes(pathname) ||
        pathname.startsWith("/_next") || // Aset internal Next.js
        pathname.startsWith("/api/_next") // API internal Next.js
    ) {
        return NextResponse.next();
    }

    // 2. Jika tidak ada token, redirect ke halaman login
    if (!token) {
        // Simpan URL yang diminta agar bisa redirect kembali setelah login
        const url = new URL(roleRedirects.DEFAULT, req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    try {
        // 3. Verifikasi token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const userRole = decoded.role as keyof typeof roleRedirects;

        // 4. Logika Otorisasi Berdasarkan Peran (Perhatikan urutan dan penanganan konflik)
        // Jika path dimulai dengan '/admin'
        if (pathname.startsWith("/admin")) {
            if (userRole !== "ADMIN") {
                // Jika bukan admin, redirect ke dashboard sesuai role-nya
                return NextResponse.redirect(new URL(roleRedirects[userRole] || roleRedirects.DEFAULT, req.url));
            }
        }
        // Jika path dimulai dengan '/member'
        else if (pathname.startsWith("/member")) {
            if (userRole !== "MEMBER") {
                // Jika bukan member, redirect ke dashboard sesuai role-nya
                return NextResponse.redirect(new URL(roleRedirects[userRole] || roleRedirects.DEFAULT, req.url));
            }
        }
        // Jika path dimulai dengan '/psikolog'
        else if (pathname.startsWith("/psikolog")) {
            if (userRole !== "PSIKOLOG") {
                // Jika bukan psikolog, redirect ke dashboard sesuai role-nya
                return NextResponse.redirect(new URL(roleRedirects[userRole] || roleRedirects.DEFAULT, req.url));
            }
        }
        // Jika ada rute lain yang memerlukan autentikasi tapi tidak spesifik role
        // else {
        //     // Misalnya, jika ada /profile yang bisa diakses semua yang login
        //     // dan Anda tidak ingin role tertentu diarahkan ke dashboard mereka
        //     // Cukup biarkan NextResponse.next()
        // }


        // 5. Jika semua cek berhasil, lanjutkan request
        return NextResponse.next();

    } catch (err) {
        console.error("Token verification failed:", err);
        // Jika token tidak valid (expired, malformed, dll), hapus cookie dan redirect ke login
        const response = NextResponse.redirect(new URL(roleRedirects.DEFAULT, req.url));
        response.cookies.delete("token"); // Hapus token yang rusak/expired
        return response;
    }

}

export const config = {
    // Matcher untuk semua path yang perlu dilindungi.
    // Kecualikan /_next/* (aset internal Next.js), /api/login, /api/register, dan file statis
    matcher: [
        // Cocokkan semua path kecuali yang diawali dengan:
        "/((?!api/login|api/register|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
    ],
};
