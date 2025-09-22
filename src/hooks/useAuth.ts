"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(requiredRole?: "ADMIN" | "MEMBER" | "PSIKOLOG") {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/me", {
                    method: "GET",
                    cache: "no-store", // 🚀 hindari cache
                });
                if (!res.ok) {
                    router.push("/auth/login");
                    return;
                }

                const data = await res.json();
                setUser(data);

                // Kalau halaman ini butuh role tertentu
                if (requiredRole && data.role !== requiredRole) {
                    router.push("/unauthorized"); // 🚀 halaman khusus forbidden
                    return;
                }
            } catch (err) {
                console.error("Auth check error:", err);
                router.push("/auth/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router, requiredRole]);

    return { user, loading };
}
