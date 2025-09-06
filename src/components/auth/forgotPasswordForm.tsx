'use client'

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import BrainCharacter from '../animation/brainCharacter';
import InputField from '../form/input';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // 1. Validasi email sederhana di sisi klien
        if (!email.trim()) {
            toast.error("Email is required.");
            setIsLoading(false);
            return;
        }

        try {
            // 2. Kirim email ke API forgot-password
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            // 3. Tampilkan pesan berhasil dari server
            if (res.ok) {
                toast.success(data.message);
                setEmail(""); // Kosongkan input setelah berhasil
            } else {
                toast.error(data.message || 'Failed to process the request.');
            }
        } catch (error) {
            console.error('Error while sending form:', error);
            toast.error('An error occurred on the server.');
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
                        Welcome back to <span className="text-pink-500">MindSpace</span>
                    </h1>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot your password?{' '}</h2>
                        <p className="text-gray-600">Please enter your Email</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={Mail}
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
                                    <span>Send Email</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <a
                                href="/auth/register"
                                className="text-pink-500 hover:text-pink-600 font-semibold hover:underline transition-colors"
                            >
                                Sign up here
                            </a>
                        </p>
                        <p className="text-gray-600">
                            Have an account?{' '}
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

export default ForgotPasswordForm;