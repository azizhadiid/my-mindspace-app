'use client'

import React from 'react';
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import ArticleMemberContent from '@/components/templates/member/articles/ArticleMemberContent';

const ArticlePage = () => {
    return (
        <MainTemplateMember>
            <ArticleMemberContent />
        </MainTemplateMember>
    );
};

export default ArticlePage;