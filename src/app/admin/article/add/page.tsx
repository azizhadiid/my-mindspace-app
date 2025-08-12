'use client';

import AdminLayout from '@/components/templates/admin/MainTemplateAdmin';
import Sidebar from '@/components/templates/admin/SideBar';
import React, { useState } from 'react';
import PlaceholderContent from '@/components/templates/admin/Dashboard/PlaceholderContent';

const TambahArtikelPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />
            <AdminLayout
                setSidebarOpen={setSidebarOpen}
            >
                <PlaceholderContent title="Tambah Artikel" description="Buat artikel baru untuk membantu pengguna memahami kesehatan mental dengan lebih baik." />
            </AdminLayout>
        </div>
    );
};

export default TambahArtikelPage;