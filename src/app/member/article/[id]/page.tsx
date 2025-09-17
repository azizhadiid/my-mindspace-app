// app/member/article/[id]/page.tsx
import React from 'react';
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import ArticleMemberDetail from '@/components/templates/member/articles/components/ArtcleMemberDetail';

interface ArticleDetailPageProps {
    params: {
        id: string;
    };
}

const ArticleDetailPage = ({ params }: ArticleDetailPageProps) => {
    // Parameter 'id' dari URL akan otomatis diambil oleh Next.js 13+
    const articleId = params.id;

    return (
        <MainTemplateMember>
            <ArticleMemberDetail articleId={articleId} />
        </MainTemplateMember>
    );
};

export default ArticleDetailPage;