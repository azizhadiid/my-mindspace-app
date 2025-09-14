'use client'

import React, { useEffect } from 'react'; // Import useEffect
import { MessageSquare, Phone } from 'lucide-react';

interface Psychologist {
    id: string;
    name: string;
    price: string;
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

interface BookingFormModalProps {
    selectedPsychologist: Psychologist;
    formData: ConsultationForm;
    setFormData: (data: ConsultationForm) => void;
    handleSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
    selectedPsychologist,
    formData,
    setFormData,
    handleSubmit,
    onClose
}) => {
    // Gunakan useEffect untuk menonaktifkan scroll pada body saat modal terbuka
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // Cleanup function: pastikan scroll diaktifkan kembali saat modal ditutup
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []); // Array dependensi kosong agar efek hanya berjalan saat komponen mount dan unmount

    const consultationTypes = [
        {
            type: 'video' as const,
            title: 'Video Call',
            icon: <MessageSquare className="w-6 h-6" />,
        },
        {
            type: 'chat' as const,
            title: 'Text Chat',
            icon: <MessageSquare className="w-6 h-6" />,
        },
        {
            type: 'phone' as const,
            title: 'Phone Call',
            icon: <Phone className="w-6 h-6" />,
        }
    ];

    const urgencyLevels = [
        { value: 'low', label: 'Low', color: 'green' },
        { value: 'medium', label: 'Medium', color: 'yellow' },
        { value: 'high', label: 'High', color: 'red' }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Consultation</h3>
                        <p className="text-gray-600">with {selectedPsychologist.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Consultation Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type</label>
                        <div className="grid grid-cols-3 gap-3">
                            {consultationTypes.map((type) => (
                                <button
                                    key={type.type}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: type.type })}
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
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                            <select
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief description of what you'd like to discuss..."
                            rows={3}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>

                    {/* Urgency */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Urgency Level</label>
                        <div className="grid grid-cols-3 gap-3">
                            {urgencyLevels.map((urgency) => (
                                <button
                                    key={urgency.value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, urgency: urgency.value as 'low' | 'medium' | 'high' })}
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
                            onClick={onClose}
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
    );
};

export default BookingFormModal;