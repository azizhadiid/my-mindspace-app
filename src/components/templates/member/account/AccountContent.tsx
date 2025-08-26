'use client';

import React, { useState, useRef } from 'react';
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Camera,
    Save,
    Edit3,
    Shield,
    Bell,
    Eye,
    EyeOff,
    Check,
    X,
    Trash2,
    Settings,
    Heart,
    Clock,
    Award,
    CheckCircle
} from 'lucide-react';

interface AccountData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    emergencyContact: string;
    emergencyPhone: string;
    profileImage: string | null;
}

interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    appointmentReminders: boolean;
    wellnessUpdates: boolean;
}

const AccountMemberPage = () => {
    const [accountData, setAccountData] = useState<AccountData>({
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1990-05-15',
        address: '123 Wellness Avenue',
        city: 'Mindville',
        state: 'MA',
        zipCode: '01234',
        emergencyContact: 'John Johnson',
        emergencyPhone: '+1 (555) 987-6543',
        profileImage: null
    });

    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        wellnessUpdates: true
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAccountData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNotificationChange = (key: keyof NotificationSettings) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAccountData(prev => ({
                    ...prev,
                    profileImage: event.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setAccountData(prev => ({
            ...prev,
            profileImage: null
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
        }, 2000);
    };

    const memberStats = {
        sessionsCompleted: 24,
        memberSince: 'March 2023',
        nextAppointment: 'Dec 28, 2024',
        wellnessScore: 85
    };

    return (
        <div className="min-h-screen py-8">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white fill-current" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Account</h1>
                                <p className="text-gray-600">Manage your profile and preferences</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            {isEditing && (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </>
                            )}

                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 w-full sm:w-auto justify-center"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden sticky top-24">
                            {/* Profile Header */}
                            <div className="p-6 sm:p-8 bg-gradient-to-r from-red-500 to-pink-500 text-white text-center">
                                <div className="relative inline-block mb-4">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white/30 bg-white/20 mx-auto">
                                        {accountData.profileImage ? (
                                            <img
                                                src={accountData.profileImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="w-8 h-8 sm:w-12 sm:h-12 text-white/70" />
                                            </div>
                                        )}
                                    </div>

                                    {isEditing && (
                                        <div className="absolute -bottom-2 -right-2 flex gap-1">
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-8 h-8 bg-white text-pink-500 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                                                title="Upload Photo"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </button>
                                            {accountData.profileImage && (
                                                <button
                                                    onClick={handleRemoveImage}
                                                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                                                    title="Remove Photo"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                                <h3 className="text-xl font-bold">{accountData.firstName} {accountData.lastName}</h3>
                                <p className="text-pink-100">Premium Member</p>
                            </div>

                            {/* Stats */}
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-3 bg-pink-50 rounded-2xl">
                                        <div className="text-xl sm:text-2xl font-bold text-pink-600">{memberStats.sessionsCompleted}</div>
                                        <div className="text-xs text-gray-600">Sessions</div>
                                    </div>
                                    <div className="text-center p-3 bg-red-50 rounded-2xl">
                                        <div className="text-xl sm:text-2xl font-bold text-red-600">{memberStats.wellnessScore}%</div>
                                        <div className="text-xs text-gray-600">Wellness</div>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Calendar className="w-4 h-4 text-pink-500 shrink-0" />
                                        <span className="truncate">Member since {memberStats.memberSince}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                                        <span className="truncate">Next: {memberStats.nextAppointment}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="p-6 pt-0">
                                <nav className="space-y-2">
                                    {[
                                        { id: 'profile', label: 'Profile Info', icon: User },
                                        { id: 'notifications', label: 'Notifications', icon: Bell },
                                        { id: 'security', label: 'Security', icon: Shield },
                                        { id: 'preferences', label: 'Preferences', icon: Settings }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${activeTab === tab.id
                                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            <tab.icon className="w-5 h-5 shrink-0" />
                                            <span className="truncate">{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 sm:p-8">

                            {activeTab === 'profile' && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <User className="w-6 h-6 text-pink-500" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Information</h2>
                                    </div>

                                    {/* Personal Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={accountData.firstName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={accountData.lastName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={accountData.email}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={accountData.phone}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">Date of Birth</label>
                                            <div className="relative max-w-md">
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={accountData.dateOfBirth}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Information */}
                                    <div className="pt-6 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-pink-500" />
                                            Address Information
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Street Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={accountData.address}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={accountData.city}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={accountData.state}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">ZIP Code</label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    value={accountData.zipCode}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Emergency Contact */}
                                    <div className="pt-6 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-pink-500" />
                                            Emergency Contact
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Emergency Contact Name</label>
                                                <input
                                                    type="text"
                                                    name="emergencyContact"
                                                    value={accountData.emergencyContact}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Emergency Phone</label>
                                                <input
                                                    type="tel"
                                                    name="emergencyPhone"
                                                    value={accountData.emergencyPhone}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Bell className="w-6 h-6 text-pink-500" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Notification Settings</h2>
                                    </div>

                                    <div className="space-y-4">
                                        {Object.entries({
                                            emailNotifications: 'Email Notifications',
                                            smsNotifications: 'SMS Notifications',
                                            appointmentReminders: 'Appointment Reminders',
                                            wellnessUpdates: 'Wellness Updates'
                                        }).map(([key, label]) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 truncate">{label}</h4>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {key === 'emailNotifications' && 'Receive important updates via email'}
                                                        {key === 'smsNotifications' && 'Get SMS alerts for urgent matters'}
                                                        {key === 'appointmentReminders' && 'Reminders for upcoming sessions'}
                                                        {key === 'wellnessUpdates' && 'Weekly wellness tips and insights'}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleNotificationChange(key as keyof NotificationSettings)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ml-4 ${notifications[key as keyof NotificationSettings]
                                                            ? 'bg-gradient-to-r from-red-500 to-pink-500'
                                                            : 'bg-gray-300'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications[key as keyof NotificationSettings] ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Shield className="w-6 h-6 text-pink-500" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Security Settings</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                                                <h4 className="font-semibold text-green-800">Account Secured</h4>
                                            </div>
                                            <p className="text-sm text-green-700">Your account is protected with two-factor authentication.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-semibold text-gray-900">Change Password</h4>
                                            <div className="grid grid-cols-1 gap-4 max-w-md">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Current Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300"
                                                            placeholder="Enter current password"
                                                        />
                                                        <button
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-800 mb-2">New Password</label>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300"
                                                        placeholder="Enter new password"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm New Password</label>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300"
                                                        placeholder="Confirm new password"
                                                    />
                                                </div>

                                                <button className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold">
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Settings className="w-6 h-6 text-pink-500" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Preferences</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-4">Session Preferences</h4>
                                            <div className="space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-2xl gap-3">
                                                    <span className="text-gray-900 font-medium">Preferred Session Length</span>
                                                    <select className="px-3 py-2 bg-white border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 min-w-0 sm:min-w-[150px]">
                                                        <option>30 minutes</option>
                                                        <option>45 minutes</option>
                                                        <option>60 minutes</option>
                                                    </select>
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-2xl gap-3">
                                                    <span className="text-gray-900 font-medium">Preferred Time</span>
                                                    <select className="px-3 py-2 bg-white border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 min-w-0 sm:min-w-[200px]">
                                                        <option>Morning (9AM - 12PM)</option>
                                                        <option>Afternoon (1PM - 5PM)</option>
                                                        <option>Evening (6PM - 9PM)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-4">Privacy Settings</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                                    <div className="flex-1 min-w-0 pr