'use client'

// components/mindbot/DisclaimerSection.tsx
import React from 'react';

const DisclaimerSection: React.FC = () => {
    return (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 text-center">
                <strong>Important:</strong> MindBot provides supportive conversations but is not a replacement for professional mental health care.
                If you're experiencing a mental health crisis, please contact emergency services or a qualified mental health professional.
            </p>
        </div>
    );
};

export default DisclaimerSection;