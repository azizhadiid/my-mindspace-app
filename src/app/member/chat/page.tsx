'use client'

import { useAuth } from "@/hooks/useAuth";
import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Shield, Paperclip, Smile, Phone, Video } from 'lucide-react';

// Component
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";

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
        {
            id: '1',
            sender: 'Admin',
            message: 'Hello! Welcome to MindSpace. How can I help you today?',
            timestamp: '09:00 AM',
            isAdmin: true
        },
        {
            id: '2',
            sender: 'You',
            message: 'Hi, I have some questions about my subscription plan.',
            timestamp: '09:02 AM',
            isAdmin: false
        },
        {
            id: '3',
            sender: 'Admin',
            message: 'I\'d be happy to help you with your subscription questions. What specific information do you need?',
            timestamp: '09:03 AM',
            isAdmin: true
        }
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
                {/* Header */}
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

                {/* Chat Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-rose-100">
                    {/* Chat Header */}
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
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-500 hover:text-pink-500 hover:bg-white rounded-full transition-colors">
                                    <Phone className="h-5 w-5" />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-pink-500 hover:bg-white rounded-full transition-colors">
                                    <Video className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-rose-50/30 via-white to-pink-50/30">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                                <p className="text-gray-500 mb-2">No messages yet</p>
                                <p className="text-sm text-gray-400">Start a conversation with our admin team</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                                        {msg.isAdmin && (
                                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Shield className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <div
                                            className={`px-4 py-2 rounded-2xl ${msg.isAdmin
                                                    ? 'bg-white border border-rose-200 text-gray-800 shadow-sm'
                                                    : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                                                }`}
                                        >
                                            <p className="text-sm">{msg.message}</p>
                                            <p className={`text-xs mt-1 ${msg.isAdmin ? 'text-gray-500' : 'text-pink-100'}`}>
                                                {msg.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 bg-white border-t border-rose-100">
                        <div className="flex items-end space-x-2">
                            <button className="p-2 text-gray-500 hover:text-pink-500 transition-colors">
                                <Paperclip className="h-5 w-5" />
                            </button>
                            <div className="flex-1 relative">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message to admin..."
                                    className="w-full p-3 pr-12 border border-rose-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent max-h-32"
                                    rows={1}
                                />
                                <button className="absolute right-2 bottom-2 p-1 text-gray-500 hover:text-pink-500 transition-colors">
                                    <Smile className="h-5 w-5" />
                                </button>
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!message.trim()}
                                className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Help Information */}
                <div className="mt-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Shield className="h-5 w-5 text-pink-500 mr-2" />
                        How can our admin team help you?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                            <ul className="space-y-2">
                                <li>• Account and subscription questions</li>
                                <li>• Technical support</li>
                                <li>• Billing inquiries</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-2">
                                <li>• Feature requests</li>
                                <li>• General platform guidance</li>
                                <li>• Report issues or bugs</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded-lg border border-rose-200">
                        <p className="text-xs text-gray-500">
                            <strong>Response Time:</strong> Our admin team typically responds within 15-30 minutes during business hours (9 AM - 6 PM).
                        </p>
                    </div>
                </div>
            </div>
        </MainTemplateMember>
    );
};

export default ChatAdminPage;