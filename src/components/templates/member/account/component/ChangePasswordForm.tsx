// components/forms/ChangePasswordForm.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ChangePasswordFormProps {
    onClose: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onClose }) => {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validasi frontend sederhana
        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/member/change-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmNewPassword,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                // Tampilkan pesan error dari backend
                toast.error(result.message || 'Something went wrong.');
            } else {
                // Tampilkan pesan sukses dari backend
                toast.success(result.message || 'Password updated successfully!');
                onClose(); // Tutup modal
                router.refresh(); // Refresh halaman untuk memastikan data terbaru
            }

        } catch (error) {
            console.error('Failed to change password:', error);
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
                Change Password
            </h2>

            <div className="max-h-[70vh] overflow-y-auto pr-2">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Enter the current password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold"
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div >
    );
};

export default ChangePasswordForm;