'use client'

import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import BrainCharacter from '../animation/brainCharacter';
import InputField from '../form/input';

// Define interfaces for form data and errors
interface IFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface IFormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface IRegistrationFormProps {
    onRegistrationSuccess: () => void;
}

const RegistrationForm = ({ onRegistrationSuccess }: IRegistrationFormProps) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<IFormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    // FIX: Menggunakan 'keyof IFormData' untuk memastikan nama properti valid.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name as keyof IFormData]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof IFormErrors]) {
            setErrors(prev => ({ ...prev, [name as keyof IFormErrors]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: IFormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // FIX: Mengubah key 'name' menjadi 'name' agar sesuai dengan API
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name, // Menggunakan 'name' agar sesuai skema Prisma
                    email: formData.email,
                    password: formData.password,
                    role: "MEMBER"
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Registrasi gagal");
            } else {
                toast.success("Registrasi berhasil, Silahkan masuk");
                // Clear form state and show success message
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                onRegistrationSuccess();
            }
        } catch (err) {
            toast.error("Terjadi kesalahan server");
            console.error("Fetch error:", err); // Tambahkan log untuk debugging lebih lanjut
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
            <div className="max-w-md w-full">
                {/* Mobile Brain Character */}
                <div className="lg:hidden text-center mb-8">
                    <div className="w-24 h-24 mx-auto mb-4">
                        <BrainCharacter />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Join <span className="text-pink-500">MindSpace</span>
                    </h1>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                        <p className="text-gray-600">Start your mental wellness journey today</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <InputField
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Choose a Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            icon={User}
                            error={errors.name}
                        />

                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            icon={Mail}
                            error={errors.email}
                        />

                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleInputChange}
                            icon={Lock}
                            error={errors.password}
                            showPassword={showPassword}
                            togglePassword={() => setShowPassword(!showPassword)}
                        />

                        <InputField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            icon={Lock}
                            error={errors.confirmPassword}
                            showPassword={showConfirmPassword}
                            togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/auth/login"
                                className="text-pink-500 hover:text-pink-600 font-semibold hover:underline transition-colors"
                            >
                                Sign in here
                            </a>
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            By creating an account, you agree to our{' '}
                            <a href="/terms" className="text-pink-500 hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="/privacy" className="text-pink-500 hover:underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
