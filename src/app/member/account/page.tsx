'use client'

import { useAuth } from "@/hooks/useAuth";
import React from 'react';
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import AccountContent from "@/components/templates/member/account/AccountContent";

const AccountMemberPage = () => {
    const { user, loading } = useAuth("MEMBER");

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-rose-50">
                <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-pink-500 animate-spin"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <MainTemplateMember>
            <AccountContent />
        </MainTemplateMember>
    );
};

export default AccountMemberPage;