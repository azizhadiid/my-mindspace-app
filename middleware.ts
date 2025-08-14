import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        // Role-based redirect
        if (req.nextUrl.pathname.startsWith("/member") && decoded.role !== "MEMBER") {
            return NextResponse.redirect(new URL("/", req.url));
        }
        if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
        if (req.nextUrl.pathname.startsWith("/psikolog") && decoded.role !== "PSIKOLOG") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/member/:path*", "/admin/:path*", "/psikolog/:path*", "/admin/articles/:path*"],
};
