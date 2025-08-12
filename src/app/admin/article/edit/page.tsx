'use client';

import AdminLayout from '@/components/templates/admin/MainTemplateAdmin';
import Sidebar from '@/components/templates/admin/SideBar';
import React, { useState } from 'react';
import PlaceholderContent from '@/components/templates/admin/Dashboard/PlaceholderContent';

const EditArtikelPage = () => {
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
                <PlaceholderContent title="Edit Artikel" description="Kelola dan update artikel yang sudah ada untuk memberikan informasi terbaru." />
            </AdminLayout>
        </div>
    );
};

export default EditArtikelPage;