'use client'

import React, { ReactNode } from 'react';
import HeaderAdmin from './HeaderAdmin';

interface AdminLayoutProps {
    children: ReactNode;
    setSidebarOpen: (isOpen: boolean) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
    children,
    setSidebarOpen,
}) => {
    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <HeaderAdmin
                setSidebarOpen={setSidebarOpen}
            />
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;