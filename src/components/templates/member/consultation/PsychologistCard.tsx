'use client'

// components/consultation/PsychologistCard.tsx
import React from 'react';
import { Star, Clock, CheckCircle, ArrowRight, User } from 'lucide-react';

interface Psychologist {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    experience: string;
    price: string;
    availability: string;
    image: string; // Not used in this version but good practice to keep
    languages: string[];
    verified: boolean;
}

interface PsychologistCardProps {
    psychologist: Psychologist;
    onBook: (psychologist: Psychologist) => void;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({ psychologist, onBook }) => {
    return (
        <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 hover:border-pink-300 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2">
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
                onClick={() => onBook(psychologist)}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-pink-500/30 flex items-center justify-center gap-2"
            >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default PsychologistCard;