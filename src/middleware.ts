import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("✅ Middleware aktif untuk:", request.nextUrl.pathname);

    // contoh blokir jika bukan POST
    if (request.nextUrl.pathname === "/api/articles" && request.method !== "POST") {
        return NextResponse.json({ error: "Only POST allowed here" }, { status: 405 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/articles/:path*"], // hook semua sub-route articles
};
