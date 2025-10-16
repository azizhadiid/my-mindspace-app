'use client'

// components/chat/ChatHeader.tsx
import React from 'react';
import { Phone, Video, Shield } from 'lucide-react';

interface ChatHeaderProps {
    isAdminOnline: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isAdminOnline }) => {
    return (
        <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        {isAdminOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">MindSpace Admin</h3>
                        <p className="text-sm text-green-600">
                            {isAdminOnline ? 'Online - Usually responds within minutes' : 'Offline'}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChatHeader;