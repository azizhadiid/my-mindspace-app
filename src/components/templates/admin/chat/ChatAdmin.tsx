import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Paperclip, Send, Smile, MessageCircle, List } from 'lucide-react';

// Tipe data untuk state (sesuaikan dengan respons API)
type Conversation = {
    memberId: string;
    memberName: string;
    lastMessage: string;
    lastMessageTimestamp: string; // ISO string date
    unread: number;
};

type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string; // ISO string date
    sender: {
        id: string;
        name: string;
        role: "ADMIN" | "MEMBER" | "PSIKOLOG";
    };
};

// Komponen Chat Admin
const ChatAdmin = () => {
    // State untuk mengelola input pesan
    const [message, setMessage] = useState('');
    // State untuk mengelola tampilan daftar chat di mobile
    const [showChatList, setShowChatList] = useState(true);

    // --- Ganti Dummy Data dengan State ---
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]);
    const [activeMember, setActiveMember] = useState<Conversation | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Fungsi untuk mengambil daftar percakapan (sisi kiri)
    const fetchConversations = async () => {
        try {
            const res = await fetch("/api/admin/chat/conversations");
            if (!res.ok) throw new Error("Failed to fetch conversations");
            const data: Conversation[] = await res.json();
            setConversations(data);
        } catch (error) {
            console.error(error);
            // Tampilkan error di UI jika perlu
        }
    };

    // 2. Fungsi untuk mengambil riwayat chat (sisi kanan)
    const fetchMessages = async (member: Conversation) => {
        setActiveMember(member);
        setIsLoading(true);
        setActiveChatMessages([]); // Kosongkan chat sebelumnya

        try {
            const res = await fetch(`/api/admin/chat/${member.memberId}`);
            if (!res.ok) throw new Error("Failed to fetch messages");
            const data: Message[] = await res.json();
            setActiveChatMessages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Fungsi untuk mengirim pesan
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !activeMember) return;

        const optimisticMessage: Message = {
            id: "temp-" + Date.now(), // ID sementara
            content: message,
            senderId: "admin-id", // ID admin saat ini (bisa diambil dari session)
            receiverId: activeMember.memberId,
            createdAt: new Date().toISOString(),
            sender: { id: "admin-id", name: "Admin", role: "ADMIN" },
        };

        // Optimistic UI update
        setActiveChatMessages((prev) => [...prev, optimisticMessage]);
        setMessage("");

        try {
            const res = await fetch(`/api/admin/chat/${activeMember.memberId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: message }),
            });

            const actualMessage: Message = await res.json();

            if (!res.ok) {
                // Kembalikan jika error
                setActiveChatMessages((prev) =>
                    prev.filter((msg) => msg.id !== optimisticMessage.id)
                );
                throw new Error(actualMessage.error || "Failed to send");
            }

            // Ganti pesan sementara dengan pesan asli dari server
            setActiveChatMessages((prev) =>
                prev.map((msg) =>
                    msg.id === optimisticMessage.id ? actualMessage : msg
                )
            );
            // Perbarui juga last message di daftar percakapan
            fetchConversations();
        } catch (error) {
            console.error(error);
            // Handle error (mis: tampilkan pesan "Gagal mengirim")
        }
    };

    // 4. Ambil daftar percakapan saat komponen dimuat
    useEffect(() => {
        fetchConversations();
    }, []);

    // Fungsi untuk klik chat di sisi kiri
    const handleChatClick = (chat: Conversation) => {
        fetchMessages(chat);
        if (window.innerWidth < 768) {
            setShowChatList(false);
        }
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
                    {conversations.map((chat) => (
                        <div
                            key={chat.memberId}
                            className={`flex items-center p-4 cursor-pointer transition-colors duration-200 ${activeMember?.memberId === chat.memberId
                                ? "bg-pink-100 border-l-4 border-pink-500"
                                : "hover:bg-gray-50"
                                }`}
                            onClick={() => handleChatClick(chat)}
                        >
                            <div className="relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-pink-500 font-bold text-lg mr-4">
                                {chat.memberName[0].toUpperCase()}
                                {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div> */}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-800">
                                    {chat.memberName}
                                </h3>
                                <p className="text-xs text-gray-500 truncate">
                                    {chat.lastMessage}
                                </p>
                            </div>
                            {/* Note: Unread count belum berfungsi, perlu update schema `Message` dengan `isRead: Boolean`
               {chat.unread > 0 && (
                 <span className="bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ml-2">
                   {chat.unread}
                 </span>
               )}
              */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sisi Kanan: Area Chat Aktif */}
            <div
                className={`flex-1 flex-col ${showChatList ? "hidden md:flex" : "flex"
                    }`}
            >
                {/* Tampilkan jika ada chat yang aktif */}
                {activeMember ? (
                    <>
                        {/* Header Chat */}
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center">
                                <button
                                    className="text-gray-500 hover:text-gray-700 mr-3 md:hidden"
                                    onClick={() => setShowChatList(true)}
                                >
                                    <List size={20} />
                                </button>
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-pink-500 font-bold text-lg mr-3">
                                    {activeMember.memberName[0].toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800">
                                        {activeMember.memberName}
                                    </h3>
                                    {/* <p className="text-xs text-gray-500">Online</p> */}
                                </div>
                            </div>
                        </div>

                        {/* Area Pesan */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
                            {isLoading && <p>Loading messages...</p>}
                            {activeChatMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender.role === "ADMIN" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`p-3 rounded-lg max-w-xs ${msg.sender.role === "ADMIN"
                                            ? "bg-pink-500 text-white"
                                            : "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        <p className="text-sm">{msg.content}</p>
                                        <span
                                            className={`block text-xs mt-1 ${msg.sender.role === "ADMIN"
                                                ? "text-pink-100"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            {new Date(msg.createdAt).toLocaleTimeString("id-ID", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Pesan */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 border-t border-gray-200 flex items-center space-x-3 bg-white"
                        >
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-3 bg-pink-500 text-white rounded-full transition-colors hover:bg-pink-600"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    // Tampilan jika belum ada chat yang dipilih
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <p className="text-gray-500">
                            Pilih percakapan untuk memulai chat.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatAdmin;