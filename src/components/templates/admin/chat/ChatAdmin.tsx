import React, { useState } from 'react';
import { ChevronDown, Search, Paperclip, Send, Smile, MessageCircle, List } from 'lucide-react';

// Komponen Chat Admin
const ChatAdmin = () => {
    // State untuk mengelola input pesan
    const [message, setMessage] = useState('');
    // State untuk mengelola tampilan daftar chat di mobile
    const [showChatList, setShowChatList] = useState(true);

    // Data dummy untuk daftar chat
    const chats = [
        { id: 1, name: 'Alice Smith', lastMessage: 'Okay, thanks!', unread: 2, isActive: true },
        { id: 2, name: 'Bob Johnson', lastMessage: 'See you later.', unread: 0, isActive: false },
        { id: 3, name: 'Charlie Brown', lastMessage: 'Got it!', unread: 0, isActive: false },
        { id: 4, name: 'Diana Prince', lastMessage: 'Yes, I understand.', unread: 1, isActive: false },
        { id: 5, name: 'Ethan Hunt', lastMessage: 'Sounds good.', unread: 0, isActive: false },
    ];

    // Data dummy untuk pesan dalam chat yang aktif
    const activeChatMessages = [
        { id: 1, sender: 'member', text: 'Hi, I need help with my account.', timestamp: '10:00 AM' },
        { id: 2, sender: 'admin', text: 'Hello, what seems to be the issue?', timestamp: '10:02 AM' },
        { id: 3, sender: 'member', text: 'I can\'t log in.', timestamp: '10:05 AM' },
        { id: 4, sender: 'admin', text: 'Could you please reset your password?', timestamp: '10:06 AM' },
    ];

    // Fungsi untuk mengubah chat aktif dan menyembunyikan daftar chat di mobile
    const handleChatClick = (chatId: number) => {
        // Logika untuk mengubah chat aktif di sini (untuk saat ini, kita hanya menyembunyikan daftar chat)
        if (window.innerWidth < 768) { // Contoh breakpoint untuk mobile
            setShowChatList(false);
        }
        console.log(`Chat ${chatId} selected`);
    };

    return (
        <div className="flex w-full h-full bg-white rounded-xl shadow-lg overflow-hidden relative md:static">
            {/* Sisi Kiri: Daftar Chat */}
            <div className={`absolute inset-0 md:static md:w-1/3 border-r border-gray-200 flex-col z-10 bg-white ${showChatList ? 'flex' : 'hidden md:flex'}`}>
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Chats</h2>
                        <button className="text-gray-500 hover:text-gray-700 md:hidden" onClick={() => setShowChatList(false)}>
                            <MessageCircle size={20} /> {/* Ikon untuk kembali ke chat aktif */}
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 hidden md:block">
                            <ChevronDown size={20} />
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Daftar Kontak/Chat */}
                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex items-center p-4 cursor-pointer transition-colors duration-200 ${chat.isActive ? 'bg-pink-100 border-l-4 border-pink-500' : 'hover:bg-gray-50'
                                }`}
                            onClick={() => handleChatClick(chat.id)}
                        >
                            <div className="relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-pink-500 font-bold text-lg mr-4">
                                {chat.name[0]}
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-800">{chat.name}</h3>
                                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <span className="bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ml-2">
                                    {chat.unread}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sisi Kanan: Area Chat Aktif */}
            <div className={`flex-1 flex-col ${showChatList ? 'hidden md:flex' : 'flex'}`}>
                {/* Header Chat */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                        <button className="text-gray-500 hover:text-gray-700 mr-3 md:hidden" onClick={() => setShowChatList(true)}>
                            <List size={20} /> {/* Ikon untuk menampilkan daftar chat */}
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-pink-500 font-bold text-lg mr-3">
                            A
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-800">Alice Smith</h3>
                            <p className="text-xs text-gray-500">Online</p>
                        </div>
                    </div>
                </div>

                {/* Area Pesan */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
                    {activeChatMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-xs ${msg.sender === 'admin'
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <span className={`block text-xs mt-1 ${msg.sender === 'admin' ? 'text-pink-100' : 'text-gray-500'}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Pesan */}
                <div className="p-4 border-t border-gray-200 flex items-center space-x-3 bg-white">
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                        <Paperclip size={20} />
                    </button>
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <Smile className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={20} />
                    </div>
                    <button className="p-3 bg-pink-500 text-white rounded-full transition-colors hover:bg-pink-600">
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatAdmin;