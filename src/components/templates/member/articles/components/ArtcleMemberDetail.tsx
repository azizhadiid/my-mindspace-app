// components/templates/member/articles/ArticleMemberDetail.tsx

'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ArticleMemberDetailProps {
    articleId: string;
}

const ArticleMemberDetail: React.FC<ArticleMemberDetailProps> = ({ articleId }) => {
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/member/article/${articleId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch article");
                }
                const data = await res.json();
                setArticle(data.article);
            } catch (error) {
                console.error("Error fetching article:", error);
                setArticle(null); // Atur artikel menjadi null saat terjadi error
            } finally {
                setLoading(false);
            }
        };

        if (articleId) {
            fetchArticle();
        }
    }, [articleId]);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-gray-500 text-lg">
                Loading...
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-gray-500 text-lg">
                <p>Article not found.</p>
                <a href="/member/article" className="mt-4 text-pink-600 hover:underline">
                    Back to Articles
                </a>
            </div>
        );
    }

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <article className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300">
                <div className="relative w-full h-64 sm:h-80 md:h-96">
                    <Image
                        src={`${article.image}`}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                            {article.title}
                        </h1>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-8 text-gray-800">
                    <div>
                        <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm font-medium">
                            <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full">{article.category}</span>
                            <span className="text-gray-500">
                                Diterbitkan pada {new Date(article.publishDate).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </article>
        </motion.div>
    );
};

export default ArticleMemberDetail;