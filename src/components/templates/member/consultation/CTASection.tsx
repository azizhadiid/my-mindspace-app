'use client'

// components/consultation/CTASection.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500 to-pink-500">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-pink-100 mb-8 leading-relaxed">
                    Take the first step towards better mental health. Our compassionate professionals are here to support you.
                </p>
                <button
                    onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                    className="bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                >
                    Book Your First Session
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
};

export default CTASection;