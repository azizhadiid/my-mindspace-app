'use client';

import React from 'react';
import { HeartIcon, ChatBubbleLeftRightIcon, AcademicCapIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

const services = [
    {
        icon: ChatBubbleLeftRightIcon,
        title: 'Individual Counseling',
        description: 'Connect one-on-one with a licensed therapist for personalized guidance and support tailored to your needs.',
    },
    {
        icon: HeartIcon,
        title: 'Couples & Family Therapy',
        description: 'Strengthen your relationships and improve communication with professional support for you and your loved ones.',
    },
    {
        icon: ChatBubbleBottomCenterTextIcon,
        title: 'AI Chat Assistant',
        description: 'Talk to an empathetic AI companion to manage stress, navigate emotions, and find clarity in challenging moments.',
    },
    {
        icon: AcademicCapIcon,
        title: 'Specialized Workshops',
        description: 'Join our expert-led workshops on topics like anxiety management, grief support, and self-esteem building.',
    },
];

const SectionThree = () => {
    return (
        <section id="services" className="relative overflow-hidden bg-white py-16 sm:py-24">
            {/* Background decoration for a subtle visual effect */}
            <div
                className="absolute bottom-0 right-0 z-0 h-96 w-96 bg-pink-500 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse-slow"
                aria-hidden="true"
            ></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-red-600">
                        <span className="block text-pink-500">Our Services</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                        At <b>Mindspace</b> , we offer a comprehensive suite of services to support every aspect of your mental well-being.
                    </p>
                </div>

                {/* Services grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white p-8 rounded-3xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-pink-100 text-pink-500 transform transition-transform duration-300 group-hover:scale-110">
                                <service.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionThree;