'use client'

// components/mindbot/ChatMessageBubble.tsx
import React from 'react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface ChatMessageBubbleProps {
    message: Message;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <div
            key={message.id}
            className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
        >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser
                ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}>
                {isUser ? (
                    <User className="w-4 h-4 text-white" />
                ) : (
                    <Bot className="w-4 h-4 text-white" />
                )}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${isUser
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-gradient-to-r from-rose-50 to-pink-50 text-gray-800 border border-rose-200'
                }`}>
                <div className="prose prose-sm max-w-none text-sm leading-relaxed prose-p:my-2 prose-li:my-1 prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal prose-li:ml-5">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.text}
                    </ReactMarkdown>
                </div>

                <p
                    className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'
                        }`}
                >
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </div>
    );
};

export default ChatMessageBubble;