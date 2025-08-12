import React from 'react';
import { Heart, TrendingUp, TrendingDown } from 'lucide-react';

// Mendefinisikan tipe untuk properti
interface StatsCardProps {
    icon: React.ElementType; // Menggunakan React.ElementType untuk komponen ikon
    title: string;
    value: string;
    change?: number; // Opsional
    color?: 'blue' | 'green' | 'pink' | 'purple'; // String literal untuk warna yang terbatas
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, title, value, change, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        pink: 'bg-pink-100 text-pink-600',
        purple: 'bg-purple-100 text-purple-600'
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {change && (
                    <div className="flex items-center">
                        {change > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-xs font-medium ml-1 ${change > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {Math.abs(change)}%
                        </span>
                    </div>
                )}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
            <p className="text-sm text-gray-600">{title}</p>
        </div>
    );
};

export default StatsCard;
