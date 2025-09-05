'use client'

import React from 'react';
import WelcomePanel from '@/components/ui/welcomePanel';
import RegistrationForm from '@/components/auth/registerForm';

const RegisterPage = () => {
    // State for showing the success modal, managed at the page level

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 relative overflow-hidden font-sans">
            {/* Floating Background Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-40 animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-35 animate-pulse"></div>
            <div className="absolute top-1/2 right-10 w-8 h-8 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>

            <div className="flex min-h-screen">
                <WelcomePanel />
                <RegistrationForm />
            </div>
        </div>
    );
};

export default RegisterPage;

