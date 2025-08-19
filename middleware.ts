import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { role: string };

        // Atur akses sesuai role
        if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
        if (req.nextUrl.pathname.startsWith("/member") && decoded.role !== "MEMBER") {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
        if (req.nextUrl.pathname.startsWith("/psikolog") && decoded.role !== "PSIKOLOG") {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/admin/:path*", "/member/:path*", "/psikolog/:path*"],
};
