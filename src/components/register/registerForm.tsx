'use client'

import React from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import BrainCharacter from '../animation/brainCharacter';
import InputField from '../form/input';

// Define interfaces for form props
interface IFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface IFormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface IRegistrationFormProps {
    formData: IFormData;
    errors: IFormErrors;
    handleInputChange: (field: keyof IFormData, value: string) => void;
    showPassword?: boolean;
    togglePassword: () => void;
    showConfirmPassword?: boolean;
    toggleConfirmPassword: () => void;
    handleSubmit: () => void;
    isLoading: boolean;
}

const RegistrationForm = ({
    formData,
    errors,
    handleInputChange,
    showPassword,
    togglePassword,
    showConfirmPassword,
    toggleConfirmPassword,
    handleSubmit,
    isLoading
}: IRegistrationFormProps) => (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="max-w-md w-full">
            {/* Mobile Brain Character */}
            <div className="lg:hidden text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4">
                    <BrainCharacter />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Join <span className="text-pink-500">MainSpace</span>
                </h1>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p className="text-gray-600">Start your mental wellness journey today</p>
                </div>

                <div className="space-y-6">
                    <InputField
                        label="Username"
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        icon={User}
                        error={errors.username}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        icon={Mail}
                        error={errors.email}
                    />

                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        icon={Lock}
                        error={errors.password}
                        showPassword={showPassword}
                        togglePassword={togglePassword}
                    />

                    <InputField
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        icon={Lock}
                        error={errors.confirmPassword}
                        showPassword={showConfirmPassword}
                        togglePassword={toggleConfirmPassword}
                    />

                    <button
                        type="button"
                        onClick={handleSubmit}
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
                </div>

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

export default RegistrationForm;
