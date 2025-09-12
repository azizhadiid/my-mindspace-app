// app/member/article/page.tsx

'use client'

import React from 'react';
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import ArticleMemberContent from './ArticleMemberContent';

const dummyArticle = {
    title: "Mengatasi Kecemasan Sosial: Panduan Praktis",
    content: `
        <p>Kecemasan sosial, atau fobia sosial, adalah ketakutan berlebihan terhadap situasi sosial. Hal ini bisa memengaruhi kehidupan sehari-hari, dari interaksi sederhana hingga presentasi penting.</p>
        <p>Ada beberapa cara yang bisa Anda lakukan untuk mengelola kecemasan ini:</p>
        <ol>
            <li>Latihan pernapasan dalam.</li>
            <li>Identifikasi pemicu kecemasan.</li>
            <li>Mulai dari interaksi sosial kecil.</li>
            <li>Cari dukungan dari teman atau profesional.</li>
        </ol>
        <p>Ingatlah bahwa setiap langkah kecil adalah kemajuan. Jangan ragu untuk mencari bantuan jika diperlukan.</p>
    `,
    category: "Psikologi",
    publishDate: "2025-09-12T08:31:52Z",
    image: "https://images.unsplash.com/photo-1549419163-12001332a694",
};

const ArticleDetailPage = () => {
    return (
        <MainTemplateMember>
            <ArticleMemberContent
                title={dummyArticle.title}
                content={dummyArticle.content}
                category={dummyArticle.category}
                publishDate={dummyArticle.publishDate}
                image={dummyArticle.image}
            />
        </MainTemplateMember>
    );
};

export default ArticleDetailPage;