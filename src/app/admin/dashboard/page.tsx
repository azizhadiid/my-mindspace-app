'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard, Plus, Edit, CheckCircle, Users, MessageCircle,
} from 'lucide-react';
import DashboardContent from '@/components/templates/admin/Dashboard/DashboardContent';
import PlaceholderContent from '@/components/templates/admin/Dashboard/PlaceholderContent';
import { MenuItem } from '@/components/templates/admin/SideBar';
import Sidebar from '@/components/templates/admin/SideBar';
import AdminLayout from '@/components/templates/admin/MainTemplateAdmin';

const menuItems: MenuItem[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'add-article', icon: Plus, label: 'Tambah Artikel' },
    { id: 'edit-article', icon: Edit, label: 'Edit Artikel' },
    { id: 'psychologist-data', icon: Users, label: 'Data Psikolog' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'verify-consultation', icon: CheckCircle, label: 'Verifikasi Konsultasi' }
];

const renderContent = (activeMenu: string) => {
    switch (activeMenu) {
        case 'dashboard':
            return <DashboardContent />;
        case 'add-article':
            return <PlaceholderContent title="Tambah Artikel" description="Buat artikel baru untuk membantu pengguna memahami kesehatan mental dengan lebih baik." />;
        case 'edit-article':
            return <PlaceholderContent title="Edit Artikel" description="Kelola dan update artikel yang sudah ada untuk memberikan informasi terbaru." />;
        case 'verify-consultation':
            return <PlaceholderContent title="Verifikasi Konsultasi" description="Review dan verifikasi sesi konsultasi untuk memastikan kualitas layanan." />;
        case 'psychologist-data':
            return <PlaceholderContent title="Data Psikolog" description="Kelola informasi psikolog, jadwal, dan performa mereka di platform." />;
        case 'chat':
            return <PlaceholderContent title="Chat" description="Monitor dan kelola komunikasi antara pengguna dan psikolog." />;
        default:
            return <DashboardContent />;
    }
};

const AdminPage = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        // Mengubah struktur untuk menempatkan Sidebar dan AdminLayout dalam satu kontainer
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                menuItems={menuItems}
            />
            <AdminLayout
                activeMenu={activeMenu}
                setSidebarOpen={setSidebarOpen}
                menuItems={menuItems}
            >
                {renderContent(activeMenu)}
            </AdminLayout>
        </div>
    );
};

export default AdminPage;