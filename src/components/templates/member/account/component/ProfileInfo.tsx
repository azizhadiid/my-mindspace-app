import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit2, Save, X } from 'lucide-react';
import InputField from '@/components/form/input';

// Di ProfileInfo.tsx
interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    location: string;
    avatar: string;
    joinDate: string;
    consultationCount: number;
    chatCount: number;
    mindBotUsage: number;
}

interface ProfileInfoProps {
    userProfile: {
        name: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        location: string;
    };
    editedProfile: any;
    isEditing: boolean;
    handleEdit: () => void;
    handleSave: () => void;
    handleCancel: () => void;
    handleInputChange: (field: keyof UserProfile, value: string) => void;
}

const ProfileInfo = ({
    userProfile,
    editedProfile,
    isEditing,
    handleEdit,
    handleSave,
    handleCancel,
    handleInputChange,
}: ProfileInfoProps) => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Informasi Profile</h2>
            {!isEditing ? (
                <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                </button>
            ) : (
                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama */}
            <InputField
                label="Nama Lengkap"
                name="name"
                placeholder="Masukkan nama lengkap Anda"
                value={isEditing ? editedProfile?.name : userProfile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                icon={User}
            />

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-800">{userProfile.email}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
            </div>

            {/* Nomor Telepon */}
            <InputField
                label="Nomor Telepon"
                name="phone"
                type="text"
                placeholder="Masukkan nomor telepon Anda"
                value={isEditing ? editedProfile?.phone : userProfile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                icon={Phone}
            />

            {/* Tanggal Lahir */}
            <InputField
                label="Tanggal Lahir"
                name="dateOfBirth"
                type="text" // Using text to handle date as string
                placeholder="YYYY-MM-DD"
                value={isEditing ? editedProfile?.dateOfBirth : userProfile.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                icon={Calendar}
            />

            {/* Lokasi */}
            <div className="md:col-span-2">
                <InputField
                    label="Lokasi"
                    name="location"
                    placeholder="Masukkan lokasi Anda"
                    value={isEditing ? editedProfile?.location : userProfile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    icon={MapPin}
                />
            </div>
        </div>
    </div>
);

export default ProfileInfo;