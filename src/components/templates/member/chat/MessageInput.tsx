'use client'

// components/chat/MessageInput.tsx
import React from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
    message: string;
    setMessage: (message: string) => void;
    onSendMessage: () => void; // Mengganti nama prop agar lebih jelas
}

const MessageInput: React.FC<MessageInputProps> = ({
    message,
    setMessage,
    onSendMessage
}) => {
    // MENANGANI SUBMIT FORM (TERMASUK TOMBOL ENTER)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Mencegah reload halaman
        if (message.trim()) {
            onSendMessage();
        }
    };

    // MENANGANI KEYPRESS UNTUK ENTER & SHIFT+ENTER
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Tidak perlu cek Shift+Enter lagi
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="p-4 bg-white border-t border-rose-100">
            {/* Menggunakan onSubmit untuk penanganan form yang lebih baik */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message to admin..."
                        className="w-full p-3 pr-4 border border-rose-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                </div>
                <button
                    type="submit" // Tipe button diubah menjadi "submit"
                    disabled={!message.trim()}
                    className="p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 self-start" // 'self-end' agar tombol sejajar bawah
                >
                    <Send className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;