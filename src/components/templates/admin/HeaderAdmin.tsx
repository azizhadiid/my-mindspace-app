'use client';

import React from 'react';
import { Menu, Bell, Search, LogOut, LayoutDashboard, Plus, Edit, CheckCircle, Users, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MenuItem } from './SideBar';
import { useLogout } from '@/lib/logout';
import Swal from "sweetalert2";

interface HeaderProps {
    setSidebarOpen: (isOpen: boolean) => void;
}

const HeaderAdmin: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    const pathname = usePathname();
    const { logout } = useLogout();

    // Definisikan ulang menuItems di sini atau impor dari file terpisah jika perlu
    // Namun untuk kasus ini, saya akan mendefinisikan ulang agar Header bisa mandiri
    const menuItems: MenuItem[] = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
        { id: 'add-article', icon: Plus, label: 'Add Article', href: '/admin/article/add' },
        { id: 'edit-article', icon: Edit, label: 'Edit Article', href: '/admin/article/edit' },
        { id: 'chat', icon: MessageCircle, label: 'Chat', href: '/admin/chat' },
        { id: 'verify-consultation', icon: CheckCircle, label: 'Verification Consultation', href: '/admin/verification' },
    ];

    const getPageTitle = () => {
        const item = menuItems.find(item => item.href === pathname || pathname.startsWith(item.href + '/'));
        return item ? item.label : 'Dashboard';
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
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg md:text-2xl lg:text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={handleLogout}>
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;