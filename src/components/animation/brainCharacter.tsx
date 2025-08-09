'use client'

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const BrainCharacter = ({ mood = 'happy' }: { mood?: string }) => (
    <div className="relative">
        <div className="w-32 h-32 mx-auto mb-4 relative animate-bounce">
            {/* Brain body */}
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-500 rounded-full relative overflow-hidden">
                {/* Brain texture lines */}
                <div className="absolute inset-2 border-2 border-pink-300 rounded-full opacity-50"></div>
                <div className="absolute inset-4 border border-pink-300 rounded-full opacity-30"></div>

                {/* Eyes */}
                <div className="absolute top-8 left-6 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
                <div className="absolute top-8 right-6 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>

                {/* Smile */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-gray-800 rounded-full"></div>

                {/* Arms */}
                <div className="absolute -left-2 top-12 w-6 h-12 bg-pink-500 rounded-full transform -rotate-12"></div>
                <div className="absolute -right-2 top-12 w-6 h-12 bg-pink-500 rounded-full transform rotate-12"></div>
            </div>

            {/* Halo */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-4 border-4 border-yellow-400 rounded-full opacity-80"></div>

            {/* Floating hearts */}
            <Heart className="absolute -top-2 -right-2 w-4 h-4 text-pink-400 fill-current animate-pulse" />
            <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-yellow-400 fill-current animate-pulse" />
        </div>
    </div>
);

export default BrainCharacter;
