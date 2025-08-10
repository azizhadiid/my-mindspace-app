'use client'

import React from 'react';
import { Heart, Sparkles, User } from 'lucide-react';
import BrainCharacter from '../animation/brainCharacter';

const WelcomePanel = () => (
    <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
        <div className="max-w-md text-center">
            <BrainCharacter />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to <span className="text-pink-500">MindSpace</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
                Find clarity with insightful psychology
            </p>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-4 h-4 text-pink-500" />
                    </div>
                    <span className="text-gray-700">Professional mental health support</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-gray-700">Personalized therapy sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-gray-700">Expert psychologists available</span>
                </div>
            </div>
        </div>
    </div>
);

export default WelcomePanel;
