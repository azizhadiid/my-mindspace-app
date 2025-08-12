import React from 'react';
import {
    Menu, Bell, Search, LogOut
} from 'lucide-react';
import { MenuItem } from './SideBar';

interface HeaderProps {
    activeMenu: string;
    setIsOpen: (isOpen: boolean) => void;
    menuItems: MenuItem[];
}

const HeaderAdmin: React.FC<HeaderProps> = ({ activeMenu, setIsOpen, menuItems }) => {
    const getPageTitle = () => {
        const item = menuItems.find(item => item.id === activeMenu);
        return item ? item.label : 'Dashboard';
    };

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
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

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Logout */}
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
