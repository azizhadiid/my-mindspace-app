'use client'

// components/consultation/ConsultationTypesSection.tsx
import React, { JSX } from 'react';
import { MessageSquare, Phone } from 'lucide-react';

interface ConsultationType {
    type: 'video' | 'chat' | 'phone';
    title: string;
    description: string;
    icon: JSX.Element;
    popular: boolean;
}

const ConsultationTypesSection: React.FC = () => {
    const consultationTypes: ConsultationType[] = [
        {
            type: 'video',
            title: 'Video Call',
            description: 'Face-to-face consultation via video call',
            icon: <MessageSquare className="w-6 h-6" />,
            popular: true
        },
        {
            type: 'chat',
            title: 'Text Chat',
            description: 'Real-time text messaging session',
            icon: <MessageSquare className="w-6 h-6" />,
            popular: false
        },
        {
            type: 'phone',
            title: 'Phone Call',
            description: 'Voice-only consultation call',
            icon: <Phone className="w-6 h-6" />,
            popular: false
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            Choose Your Preferred Method
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We offer flexible consultation options to match your comfort and needs
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {consultationTypes.map((type) => (
                        <div key={type.type} className="relative group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 hover:border-pink-300 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2">
                            {type.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                                    {type.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                                <p className="text-gray-600">{type.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConsultationTypesSection;