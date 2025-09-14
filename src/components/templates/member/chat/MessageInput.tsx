'use client'

// components/chat/MessageInput.tsx
import React from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface MessageInputProps {
    message: string;
    setMessage: (message: string) => void;
    handleSendMessage: () => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
    message,
    setMessage,
    handleSendMessage,
    handleKeyPress
}) => {
    return (
        <div className="p-4 bg-white border-t border-rose-100">
            <form className="flex items-center space-x-2">
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
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <Send className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;