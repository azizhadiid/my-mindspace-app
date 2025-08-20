'use client'

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from "react-hot-toast";
import BrainCharacter from '../animation/brainCharacter';
import InputField from '../form/input';

const ResetPasswordForm = () => {
    const params = useSearchParams();
    const token = params.get("token"); // token dari link email
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("Token tidak valid!");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password tidak sama!");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Gagal reset password");
            } else {
                toast.success("Password berhasil direset, silakan login");
                router.push("/auth/login");
            }
        } catch (err) {
            console.error("Reset password error:", err);
            toast.error("Terjadi kesalahan server");
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Your Password</h2>
                        <p className="text-gray-600">Enter your new password </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={Lock}
                            showPassword={showPassword}
                            togglePassword={() => setShowPassword(!showPassword)}
                        />

                        <InputField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            icon={Lock}
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
                                    <span>Reset Password</span>
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

export default ResetPasswordForm;
