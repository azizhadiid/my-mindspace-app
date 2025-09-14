'use client'

// components/consultation/WhyChooseUsSection.tsx
import React from 'react';
import { Shield, CheckCircle, Clock, Heart } from 'lucide-react';

const WhyChooseUsSection: React.FC = () => {
    const features = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "100% Confidential",
            description: "Your privacy is our top priority. All sessions are completely confidential."
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Licensed Professionals",
            description: "All our therapists are licensed and experienced mental health professionals."
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Flexible Scheduling",
            description: "Book sessions that fit your schedule, including evenings and weekends."
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Personalized Care",
            description: "Each session is tailored to your specific needs and goals."
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            Why Choose MindSpace?
                        </span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl flex items-center justify-center text-pink-600 group-hover:from-red-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;