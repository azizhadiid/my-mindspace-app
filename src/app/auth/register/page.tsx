'use client'

import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import WelcomePanel from '@/components/ui/welcomePanel';
import RegistrationForm from '@/components/register/registerForm';

// Define interfaces for form data and errors
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

const App = () => {
    const [formData, setFormData] = useState<IFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<IFormErrors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const handleInputChange = (field: keyof IFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: IFormErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
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

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setErrors({});
            setShowPassword(false);
            setShowConfirmPassword(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 relative overflow-hidden font-sans">
            {/* Floating Background Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-40 animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-35 animate-pulse"></div>
            <div className="absolute top-1/2 right-10 w-8 h-8 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>

            <div className="flex min-h-screen">
                <WelcomePanel />
                <RegistrationForm
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                    showConfirmPassword={showConfirmPassword}
                    toggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default App;
