'use client'

import { useAuth } from "@/hooks/useAuth";
import React from 'react'; // Penting untuk JSX

const HomePage = () => {
    const { user, loading } = useAuth("MEMBER");

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                {/* Spinner */}
                <div
                    className="
                        w-12 h-12 rounded-full
                        border-4 border-t-4 border-gray-200 border-t-blue-500
                        animate-spin
                    "
                ></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-4"> {/* Menambahkan padding agar tidak terlalu mepet */}
            <h1 className="text-2xl font-bold mb-2">Ini Adalah Halaman Home bagi member</h1>
            <p className="text-gray-700">Welcome, {user?.name || "Guest"}!</p>
        </div>
    );
};

export default HomePage;