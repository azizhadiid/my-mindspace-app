'use client'

import React from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

// Define interface for InputField props
interface IInputFieldProps {
    label: string;
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: LucideIcon;
    error?: string;
    showPassword?: boolean;
    togglePassword?: () => void;
}

const InputField = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon: Icon,
    error,
    showPassword,
    togglePassword
}: IInputFieldProps) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-red-700" />
            </div>
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm ${error ? 'border-red-300' : 'border-gray-200'
                    } hover:border-pink-300`}
            />
            {type === 'password' && (
                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                </button>
            )}
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
);

export default InputField;
