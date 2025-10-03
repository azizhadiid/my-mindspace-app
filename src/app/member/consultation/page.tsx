// app/consultation/page.tsx
'use client'

import { useAuth } from "@/hooks/useAuth";
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";

// Components
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import PsychologistCard from "@/components/templates/member/consultation/PsychologistCard";
import ConsultationTypesSection from "@/components/templates/member/consultation/ConsultationTypesSection";
import WhyChooseUsSection from "@/components/templates/member/consultation/WhyChooseUsSection";
import CTASection from "@/components/templates/member/consultation/CTASection";
import BookingFormModal from "@/components/templates/member/consultation/BookingFormModal";
import HeroSection from "@/components/templates/member/consultation/HeroSection";

// Types
import type { ConsultationForm, Psychologist } from "@/types/psychologist";

const ConsultationPage = () => {
    const { user, loading: authLoading } = useAuth("MEMBER");
    // 👇 PERUBAHAN 2: Tambahkan state untuk data psikolog dan loading
    const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true); // State loading untuk data

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

    // 👇 PERUBAHAN 3: Gunakan useEffect untuk mengambil data dari API saat komponen dimuat
    useEffect(() => {
        const fetchPsychologists = async () => {
            try {
                const res = await fetch('/api/member/consultations');
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                setPsychologists(data);
            } catch (error) {
                console.error(error);
                toast.error("Could not load psychologists data.");
            } finally {
                setIsLoadingData(false); // Hentikan loading setelah selesai
            }
        };

        fetchPsychologists();
    }, []); // Array dependensi kosong agar hanya berjalan sekali

    // 👇 PERUBAHAN 4: Hapus data `psychologists` yang di-hardcode
    // const psychologists: Psychologist[] = [ ... ]; <-- HAPUS BLOK INI

    const handleBookConsultation = (psychologist: Psychologist) => {
        // Cek jika user belum login
        if (!user) {
            toast.error("You must be logged in to book a consultation.");
            // Optional: redirect ke halaman login
            // window.push('/login');
            return;
        }
        setSelectedPsychologist(psychologist);
        setFormData(prev => ({ ...prev, psychologistId: psychologist.id }));
        setShowBookingForm(true);
    };

    const handleSubmitBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        // Tambahan: Pastikan selectedPsychologist tidak null
        if (!selectedPsychologist) {
            toast.error("An error occurred. Please select a psychologist again.");
            return;
        }

        try {
            const res = await fetch("/api/member/consultations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // 👇 PERUBAHAN DI SINI: Sertakan nama psikolog
                body: JSON.stringify({
                    ...formData,
                    psychologistName: selectedPsychologist.name,
                    price: selectedPsychologist.price,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to book consultation");

            // 🚀 Midtrans Snap Popup
            const snap = (window as any).snap;
            if (snap && data.token) { // Pastikan token ada
                snap.pay(data.token, { // Langsung gunakan data.token
                    onSuccess: function (result: any) {
                        toast.success("Payment successful! Please wait for confirmation.");
                        // Anda bisa redirect ke halaman "my-orders" atau semacamnya
                        // window.location.href = '/member/my-consultations';
                    },
                    onPending: function (result: any) {
                        toast("Waiting for your payment...");
                    },
                    onError: function (result: any) {
                        toast.error("Payment failed. Please try again.");
                    },
                    onClose: function () {
                        // Tidak perlu melakukan apa-apa karena data di DB statusnya sudah 'PENDING'
                        // Mungkin bisa dihapus setelah beberapa waktu dengan cron job
                        toast("You closed the payment pop-up.");
                    },
                });
            } else {
                // Fallback jika snap tidak ada (jarang terjadi)
                // Anda mungkin perlu handle redirect URL dari Midtrans jika ada
                console.error("Snap.js is not loaded or token is missing");
            }

            toast.success("Consultation successfully scheduled!");
            setShowBookingForm(false);
            setSelectedPsychologist(null);
            // Reset form jika perlu
            setFormData({
                psychologistId: '',
                date: '',
                time: '',
                type: 'video',
                topic: '',
                description: '',
                urgency: 'medium'
            });

        } catch (err: any) {
            toast.error(err.message);
        }
    };

    if (authLoading || isLoadingData) {
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