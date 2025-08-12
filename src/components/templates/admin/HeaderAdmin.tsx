'use client';

import React from 'react';
import { Menu, Bell, Search, LogOut, LayoutDashboard, Plus, Edit, CheckCircle, Users, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MenuItem } from './SideBar';

interface HeaderProps {
    setSidebarOpen: (isOpen: boolean) => void;
}

const HeaderAdmin: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    const pathname = usePathname();

    // Definisikan ulang menuItems di sini atau impor dari file terpisah jika perlu
    // Namun untuk kasus ini, saya akan mendefinisikan ulang agar Header bisa mandiri
    const menuItems: MenuItem[] = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
        { id: 'add-article', icon: Plus, label: 'Tambah Artikel', href: '/admin/article/add' },
        { id: 'edit-article', icon: Edit, label: 'Edit Artikel', href: '/admin/article/edit' },
        { id: 'psychologist-data', icon: Users, label: 'Data Psikolog', href: '/admin/psikolog' },
        { id: 'chat', icon: MessageCircle, label: 'Chat', href: '/admin/chat' },
        { id: 'verify-consultation', icon: CheckCircle, label: 'Verifikasi Konsul', href: '/admin/verification' },
    ];

    const getPageTitle = () => {
        const item = menuItems.find(item => item.href === pathname || pathname.startsWith(item.href + '/'));
        return item ? item.label : 'Dashboard';
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
                    {/* Search */}
                    <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm w-40"
                        />
                    </div>
                    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;