import React from 'react';
import { User, Camera, Heart, MessageCircle, Award } from 'lucide-react';

interface AccountHeaderProps {
    userProfile: {
        name: string;
        avatar: string;
        joinDate: string;
        consultationCount: number;
        chatCount: number;
        mindBotUsage: number;
    };
    formatDate: (dateString: string) => string;
}

const AccountHeader = ({ userProfile, formatDate }: AccountHeaderProps) => (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center overflow-hidden">
                    {userProfile.avatar ? (
                        <img
                            src={userProfile.avatar}
                            alt={userProfile.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-16 h-16 text-pink-500" />
                    )}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
                    <Camera className="w-5 h-5" />
                </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{userProfile.name}</h1>
                <p className="text-gray-600 mb-4">Member sejak {formatDate(userProfile.joinDate)}</p>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{userProfile.consultationCount}</p>
                                <p className="text-sm text-gray-600">Konsultasi</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{userProfile.chatCount}</p>
                                <p className="text-sm text-gray-600">Chat Sesi</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{userProfile.mindBotUsage}</p>
                                <p className="text-sm text-gray-600">MindBot Chat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AccountHeader;