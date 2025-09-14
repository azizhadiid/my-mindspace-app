'use client'

// components/consultation/HeroSection.tsx
import React from 'react';
import { Sparkles, Shield, CheckCircle, Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-red-300 to-pink-400 rounded-full opacity-20 blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200 mb-8">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <span className="text-sm font-medium text-pink-600">Professional Mental Health Support</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                        Find Your
                    </span>
                    <br />
                    <span className="text-gray-900">Perfect Therapist</span>
                </h1>

                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Connect with licensed mental health professionals who understand your journey.
                    Book confidential consultations that fit your schedule and comfort level.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">100% Confidential</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">Licensed Professionals</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-700">Personalized Care</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;