'use client';

import AdminLayout from '@/components/templates/admin/MainTemplateAdmin';
import Sidebar from '@/components/templates/admin/SideBar';
import React, { useState, useRef, useEffect } from 'react';
import {
    Send,
    Search,
    MoreVertical,
    MessageSquare,
    Users,
    Clock,
    CheckCheck,
    Check,
    Paperclip,
    Smile,
    Star,
    Archive,
    Filter,
    ArrowLeft,
    Menu
} from 'lucide-react';

interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    isAdmin: boolean;
    status: 'sent' | 'delivered' | 'read';
}

interface ChatUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    isOnline: boolean;
    unreadCount: number;
    priority: 'low' | 'medium' | 'high';
    status: 'active' | 'waiting' | 'resolved';
}

const ChatPageAdmin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'waiting' | 'resolved'>('all');
    const [showChatList, setShowChatList] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sample users data - replace with real data from your backend
    const [chatUsers] = useState<ChatUser[]>([
        {
            id: '1',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'I need help with my subscription plan',
            timestamp: '2 min ago',
            isOnline: true,
            unreadCount: 3,
            priority: 'high',
            status: 'waiting'
        },
        {
            id: '2',
            name: 'Michael Chen',
            email: 'michael@example.com',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Thank you for your help!',
            timestamp: '15 min ago',
            isOnline: false,
            unreadCount: 0,
            priority: 'low',
            status: 'resolved'
        },
        {
            id: '3',
            name: 'Emily Davis',
            email: 'emily@example.com',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'How do I schedule a consultation?',
            timestamp: '1 hour ago',
            isOnline: true,
            unreadCount: 1,
            priority: 'medium',
            status: 'active'
        },
        {
            id: '4',
            name: 'David Wilson',
            email: 'david@example.com',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'The app is not working properly',
            timestamp: '2 hours ago',
            isOnline: false,
            unreadCount: 2,
            priority: 'high',
            status: 'waiting'
        }
    ]);

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            sender: 'Sarah Johnson',
            message: 'Hi, I need help with my subscription plan. I\'m having trouble accessing premium features.',
            timestamp: '10:25 AM',
            isAdmin: false,
            status: 'delivered'
        },
        {
            id: '2',
            sender: 'Admin',
            message: 'Hello Sarah! I\'d be happy to help you with your subscription. Let me check your account details.',
            timestamp: '10:27 AM',
            isAdmin: true,
            status: 'read'
        },
        {
            id: '3',
            sender: 'Sarah Johnson',
            message: 'Thank you! I upgraded yesterday but still can\'t access the premium content.',
            timestamp: '10:30 AM',
            isAdmin: false,
            status: 'delivered'
        }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = () => {
        if (message.trim() && selectedChat) {
            const newMessage: ChatMessage = {
                id: Date.now().toString(),
                sender: 'Admin',
                message: message.trim(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isAdmin: true,
                status: 'sent'
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSelectChat = (chatId: string) => {
        setSelectedChat(chatId);
        // On mobile, hide chat list when a chat is selected
        if (window.innerWidth < 768) {
            setShowChatList(false);
        }
    };

    const handleBackToList = () => {
        setShowChatList(true);
        setSelectedChat(null);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'waiting': return 'text-red-600 bg-red-100';
            case 'active': return 'text-blue-600 bg-blue-100';
            case 'resolved': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getMessageStatusIcon = (status: string) => {
        switch (status) {
            case 'sent': return <Check className="h-4 w-4" />;
            case 'delivered': return <CheckCheck className="h-4 w-4" />;
            case 'read': return <CheckCheck className="h-4 w-4 text-blue-500" />;
            default: return null;
        }
    };

    const filteredUsers = chatUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const totalUnread = chatUsers.reduce((total, user) => total + user.unreadCount, 0);
    const waitingCount = chatUsers.filter(user => user.status === 'waiting').length;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />
            <AdminLayout
                setSidebarOpen={setSidebarOpen}
            >
                {/* Mobile/Desktop Dashboard Header */}
                <div className="mb-4 lg:mb-6">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Chat Management</h1>
                            <p className="text-sm lg:text-base text-gray-600">Manage user conversations and support requests</p>
                        </div>
                        <div className="flex flex-row space-x-2 lg:space-x-4">
                            <div className="bg-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg shadow border flex-1 lg:flex-none">
                                <div className="flex items-center space-x-2">
                                    <MessageSquare className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
                                    <span className="font-semibold text-blue-600 text-sm lg:text-base">{totalUnread}</span>
                                    <span className="text-xs lg:text-sm text-gray-600">Unread</span>
                                </div>
                            </div>
                            <div className="bg-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg shadow border flex-1 lg:flex-none">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-red-600" />
                                    <span className="font-semibold text-red-600 text-sm lg:text-base">{waitingCount}</span>
                                    <span className="text-xs lg:text-sm text-gray-600">Waiting</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Container - Responsive */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
                    <div className="flex h-[500px] lg:h-[700px] relative">
                        {/* Chat List Sidebar - Responsive */}
                        <div className={`
                            ${showChatList ? 'flex' : 'hidden md:flex'} 
                            w-full md:w-1/3 lg:w-1/3 border-r border-gray-200 flex-col
                            ${!showChatList && selectedChat ? 'absolute inset-0 z-10 md:relative md:z-0' : ''}
                        `}>
                            {/* Search and Filter */}
                            <div className="p-3 lg:p-4 border-b border-gray-200 bg-gray-50">
                                <div className="relative mb-3">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex space-x-2">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value as any)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs lg:text-sm"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="waiting">Waiting</option>
                                        <option value="active">Active</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                            </div>

                            {/* Chat List */}
                            <div className="flex-1 overflow-y-auto">
                                {filteredUsers.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                                        <Users className="h-8 w-8 lg:h-12 lg:w-12 mb-4 text-gray-300" />
                                        <p className="text-sm lg:text-base">No conversations found</p>
                                    </div>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() => handleSelectChat(user.id)}
                                            className={`p-3 lg:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                                }`}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                                                    />
                                                    {user.isOnline && (
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold text-gray-900 truncate text-sm lg:text-base">{user.name}</h3>
                                                        <span className="text-xs text-gray-500">{user.timestamp}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mb-1 hidden lg:block">{user.email}</p>
                                                    <p className="text-xs lg:text-sm text-gray-600 truncate">{user.lastMessage}</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex space-x-1">
                                                            <span className={`px-1.5 py-0.5 lg:px-2 lg:py-1 text-xs rounded-full ${getPriorityColor(user.priority)}`}>
                                                                {user.priority}
                                                            </span>
                                                            <span className={`px-1.5 py-0.5 lg:px-2 lg:py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                                                                {user.status}
                                                            </span>
                                                        </div>
                                                        {user.unreadCount > 0 && (
                                                            <div className="bg-red-500 text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center">
                                                                {user.unreadCount}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Chat Area - Responsive */}
                        <div className={`
                            ${!showChatList || !selectedChat ? 'flex' : 'hidden md:flex'} 
                            flex-1 flex-col
                            ${showChatList && selectedChat ? 'absolute inset-0 z-10 md:relative md:z-0' : ''}
                        `}>
                            {selectedChat ? (
                                <>
                                    {/* Chat Header - Mobile Back Button */}
                                    <div className="p-3 lg:p-4 border-b border-gray-200 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                {/* Mobile Back Button */}
                                                <button
                                                    onClick={handleBackToList}
                                                    className="md:hidden p-1 text-gray-500 hover:text-blue-600 rounded-lg"
                                                >
                                                    <ArrowLeft className="h-5 w-5" />
                                                </button>
                                                <img
                                                    src={chatUsers.find(u => u.id === selectedChat)?.avatar}
                                                    alt="User"
                                                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">
                                                        {chatUsers.find(u => u.id === selectedChat)?.name}
                                                    </h3>
                                                    <p className="text-xs lg:text-sm text-gray-500 hidden lg:block">
                                                        {chatUsers.find(u => u.id === selectedChat)?.email}
                                                    </p>
                                                </div>
                                                <div className="hidden lg:flex space-x-1">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(chatUsers.find(u => u.id === selectedChat)?.priority || 'low')}`}>
                                                        {chatUsers.find(u => u.id === selectedChat)?.priority}
                                                    </span>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(chatUsers.find(u => u.id === selectedChat)?.status || 'active')}`}>
                                                        {chatUsers.find(u => u.id === selectedChat)?.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1 lg:space-x-2">
                                                <button className="p-1.5 lg:p-2 text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg transition-colors">
                                                    <Star className="h-4 w-4 lg:h-5 lg:w-5" />
                                                </button>
                                                <button className="hidden lg:block p-2 text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg transition-colors">
                                                    <Archive className="h-5 w-5" />
                                                </button>
                                                <button className="p-1.5 lg:p-2 text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg transition-colors">
                                                    <MoreVertical className="h-4 w-4 lg:h-5 lg:w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages - Responsive */}
                                    <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4 bg-gray-50">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className="flex items-end space-x-2 max-w-[80%] lg:max-w-xs xl:max-w-md">
                                                    {!msg.isAdmin && (
                                                        <img
                                                            src={chatUsers.find(u => u.id === selectedChat)?.avatar}
                                                            alt="User"
                                                            className="w-5 h-5 lg:w-6 lg:h-6 rounded-full object-cover flex-shrink-0"
                                                        />
                                                    )}
                                                    <div
                                                        className={`px-3 py-2 lg:px-4 lg:py-2 rounded-2xl ${msg.isAdmin
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-white border border-gray-200 text-gray-800'
                                                            }`}
                                                    >
                                                        <p className="text-xs lg:text-sm">{msg.message}</p>
                                                        <div className={`flex items-center justify-between mt-1 ${msg.isAdmin ? 'text-blue-100' : 'text-gray-500'}`}>
                                                            <span className="text-xs">{msg.timestamp}</span>
                                                            {msg.isAdmin && (
                                                                <span className="ml-2">
                                                                    {getMessageStatusIcon(msg.status)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Message Input - Responsive */}
                                    <div className="p-3 lg:p-4 bg-white border-t border-gray-200">
                                        <div className="flex items-end space-x-2">
                                            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                                                <Paperclip className="h-4 w-4 lg:h-5 lg:w-5" />
                                            </button>
                                            <div className="flex-1 relative">
                                                <textarea
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    placeholder="Type your response..."
                                                    className="w-full p-2 lg:p-3 pr-8 lg:pr-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-20 lg:max-h-32 text-sm lg:text-base"
                                                    rows={1}
                                                />
                                                <button className="absolute right-2 bottom-2 p-1 text-gray-500 hover:text-blue-600 transition-colors">
                                                    <Smile className="h-4 w-4 lg:h-5 lg:w-5" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleSendMessage}
                                                disabled={!message.trim()}
                                                className="p-2 lg:p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Send className="h-4 w-4 lg:h-5 lg:w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* No Chat Selected - Responsive */
                                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-4">
                                    <div className="text-center">
                                        <MessageSquare className="h-12 w-12 lg:h-16 lg:w-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                                        <p className="text-sm lg:text-base text-gray-600 max-w-md">
                                            Choose a user from the sidebar to start responding to their messages and provide support.
                                        </p>
                                        {/* Mobile: Show button to return to chat list */}
                                        <button
                                            onClick={() => setShowChatList(true)}
                                            className="md:hidden mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            View Conversations
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </div>
    );
};

export default ChatPageAdmin;