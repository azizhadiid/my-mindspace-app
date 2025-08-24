// components/TherapistsSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';

// Data terapis, bisa diganti dengan data dari API di proyek nyata
const therapists = [
    {
        name: 'Dr. Anya Sharma',
        specialty: 'Clinical Psychologist',
        image: '/img/psikolog/testimonials-2.jpg', // Ganti dengan path ke gambar terapis
        description: 'Specializing in anxiety, stress management, and mindfulness techniques.',
    },
    {
        name: 'Michael Chen, M.S.',
        specialty: 'Couples Counselor',
        image: '/img/psikolog/testimonials-1.jpg',
        description: 'Expert in communication, conflict resolution, and relationship dynamics.',
    },
    {
        name: 'Sarah Kim, L.C.S.W.',
        specialty: 'Trauma & Grief Specialist',
        image: '/img/psikolog/testimonials-3.jpg',
        description: 'Helps individuals navigate trauma, loss, and emotional healing with compassion.',
    },
    {
        name: 'Dr. Ben Carter',
        specialty: 'Child & Adolescent Therapist',
        image: '/img/psikolog/testimonials-4.jpg',
        description: 'Supports young clients through behavioral issues, family transitions, and self-esteem.',
    },
];

const SectionFour = () => {
    return (
        <section id="therapists" className="relative overflow-hidden bg-white py-16 sm:py-24">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-red-600">
                        <span className="block text-pink-500">Meet Our Therapists</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                        Our team of licensed and compassionate professionals is dedicated to your well-being. Find the perfect match for your journey.
                    </p>
                </div>

                {/* Therapists grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {therapists.map((therapist, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center text-center bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white transform transition-transform duration-300 group-hover:scale-110 group-hover:border-pink-500">
                                <Image
                                    src={therapist.image}
                                    alt={`Photo of ${therapist.name}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{therapist.name}</h3>
                            <p className="text-sm font-semibold text-red-600 mb-2">{therapist.specialty}</p>
                            <p className="text-gray-600 leading-relaxed text-sm">{therapist.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionFour;