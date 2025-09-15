// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
    // Hapus cookie session
    const response = NextResponse.json({ success: true, message: "Logged out" });
    response.cookies.set("session", "", { maxAge: 0 }); // hapus cookie
    return response;
}
