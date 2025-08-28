'use client'

import { useAuth } from "@/hooks/useAuth";
import React, { useState } from 'react';
import { Calendar, Clock, Star, Heart, Shield, CheckCircle, User, Phone, Mail, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

// Component
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";

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

    const consultationTypes = [
        {
            type: 'video' as const,
            title: 'Video Call',
            description: 'Face-to-face consultation via video call',
            icon: <MessageSquare className="w-6 h-6" />,
            popular: true
        },
        {
            type: 'chat' as const,
            title: 'Text Chat',
            description: 'Real-time text messaging session',
            icon: <MessageSquare className="w-6 h-6" />,
            popular: false
        },
        {
            type: 'phone' as const,
            title: 'Phone Call',
            description: 'Voice-only consultation call',
            icon: <Phone className="w-6 h-6" />,
            popular: false
        }
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-pink-500 animate-spin"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    const handleBookConsultation = (psychologist: Psychologist) => {
        setSelectedPsychologist(psychologist);
        setFormData(prev => ({ ...prev, psychologistId: psychologist.id }));
        setShowBookingForm(true);
    };

    const handleSubmitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle booking submission here
        console.log('Booking submitted:', formData);
        alert('Konsultasi berhasil dijadwalkan! Kami akan mengirimkan konfirmasi melalui email.');
        setShowBookingForm(false);
        setSelectedPsychologist(null);
    };

    return (
        <MainTemplateMember>
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
                {/* Hero Section */}
                <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                                <div key={psychologist.id} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 hover:border-pink-300 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center">
                                            <User className="w-12 h-12 text-white" />
                                        </div>
                                        {psychologist.verified && (
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{psychologist.name}</h3>
                                        <p className="text-pink-600 font-medium mb-3">{psychologist.specialization}</p>

                                        <div className="flex items-center justify-center gap-4 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-medium text-gray-700">{psychologist.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{psychologist.experience}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-1 mb-4">
                                            {psychologist.languages.map((lang) => (
                                                <span key={lang} className="px-2 py-1 bg-pink-50 text-pink-600 text-xs rounded-full">
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-2xl font-bold text-gray-900 mb-2">{psychologist.price}</p>
                                        <p className="text-sm text-green-600 font-medium mb-6">{psychologist.availability}</p>
                                    </div>

                                    <button
                                        onClick={() => handleBookConsultation(psychologist)}
                                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-pink-500/30 flex items-center justify-center gap-2"
                                    >
                                        Book Consultation
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Consultation Types */}
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

                {/* Booking Form Modal */}
                {showBookingForm && selectedPsychologist && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Consultation</h3>
                                    <p className="text-gray-600">with {selectedPsychologist.name}</p>
                                </div>
                                <button
                                    onClick={() => setShowBookingForm(false)}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSubmitBooking} className="space-y-6">
                                {/* Consultation Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {consultationTypes.map((type) => (
                                            <button
                                                key={type.type}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, type: type.type }))}
                                                className={`p-3 rounded-xl border-2 transition-all ${formData.type === type.type
                                                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                        : 'border-gray-200 hover:border-pink-300'
                                                    }`}
                                            >
                                                <div className="text-center">
                                                    {type.icon}
                                                    <p className="text-sm font-medium mt-1">{type.title}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                        <select
                                            value={formData.time}
                                            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                            required
                                        >
                                            <option value="">Select time</option>
                                            <option value="09:00">09:00 AM</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="14:00">02:00 PM</option>
                                            <option value="15:00">03:00 PM</option>
                                            <option value="16:00">04:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Topic */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Topic</label>
                                    <input
                                        type="text"
                                        value={formData.topic}
                                        onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                                        placeholder="e.g., Anxiety, Depression, Relationship issues..."
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Brief description of what you'd like to discuss..."
                                        rows={3}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    />
                                </div>

                                {/* Urgency */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Urgency Level</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { value: 'low', label: 'Low', color: 'green' },
                                            { value: 'medium', label: 'Medium', color: 'yellow' },
                                            { value: 'high', label: 'High', color: 'red' }
                                        ].map((urgency) => (
                                            <button
                                                key={urgency.value}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, urgency: urgency.value as 'low' | 'medium' | 'high' }))}
                                                className={`p-3 rounded-xl border-2 transition-all ${formData.urgency === urgency.value
                                                        ? `border-${urgency.color}-500 bg-${urgency.color}-50 text-${urgency.color}-700`
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                {urgency.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowBookingForm(false)}
                                        className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        Book Consultation - {selectedPsychologist.price}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Why Choose Us Section */}
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
                            {[
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
                            ].map((feature, index) => (
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

                {/* CTA Section */}
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
            </div>
        </MainTemplateMember>
    );
};

export default ConsultationPage;