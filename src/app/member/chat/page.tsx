// app/chat/page.tsx
'use client'

import { useAuth } from "@/hooks/useAuth";
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Shield } from 'lucide-react';

// Component
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import ChatHeader from "@/components/templates/member/chat/ChatHeader";
import ChatMessage from "@/components/templates/member/chat/ChatMessage";
import MessageInput from "@/components/templates/member/chat/MessageInput";
import ChatHelpInfo from "@/components/templates/member/chat/ChatHelpInfo";


interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    isAdmin: boolean;
}

const ChatAdminPage = () => {
    const { user, loading } = useAuth("MEMBER");
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isAdminOnline] = useState(true); // You can manage this with real data

    // Sample messages - replace with real data from your backend
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', sender: 'Admin', message: 'Hello! Welcome to MindSpace. How can I help you today?', timestamp: '09:00 AM', isAdmin: true },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage: ChatMessage = {
                id: Date.now().toString(),
                sender: 'You',
                message: message.trim(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isAdmin: false
            };
            setMessages([...messages, newMessage]);
            setMessage('');

            // Simulate admin reply (remove this in production)
            setTimeout(() => {
                const adminReply: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    sender: 'Admin',
                    message: 'Thank you for your message. Let me check that for you.',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isAdmin: true
                };
                setMessages(prev => [...prev, adminReply]);
            }, 2000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-pink-500 animate-spin"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <MainTemplateMember>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header Section */}
                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                Chat with Admin
                            </h1>
                        </div>
                    </div>
                    <p className="text-gray-600">Get support and assistance from our administrative team</p>
                </div>

                {/* Main Chat Box */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-rose-100">
                    <ChatHeader isAdminOnline={isAdminOnline} />

                    {/* Messages Container */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-rose-50/30 via-white to-pink-50/30">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                                <p className="text-gray-500 mb-2">No messages yet</p>
                                <p className="text-sm text-gray-400">Start a conversation with our admin team</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <ChatMessage key={msg.id} message={msg} />
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <MessageInput
                        message={message}
                        setMessage={setMessage}
                        onSendMessage={handleSendMessage} // Menggunakan prop baru
                    />
                </div>

                <ChatHelpInfo />
            </div>
        </MainTemplateMember>
    );
};

export default ChatAdminPage;