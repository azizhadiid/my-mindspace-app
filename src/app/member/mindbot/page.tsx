'use client'

import { useAuth } from "@/hooks/useAuth";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Heart, Brain } from 'lucide-react';

// Component
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const MindBotPage = () => {
    const { user, loading } = useAuth("MEMBER");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm MindBot, your AI companion for mental health support. How are you feeling today? I'm here to listen and help you navigate through your thoughts and emotions.",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "Thank you for sharing that with me. I understand this might be challenging for you. Can you tell me more about what specifically is making you feel this way? Remember, there's no judgment here - this is a safe space for you to express yourself.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
                <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-pink-500 animate-spin"></div>
                <p className="mt-4 text-lg text-gray-700">Loading MindBot...</p>
            </div>
        );
    }

    return (
        <MainTemplateMember>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            MindBot
                        </h1>
                        <Sparkles className="w-6 h-6 text-pink-500" />
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Your AI companion for mental health support. Share your thoughts, feelings, and concerns in a safe,
                        non-judgmental environment. MindBot is here to listen, understand, and provide gentle guidance.
                    </p>
                </div>

                {/* Chat Container */}
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-rose-100 shadow-xl overflow-hidden">
                    {/* Chat Messages */}
                    <div className="h-96 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                    }`}
                            >
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                                        ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                                        : 'bg-gradient-to-r from-red-500 to-pink-500'
                                    }`}>
                                    {message.sender === 'user' ? (
                                        <User className="w-4 h-4 text-white" />
                                    ) : (
                                        <Bot className="w-4 h-4 text-white" />
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.sender === 'user'
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                        : 'bg-gradient-to-r from-rose-100 to-pink-100 text-gray-800 border border-rose-200'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                    <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-gradient-to-r from-rose-100 to-pink-100 text-gray-800 border border-rose-200 px-4 py-3 rounded-2xl">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
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
                                <Heart className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
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
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 text-center">
                        <strong>Important:</strong> MindBot provides supportive conversations but is not a replacement for professional mental health care.
                        If you're experiencing a mental health crisis, please contact emergency services or a qualified mental health professional.
                    </p>
                </div>
            </div>
        </MainTemplateMember>
    );
};

export default MindBotPage;