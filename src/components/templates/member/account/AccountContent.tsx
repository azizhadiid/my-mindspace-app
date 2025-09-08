'use client'

import { useAuth } from "@/hooks/useAuth";
import React, { useState } from 'react';
import { User, Mail, Calendar, Edit, Lock } from 'lucide-react'; // Mengimpor ikon
import ChangePasswordForm from "./component/ChangePasswordForm";
import EditProfileForm from "./component/EditProfileForm";



const AccountContent = () => {
    const { user, loading, } = useAuth("MEMBER");

    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [showEditProfileForm, setShowEditProfileForm] = useState(false);

    const handleSaveProfile = (newName: string, newEmail: string) => {

    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    My Account
                </h1>
                <p className="text-gray-600 md:text-lg">Manage your profile information, settings, and account preferences.</p>
            </div>

            {/* Bagian Utama Profil Card */}
            <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-rose-100 transform transition-all hover:scale-[1.01]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-32 h-32 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-6xl font-bold border-4 border-white shadow-md">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>

                    {/* Informasi Dasar */}
                    <div className="flex-grow text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{user?.name}</h2>
                        <p className="text-gray-500 mb-4">{user?.email}</p>

                        <div className="space-y-3 mt-6">
                            <div className="flex items-center gap-3 text-gray-700">
                                <User className="w-5 h-5 text-pink-500" />
                                <span>Full name: {user?.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Mail className="w-5 h-5 text-pink-500" />
                                <span>Email: {user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Calendar className="w-5 h-5 text-pink-500" />
                                <span>Joined Since: {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bagian Pengaturan Tambahan */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
                {/* Kartu Ganti Password */}
                <div className="bg-white/90 p-8 rounded-2xl shadow-md border border-rose-100 flex flex-col items-start transition-all hover:shadow-lg">
                    <Lock className="w-10 h-10 text-pink-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Change Password</h3>
                    <p className="text-gray-600 mb-4">Keep your account secure by updating your password regularly.</p>
                    <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium" onClick={() => setShowChangePasswordForm(true)}>
                        Change Password
                    </button>
                </div>

                {/* Kartu Edit Profil */}
                <div className="bg-white/90 p-8 rounded-2xl shadow-md border border-rose-100 flex flex-col items-start transition-all hover:shadow-lg">
                    <Edit className="w-10 h-10 text-pink-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Edit Information</h3>
                    <p className="text-gray-600 mb-4">Update your full name or personal information.</p>
                    <button className="border border-pink-500 text-pink-600 px-6 py-3 rounded-full hover:bg-pink-50 transition-all duration-300 font-medium" onClick={() => setShowEditProfileForm(true)}>
                        Edit Profile
                    </button>
                </div>
            </div>

            {showChangePasswordForm && (
                <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <ChangePasswordForm onClose={() => setShowChangePasswordForm(false)} />
                </div>
            )}

            {showEditProfileForm && (
                <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <EditProfileForm
                        onClose={() => setShowEditProfileForm(false)}
                    />
                </div>
            )}

        </div>
    );
};

export default AccountContent;
