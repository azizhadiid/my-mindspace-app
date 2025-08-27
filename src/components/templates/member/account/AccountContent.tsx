'use client'

import React, { useState } from 'react';
import {
    User,
    Clock,
    Shield,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AccountHeader from './component/AccountHeader';
import ProfileInfo from './component/ProfileInfo';
import ActivityTab from './component/ActivityTab';
import SettingsTab from './component/SettingsTab';


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

const AccountMemberContent = () => {
    const { user, loading } = useAuth("MEMBER");
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const [editedProfile, setEditedProfile] = useState<UserProfile>({} as UserProfile); // State untuk data yang diedit

    // Placeholder data for demonstration
    const userProfile: UserProfile = {
        id: '123',
        name: user?.name || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        phone: '0812-3456-7890',
        dateOfBirth: '1995-10-26',
        location: 'Jakarta, Indonesia',
        avatar: 'https://images.unsplash.com/photo-1534528736940-a3e9c70c6345?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        joinDate: '2023-01-15',
        consultationCount: 5,
        chatCount: 12,
        mindBotUsage: 256,
    };

    const handleEdit = () => {
        setIsEditing(true);
        // @ts-ignore
        setEditedProfile(userProfile);
    };

    const handleSave = () => {
        // Here you would typically make an API call to save the data
        console.log('Saving user profile:', editedProfile);
        // @ts-ignore
        // setUserProfile(editedProfile); // Uncomment this line if you have a state for userProfile
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleInputChange = (field: keyof UserProfile, value: string) => {
        // @ts-ignore
        setEditedProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const tabItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'activity', label: 'Activity', icon: Clock },
        { id: 'settings', label: 'Settings', icon: Shield }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <AccountHeader
                userProfile={userProfile}
                formatDate={formatDate}
            />

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex">
                        {tabItems.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
                                    ? 'border-b-2 border-pink-500 text-pink-500 bg-pink-50'
                                    : 'text-gray-600 hover:text-pink-500'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                    {activeTab === 'profile' && (
                        <ProfileInfo
                            userProfile={userProfile}
                            editedProfile={editedProfile}
                            isEditing={isEditing}
                            handleEdit={handleEdit}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handleInputChange={handleInputChange}
                        />
                    )}

                    {activeTab === 'activity' && <ActivityTab />}

                    {activeTab === 'settings' && <SettingsTab />}
                </div>
            </div>
        </div>
    );
}

export default AccountMemberContent;