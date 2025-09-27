'use client';

import AdminLayout from '@/components/templates/admin/MainTemplateAdmin';
import Sidebar from '@/components/templates/admin/SideBar';
import ConsultationContent from '@/components/templates/admin/verification/VerificationContent';
import React, { useState } from 'react';

const VerifikasiKonsultasiPagae = () => {
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
                <ConsultationContent />
            </AdminLayout>
        </div>
    );
};

export default VerifikasiKonsultasiPagae;