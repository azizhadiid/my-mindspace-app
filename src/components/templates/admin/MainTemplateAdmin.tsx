'use client'

import React, { ReactNode } from 'react';
import { MenuItem } from './SideBar';
import HeaderAdmin from './HeaderAdmin';

interface AdminLayoutProps {
    children: ReactNode;
    activeMenu: string;
    setSidebarOpen: (isOpen: boolean) => void;
    menuItems: MenuItem[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
    children,
    activeMenu,
    setSidebarOpen,
    menuItems,
}) => {
    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <HeaderAdmin
                activeMenu={activeMenu}
                setIsOpen={setSidebarOpen}
                menuItems={menuItems}
            />
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;