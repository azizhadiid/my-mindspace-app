// file: middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userRole = request.cookies.get('userRole')?.value;
    const { pathname } = request.nextUrl;

    // Tentukan rute yang dilindungi
    const adminRoutes = ['/admin'];
    const memberRoutes = ['/member'];

    // Cek jika rute yang diakses adalah halaman admin
    if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (userRole !== 'ADMIN') {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    // Cek jika rute yang diakses adalah halaman member
    if (memberRoutes.some(route => pathname.startsWith(route))) {
        if (userRole !== 'MEMBER') {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    return NextResponse.next();
}

// Tentukan rute mana saja yang harus melewati middleware
export const config = {
    matcher: ['/member/:path*', '/admin/:path*'],
};