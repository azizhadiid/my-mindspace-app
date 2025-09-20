// components/forms/EditProfileForm.tsx
import React, { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditProfileFormProps {
    onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        photoProfile: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        consultationPreference: '',
        consultationPurpose: '',
        mentalHealthHistory: '',
        relatedMedicalConditions: '',
        urgencyLevel: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Efek untuk mengambil data profil saat komponen dimuat
    useEffect(() => {
        const fetchProfile = async () => {
            setIsFetching(true);
            try {
                const response = await fetch('/api/member/profile');
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data.');
                }
                const data = await response.json();
                const profile = data.memberProfile || {};

                setFormData({
                    name: data.name || '',
                    photoProfile: profile.photoProfile || '',
                    phoneNumber: profile.phoneNumber || '',
                    dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
                    gender: profile.gender || '',
                    consultationPreference: profile.consultationPreference || '',
                    consultationPurpose: profile.consultationPurpose || '',
                    mentalHealthHistory: profile.mentalHealthHistory || '',
                    relatedMedicalConditions: profile.relatedMedicalConditions || '',
                    urgencyLevel: profile.urgencyLevel || '',
                });

                if (profile.photoProfile) {
                    setPhotoPreview(profile.photoProfile);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProfile();
    }, []);

    // Handler untuk input file
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const newPreviewUrl = URL.createObjectURL(file);
            if (photoPreview && !photoPreview.startsWith('/img')) {
                URL.revokeObjectURL(photoPreview);
            }
            setPhotoPreview(newPreviewUrl);
        }
    };

    // Handler untuk input teks lainnya
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // Handler untuk submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const data = new FormData();

        // Tambahkan semua data teks ke FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'photoProfile' && value) {
                data.append(key, value);
            }
        });

        // Tambahkan file jika ada yang dipilih
        if (selectedFile) {
            data.append('photoProfile', selectedFile);
        }

        try {
            const response = await fetch('/api/member/profile', {
                method: 'PUT',
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile.');
            }

            // Jika berhasil
            toast.success("Profile updated successfully!"); // Anda bisa mengganti ini dengan notifikasi yang lebih baik
            onClose();
            window.location.reload(); // Refresh halaman untuk melihat perubahan

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Membersihkan URL object
    useEffect(() => {
        return () => {
            if (photoPreview && !photoPreview.startsWith('/img')) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    if (isFetching) {
        return <div className="text-center p-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-pink-500" /></div>;
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl relative max-w-md w-full mx-auto border border-pink-100 animate-slideUp">
            <button
                onClick={onClose}
                disabled={isLoading}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Edit Profile Information
            </h2>

            <div className="max-h-[70vh] overflow-y-auto pr-2">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && <div className="text-red-500 text-sm p-3 bg-red-100 rounded-lg">{error}</div>}

                    {/* Photo Profile */}
                    <div>
                        <label htmlFor="photoProfile" className="block text-sm font-medium text-gray-700 mb-1">
                            Photo Profile
                        </label>

                        {/* 4. Tampilkan preview foto jika ada */}
                        {photoPreview && (
                            <div className="mt-4 mb-4 flex justify-center">
                                <img
                                    src={photoPreview}
                                    alt="Photo Preview"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md"
                                />
                            </div>
                        )}


                        <input
                            type="file"
                            id="photoProfile"
                            accept="image/*" // Filter agar hanya file gambar yang bisa dipilih
                            onChange={handlePhotoChange} // 5. Tambahkan event handler onChange
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                        />
                    </div>

                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Enter Your Full Name"

                        />
                    </div>

                    {/* <!-- Phone Number --> */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Enter your phone number"

                        />
                    </div>

                    {/* <!-- Date of Birth --> */}
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"

                        />
                    </div>

                    {/* <!-- Gender --> */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                        </label>
                        <select
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"

                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer_not_say">Prefer not to say</option>
                        </select>
                    </div>

                    {/* <!-- Consultation Preference --> */}
                    <div>
                        <label htmlFor="consultationPreference" className="block text-sm font-medium text-gray-700 mb-1">
                            Consultation Preference
                        </label>
                        <select
                            id="consultationPreference"
                            value={formData.consultationPreference}
                            onChange={handleChange}
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
                        <label htmlFor="consultationPurpose" className="block text-sm font-medium text-gray-700 mb-1">
                            Consultation Purpose
                        </label>
                        <input
                            type="text"
                            id="consultationPurpose"
                            value={formData.consultationPurpose}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Briefly describe your purpose for consultation"
                        />
                    </div>

                    {/* <!-- History --> */}
                    <div>
                        <label htmlFor="mentalHealthHistory" className="block text-sm font-medium text-gray-700 mb-1">
                            Mental Health History
                        </label>
                        <textarea
                            id="mentalHealthHistory"
                            value={formData.mentalHealthHistory}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all h-32"
                            placeholder="Share any relevant mental health history"
                        ></textarea>
                    </div>

                    {/* <!-- Related Medical Conditions --> */}
                    <div>
                        <label htmlFor="relatedMedicalConditions" className="block text-sm font-medium text-gray-700 mb-1">
                            Related Medical Conditions
                        </label>
                        <input
                            type="text"
                            id="relatedMedicalConditions"
                            value={formData.relatedMedicalConditions}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="List any related medical conditions"
                        />
                    </div>

                    {/* <!-- Urgency Level --> */}
                    <div>
                        <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700 mb-1">
                            Urgency Level
                        </label>
                        <select
                            id="urgencyLevel"
                            value={formData.urgencyLevel}
                            onChange={handleChange}
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
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                    >
                        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;