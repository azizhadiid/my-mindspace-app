import React from 'react';
import { Heart } from 'lucide-react';

// Mendefinisikan tipe untuk props
interface PlaceholderContentProps {
    title: string;
    description: string;
}

const PlaceholderContent: React.FC<PlaceholderContentProps> = ({ title, description }) => (
    <div className="flex items-center justify-center h-96">
        <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 max-w-md">{description}</p>
        </div>
    </div>
);

export default PlaceholderContent;
