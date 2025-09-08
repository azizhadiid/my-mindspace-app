// components/forms/EditProfileForm.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EditProfileFormProps {
    onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onClose }) => {

    const handleSubmit = (e: React.FormEvent) => {

    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl relative max-w-md w-full mx-auto border border-pink-100 animate-slideUp">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Edit Profile Information
            </h2>

            <div className="max-h-[70vh] overflow-y-auto pr-2">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Enter Your Full Name"
                            required
                        />
                    </div>

                    {/* <!-- Phone Number --> */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    {/* <!-- Date of Birth --> */}
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dob"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* <!-- Gender --> */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                        </label>
                        <select
                            id="gender"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            required
                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer_not_say">Prefer not to say</option>
                        </select>
                    </div>

                    {/* <!-- Consultation Preference --> */}
                    <div>
                        <label htmlFor="preference" className="block text-sm font-medium text-gray-700 mb-1">
                            Consultation Preference
                        </label>
                        <select
                            id="preference"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                        >
                            <option value="">Select your preference</option>
                            <option value="online">Online</option>
                            <option value="in_person">In-person</option>
                            <option value="no_preference">No preference</option>
                        </select>
                    </div>

                    {/* <!-- Consultation Purpose --> */}
                    <div>
                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                            Consultation Purpose
                        </label>
                        <input
                            type="text"
                            id="purpose"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Briefly describe your purpose for consultation"
                        />
                    </div>

                    {/* <!-- History --> */}
                    <div>
                        <label htmlFor="history" className="block text-sm font-medium text-gray-700 mb-1">
                            Mental Health History
                        </label>
                        <textarea
                            id="history"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all h-32"
                            placeholder="Share any relevant mental health history"
                        ></textarea>
                    </div>

                    {/* <!-- Related Medical Conditions --> */}
                    <div>
                        <label htmlFor="medical" className="block text-sm font-medium text-gray-700 mb-1">
                            Related Medical Conditions
                        </label>
                        <input
                            type="text"
                            id="medical"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="List any related medical conditions"
                        />
                    </div>

                    {/* <!-- Urgency Level --> */}
                    <div>
                        <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                            Urgency Level
                        </label>
                        <select
                            id="urgency"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                        >
                            <option value="">Select urgency level</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;