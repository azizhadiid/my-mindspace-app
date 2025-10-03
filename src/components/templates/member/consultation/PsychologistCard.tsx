'use client'

// components/consultation/PsychologistCard.tsx
import React from 'react';
import { Star, Clock, CheckCircle, ArrowRight, User } from 'lucide-react';
import type { Psychologist } from '@/types/psychologist';
import Image from 'next/image';

interface PsychologistCardProps {
    psychologist: Psychologist;
    onBook: (psychologist: Psychologist) => void;
}

// Fungsi kecil untuk format harga
const formatPrice = (priceString: string) => {
    const priceNumber = parseInt(priceString, 10);
    if (isNaN(priceNumber)) {
        return priceString; // Kembalikan string asli jika bukan angka
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(priceNumber);
};

const PsychologistCard: React.FC<PsychologistCardProps> = ({ psychologist, onBook }) => {
    return (
        <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 hover:border-pink-300 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 flex flex-col">
            <div className="relative mb-6">
                {/* 👇 PERUBAHAN 2: Gunakan Next/Image untuk menampilkan gambar dari database */}
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden relative border-4 border-pink-100">
                    <Image
                        src={psychologist.image}
                        alt={`Photo of ${psychologist.name}`}
                        fill // Ganti layout="fill" dengan ini
                        className="object-cover" // Ganti objectFit="cover" dengan ini
                        unoptimized
                    />
                </div>
                {psychologist.verified && (
                    <div className="absolute top-0 right-1/2 translate-x-[60px] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                )}
            </div>

            <div className="text-center mb-6 flex-grow">
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

                {/* 👇 PERUBAHAN 3: Hapus bagian yang menampilkan `languages` dan `availability` */}
                {/* <div className="flex flex-wrap ..."> ... </div> */}
                {/* <p className="text-sm text-green-600 ...">{psychologist.availability}</p> */}

                {/* Gunakan fungsi formatPrice untuk harga */}
                <p className="text-2xl font-bold text-gray-900 mb-2">{formatPrice(psychologist.price)}</p>
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