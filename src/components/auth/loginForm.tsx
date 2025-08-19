'use client'

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import BrainCharacter from '../animation/brainCharacter';
import InputField from '../form/input';


// Define interfaces for form data
interface IFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<IFormData>({ email: "", password: "", rememberMe: false });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Login failed");
            } else {
                toast.success("Login successful!");

                // Cek role dan redirect
                if (data.role === "ADMIN") {
                    router.push("/admin/dashboard");
                } else if (data.role === "MEMBER") {
                    router.push("/member/home");
                } else if (data.role === "PSIKOLOG") {
                    router.push("/psikolog/home");
                } else {
                    router.push("/"); // fallback
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong");
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Login to your Account</h2>
                        <p className="text-gray-600">Please enter your credentials</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            icon={Mail}
                        />

                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            icon={Lock}
                            showPassword={showPassword}
                            togglePassword={() => setShowPassword(!showPassword)}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="/auth/forgotPassword" className="font-medium text-pink-500 hover:text-pink-600">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Log In</span>
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

export default LoginForm;
