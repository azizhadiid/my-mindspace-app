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


interface FormattedMessage {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    isAdmin: boolean;
}

const ChatAdminPage = () => {
    const { user, loading: authLoading } = useAuth("MEMBER");
    // ✅ Hanya satu deklarasi state untuk setiap hal
    const [messages, setMessages] = useState<FormattedMessage[]>([]); // Untuk daftar pesan
    const [message, setMessage] = useState(''); // Untuk teks input
    const [isLoading, setIsLoading] = useState(true); // Untuk loading fetch pesan

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isAdminOnline] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) return; // Jangan fetch jika user belum terotentikasi

            try {
                const response = await fetch('/api/member/chat');
                const data = await response.json();

                // Transformasi data dari backend ke format yang dimengerti frontend
                const formatted = data.map((msg: any) => ({
                    id: msg.id,
                    message: msg.content,
                    isAdmin: msg.senderId !== user.id, // Jika pengirim BUKAN user, berarti dia Admin
                    sender: msg.senderId === user.id ? 'You' : 'Admin',
                    timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit', minute: '2-digit'
                    }),
                }));

                setMessages(formatted);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, [user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async () => {
        if (message.trim() && user) {
            const tempId = Date.now().toString(); // ID sementara untuk UI
            const newMessage: FormattedMessage = {
                id: tempId,
                sender: 'You',
                message: message.trim(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isAdmin: false
            };

            // Optimistic UI: Tampilkan pesan langsung di UI
            setMessages(prev => [...prev, newMessage]);
            const currentMessage = message;
            setMessage(''); // Kosongkan input

            try {
                const response = await fetch('/api/member/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: currentMessage.trim() }),
                });

                if (!response.ok) {
                    // Jika gagal, kembalikan state seperti semula
                    setMessages(prev => prev.filter(msg => msg.id !== tempId));
                    setMessage(currentMessage); // Kembalikan teks ke input
                }

                // Jika sukses, kita bisa update pesan dengan data dari server, atau biarkan saja
                // Untuk real-time, kita butuh WebSocket, tapi untuk sekarang ini cukup

            } catch (error) {
                console.error("Failed to send message:", error);
                setMessages(prev => prev.filter(msg => msg.id !== tempId));
                setMessage(currentMessage);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // ✅ Gabungkan kedua kondisi loading
    if (authLoading || isLoading) {
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