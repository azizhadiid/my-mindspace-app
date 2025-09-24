'use client'

import { useState } from 'react'
import { Menu, X, Brain } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';
import { useLogout } from '@/lib/logout';

const NavabrMember = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname();
    const { logout } = useLogout();

    // Fungsi pembantu yang lebih modular untuk kelas CSS
    const getLinkClasses = (href: string, isMobile: boolean) => {
        // Kelas dasar untuk desktop dan mobile
        const baseClasses = isMobile
            ? "block w-full px-4 py-3 rounded-xl font-medium text-gray-700 transition-colors"
            : "text-gray-700 hover:text-pink-500 transition-colors font-medium";

        // Kelas aktif
        const activeClasses = isMobile
            ? "bg-pink-100 text-pink-600 font-bold"
            : "text-pink-500 font-bold";

        // Cek aktif bukan hanya exact match, tapi juga sub-route
        const isActive =
            pathname === href || pathname.startsWith(href + "/");

        // Cek apakah pathname saat ini cocok dengan href
        return `${baseClasses} ${isActive ? activeClasses : 'hover:bg-gray-50'}`;
    };

    const handleLogout = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from this session.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await logout();
                    Swal.fire("Logged out!", "You have been logged out successfully.", "success");
                } catch (error) {
                    console.error("Logout error:", error);
                    Swal.fire("Failed!", "An error occurred while logging out.", "error");
                }
            }
        });
    };

    return (
        <nav className="relative bg-white/80 backdrop-blur-lg border-b border-rose-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/member/home" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            MindSpace
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/member/home" className={getLinkClasses("/member/home", false)}>
                            Home
                        </Link>
                        <Link href="/member/article" className={getLinkClasses("/member/article", false)}>
                            Article
                        </Link>
                        <Link href="/member/chat" className={getLinkClasses("/member/chat", false)}>
                            Chat
                        </Link>
                        <Link href="/member/consultation" className={getLinkClasses("/member/consultation", false)}>
                            Consultation
                        </Link>
                        <Link href="/member/mindbot" className={getLinkClasses("/member/mindbot", false)}>
                            Mindbot
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Desktop Account & Logout */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link className={getLinkClasses("/member/account", false)} href='/member/account'>
                            Account
                        </Link>
                        <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* --- */}

                {/* Mobile Menu Content (dirender secara kondisional) */}
                {isMenuOpen && (
                    <div className="md:hidden pt-2 pb-4">
                        <div className="px-4 space-y-2">
                            <Link href="/member/home" onClick={() => setIsMenuOpen(false)} className={getLinkClasses("/member/home", true)}>Home</Link>
                            <Link href="/member/article" onClick={() => setIsMenuOpen(false)} className={getLinkClasses("/member/article", true)}>Article</Link>
                            <Link href="/member/chat" onClick={() => setIsMenuOpen(false)} className={getLinkClasses("/member/chat", true)}>Chat</Link>
                            <Link href="/member/consultation" onClick={() => setIsMenuOpen(false)} className={getLinkClasses("/member/consultation", true)}>Consultation</Link>
                            <Link href="/member/mindbot" onClick={() => setIsMenuOpen(false)} className={getLinkClasses("/member/mindbot", true)}>Mindbot</Link>
                            <div className="flex flex-col space-y-2 pt-4 border-t border-rose-100 mt-4">
                                <Link className={getLinkClasses("/member/account", true)} href='/member/account'>Account</Link>
                                <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-center" onClick={handleLogout} >Logout</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavabrMember;