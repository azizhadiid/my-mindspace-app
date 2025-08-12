import React from 'react';
import {
    Heart, User
} from 'lucide-react';

// Definisi tipe untuk satu item menu
export interface MenuItem {
    id: string;
    icon: React.ElementType;
    label: string;
}

interface SidebarProps {
    activeMenu: string;
    setActiveMenu: (menuId: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu, isOpen, setIsOpen, menuItems }) => {
    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200 z-50 
                transform transition-transform duration-300 flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:relative lg:z-0 lg:min-h-screen lg:h-auto
            `}>
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    <div className="p-6 ">
                        {/* Logo */}
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">MindSpace Admin</h1>
                                <p className="text-xs text-gray-500">Mental Health Platform</p>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveMenu(item.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeMenu === item.id
                                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* User Profile - Fixed at bottom */}
                <div className="mt-auto p-6 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">Admin User</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;