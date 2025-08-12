'use client';

import AdminLayout from '@/components/templates/admin/MainTemplateAdmin';
import Sidebar from '@/components/templates/admin/SideBar';
import React, { useState } from 'react';
import PlaceholderContent from '@/components/templates/admin/Dashboard/PlaceholderContent';

const PsikologPageAdmin = () => {
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
                <PlaceholderContent title="Data Psikolog" description="Kelola informasi psikolog, jadwal, dan performa mereka di platform." />
            </AdminLayout>
        </div>
    );
};

export default PsikologPageAdmin;