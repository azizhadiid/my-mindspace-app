'use client'

// components/chat/ChatMessage.tsx
import React from 'react';
import { Shield } from 'lucide-react';

interface ChatMessageProps {
    message: {
        id: string;
        sender: string;
        message: string;
        timestamp: string;
        isAdmin: boolean;
    };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    return (
        <div key={message.id} className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}>
            <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                {message.isAdmin && (
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                )}
                <div
                    className={`px-4 py-2 rounded-2xl ${message.isAdmin
                        ? 'bg-white border border-rose-200 text-gray-800 shadow-sm'
                        : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                        }`}
                >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.isAdmin ? 'text-gray-500' : 'text-pink-100'}`}>
                        {message.timestamp}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;