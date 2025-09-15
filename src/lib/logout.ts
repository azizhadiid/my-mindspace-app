"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
    const router = useRouter();

    const logout = async () => {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        if (res.ok) {
            router.push("/auth/login"); // redirect ke login
        }
    };

    return { logout };
}
