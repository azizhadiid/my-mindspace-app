'use client'

import { useAuth } from "@/hooks/useAuth";
import React from 'react'; // Penting untuk JSX

// Component
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import AccountMemberContent from "@/components/templates/member/account/AccountContent";

const AccountMemberPage = () => {
    const { user, loading } = useAuth("MEMBER");

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                {/* Spinner */}
                <div
                    className="
                        w-12 h-12 rounded-full
                        border-4 border-t-4 border-gray-200 border-t-pink-500
                        animate-spin
                    "
                ></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <MainTemplateMember>
            <AccountMemberContent />
        </MainTemplateMember>
    );
};

export default AccountMemberPage;