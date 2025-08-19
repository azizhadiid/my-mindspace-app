'use client';

import AdminLayout from '@/components/templates/admin/MainTemplateAdmin';
import DashboardContent from '@/components/templates/admin/Dashboard/DashboardContent';
import Sidebar from '@/components/templates/admin/SideBar';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboardPage = () => {
    const { user, loading } = useAuth("ADMIN");
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />
            <AdminLayout
                setSidebarOpen={setSidebarOpen}
            >
                <DashboardContent />
            </AdminLayout>
        </div>
    );
};

export default AdminDashboardPage;