'use client'

// components/mindbot/MindBotHeader.tsx
import React from 'react';
import { Sparkles, Brain } from 'lucide-react';

const MindBotHeader: React.FC = () => {
    return (
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
    );
};

export default MindBotHeader;