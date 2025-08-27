import React from 'react';
import { Heart, MessageCircle, Award } from 'lucide-react';

const ActivityTab = () => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Aktivitas Terbaru</h2>
        <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">Konsultasi dengan Dr. Sarah</h3>
                        <p className="text-gray-600 text-sm">2 hari yang lalu</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Selesai</span>
                </div>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">Chat Session</h3>
                        <p className="text-gray-600 text-sm">5 hari yang lalu</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Aktif</span>
                </div>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">MindBot Conversation</h3>
                        <p className="text-gray-600 text-sm">1 minggu yang lalu</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">50 pesan</span>
                </div>
            </div>
        </div>
    </div>
);

export default ActivityTab;