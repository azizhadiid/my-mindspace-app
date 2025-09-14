// app/consultation/page.tsx
'use client'

import { useAuth } from "@/hooks/useAuth";
import React, { useState } from 'react';

// Components
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import PsychologistCard from "@/components/templates/member/consultation/PsychologistCard";
import ConsultationTypesSection from "@/components/templates/member/consultation/ConsultationTypesSection";
import WhyChooseUsSection from "@/components/templates/member/consultation/WhyChooseUsSection";
import CTASection from "@/components/templates/member/consultation/CTASection";
import BookingFormModal from "@/components/templates/member/consultation/BookingFormModal";
import HeroSection from "@/components/templates/member/consultation/HeroSection";

interface Psychologist {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    experience: string;
    price: string;
    availability: string;
    image: string;
    languages: string[];
    verified: boolean;
}

interface ConsultationForm {
    psychologistId: string;
    date: string;
    time: string;
    type: 'video' | 'chat' | 'phone';
    topic: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
}

const ConsultationPage = () => {
    const { user, loading } = useAuth("MEMBER");
    const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [formData, setFormData] = useState<ConsultationForm>({
        psychologistId: '',
        date: '',
        time: '',
        type: 'video',
        topic: '',
        description: '',
        urgency: 'medium'
    });

    const psychologists: Psychologist[] = [
        {
            id: '1',
            name: 'Dr. Sarah Mitchell',
            specialization: 'Anxiety & Depression',
            rating: 4.9,
            experience: '8 years',
            price: 'Rp 350.000',
            availability: 'Available today',
            image: '/api/placeholder/120/120',
            languages: ['Indonesian', 'English'],
            verified: true
        },
        {
            id: '2',
            name: 'Dr. Ahmad Rahman',
            specialization: 'Family Therapy',
            rating: 4.8,
            experience: '12 years',
            price: 'Rp 400.000',
            availability: 'Available tomorrow',
            image: '/api/placeholder/120/120',
            languages: ['Indonesian', 'English', 'Arabic'],
            verified: true
        },
        {
            id: '3',
            name: 'Dr. Lisa Chen',
            specialization: 'Teen Counseling',
            rating: 4.9,
            experience: '6 years',
            price: 'Rp 300.000',
            availability: 'Available in 2 days',
            image: '/api/placeholder/120/120',
            languages: ['Indonesian', 'English', 'Mandarin'],
            verified: true
        }
    ];
    

    const handleBookConsultation = (psychologist: Psychologist) => {
        setSelectedPsychologist(psychologist);
        setFormData(prev => ({ ...prev, psychologistId: psychologist.id }));
        setShowBookingForm(true);
    };

    const handleSubmitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Booking submitted:', formData);
        alert('Konsultasi berhasil dijadwalkan! Kami akan mengirimkan konfirmasi melalui email.');
        setShowBookingForm(false);
        setSelectedPsychologist(null);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-pink-500 animate-spin"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <MainTemplateMember>
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
                <HeroSection />

                {/* Psychologists Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                    Meet Our Experts
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Our team of experienced psychologists and therapists are here to support you
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {psychologists.map((psychologist) => (
                                <PsychologistCard
                                    key={psychologist.id}
                                    psychologist={psychologist}
                                    onBook={handleBookConsultation}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <ConsultationTypesSection />

                <WhyChooseUsSection />

                <CTASection />

                {showBookingForm && selectedPsychologist && (
                    <BookingFormModal
                        selectedPsychologist={selectedPsychologist}
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmitBooking}
                        onClose={() => setShowBookingForm(false)}
                    />
                )}
            </div>
        </MainTemplateMember>
    );
};

export default ConsultationPage;