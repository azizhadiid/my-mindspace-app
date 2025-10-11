'use client'

import { useAuth } from "@/hooks/useAuth";
import React, { useState, useRef, useEffect } from 'react';

// Components
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import MindBotHeader from "@/components/templates/member/mindbot/MindBotHeader";
import ChatMessageBubble from "@/components/templates/member/mindbot/ChatMessageBubble";
import { Bot } from "lucide-react";
import ChatInputArea from "@/components/templates/member/mindbot/ChatInputArea";
import DisclaimerSection from "@/components/templates/member/mindbot/DisclaimerSection";

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
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 🔹 Cek apakah user scroll ke bawah
    const [autoScroll, setAutoScroll] = useState(true);

    const handleScroll = () => {
        const el = scrollContainerRef.current;
        if (!el) return;

        // Kalau posisi scroll sudah dekat ke bawah (misal 100px dari bawah)
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
        setAutoScroll(isNearBottom);
    };

    useEffect(() => {
        if (autoScroll) scrollToBottom();
    }, [messages, autoScroll]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputMessage("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/member/mindbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: inputMessage }),
            });

            const data = await res.json();

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: data.reply || "Maaf, saya tidak bisa merespons saat ini.",
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Error:", error);
            const fallback: Message = {
                id: (Date.now() + 2).toString(),
                text: "Terjadi kesalahan, coba lagi nanti ya 🥲",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, fallback]);
        } finally {
            setIsTyping(false);
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
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
                <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-pink-500 animate-spin"></div>
                <p className="mt-4 text-lg text-gray-700">Loading MindBot...</p>
            </div>
        );
    }

    return (
        <MainTemplateMember>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <MindBotHeader />

                {/* Chat Container */}
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-rose-100 shadow-xl overflow-hidden">
                    {/* Chat Messages */}
                    <div className="h-96 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <ChatMessageBubble key={message.id} message={message} />
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

                    <ChatInputArea
                        inputMessage={inputMessage}
                        isTyping={isTyping}
                        setInputMessage={setInputMessage}
                        handleSendMessage={handleSendMessage}
                        handleKeyPress={handleKeyPress}
                        inputRef={inputRef}
                    />
                </div>

                <DisclaimerSection />
            </div>
        </MainTemplateMember>
    );
};

export default MindBotPage;