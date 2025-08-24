'use client';

import React from 'react';
import Image from 'next/image';

const SectionTwo = () => {
    return (
        <section id="about" className="relative overflow-hidden py-16 sm:py-24">
            {/* Background decoration with a subtle radial gradient for depth */}
            <div className="absolute inset-0 z-0 bg-white">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-white"
                    aria-hidden="true"
                ></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
                    {/* Text content on the left side */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-red-600 mb-4">
                            <span className="block text-pink-500">About Mindspace</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            In a world that&apos;s constantly moving, it&apos;s easy to feel lost or overwhelmed. <b>Mindspace</b> is your personal haven—a safe, confidential space designed to help you navigate life&apos;s challenges with professional guidance and genuine support. We connect you with verified mental health professionals who are here to listen, understand, and empower you on your journey to well-being.
                        </p>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                            Our mission is to make mental health care accessible, stigma-free, and seamlessly integrated into your modern life. Whether you&apos;re seeking therapy, counseling, or simply a space to be heard, <b>Mindspace</b> is here for you, anytime, anywhere.
                        </p>
                    </div>

                    {/* Image on the right side with a modern, layered effect */}
                    <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out">
                            <Image
                                src="/img/welcome/consultation1.jpg" // Ganti dengan path ke gambar Anda
                                alt="A person meditating, representing mental well-being."
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                                className="rounded-3xl"
                            />
                            {/* Overlay for a subtle color effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-red-200/50 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionTwo;