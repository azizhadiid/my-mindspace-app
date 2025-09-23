// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 🚫 lewati folder /api/me
    if (path.startsWith("/api/me")) {
        return NextResponse.next();
    }
    console.log("✅ Middleware aktif untuk:", request.nextUrl.pathname);

    // contoh blokir jika bukan POST ke /api/articles
    if (request.nextUrl.pathname.startsWith("/api/articles") && request.method !== "POST") {
        return NextResponse.json({ error: "Only POST allowed here" }, { status: 405 });
    }

    // contoh proteksi untuk route member
    if (request.nextUrl.pathname.startsWith("/api/member")) {
        // misal cek auth token
        const token = request.headers.get("authorization");
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/:path*",       // semua API
        "/api/articles/:path*",
        "/api/member/:path*",
        "/api/send-email/:path*"
    ],
    // exclude /api/me
    skip: ["/api/me/:path*"]
};
