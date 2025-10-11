'use client'

// components/mindbot/ChatInputArea.tsx
import React from 'react';
import { Send, Heart } from 'lucide-react';

interface ChatInputAreaProps {
    inputMessage: string;
    isTyping: boolean;
    setInputMessage: (message: string) => void;
    handleSendMessage: () => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
    inputMessage,
    isTyping,
    setInputMessage,
    handleSendMessage,
    handleKeyPress,
    inputRef
}) => {
    return (
        <div className="border-t border-rose-100 p-4 bg-white/50">
            <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Share what's on your mind..."
                        className="w-full px-4 py-3 pr-12 rounded-full border border-rose-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
                        disabled={isTyping}
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>

            {/* Helpful Tips */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">💡 Helpful tips for better conversations:</p>
                <div className="flex flex-wrap justify-center gap-2">
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs">Be specific about your feelings</span>
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs">Take your time</span>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">This is a safe space</span>
                </div>
            </div>
        </div>
    );
};

export default ChatInputArea;