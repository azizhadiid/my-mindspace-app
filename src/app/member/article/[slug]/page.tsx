'use client'

import React from 'react';
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import ArticleMemberDetail from '@/components/templates/member/articles/components/ArtcleMemberDetail';

interface ArticleDetailPageProps {
    params: {
        slug: string;
    };
}

const ArticleDetailPage = ({ params }: ArticleDetailPageProps) => {
    // Parameter slug dari URL akan secara otomatis menjadi articleId
    const articleId = React.use(Promise.resolve(params)).slug;

    return (
        <MainTemplateMember>
            <ArticleMemberDetail articleId={articleId} />
        </MainTemplateMember>
    );
};

export default ArticleDetailPage;