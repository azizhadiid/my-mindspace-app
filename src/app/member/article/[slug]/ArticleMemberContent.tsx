// components/templates/member/articles/ArticleMemberContent.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Definisi props untuk komponen
interface ArticleMemberContentProps {
    title: string;
    content: string;
    category: string;
    publishDate: string;
    image: string;
}

const ArticleMemberContent: React.FC<ArticleMemberContentProps> = ({
    title,
    content,
    category,
    publishDate,
    image,
}) => {
    // Animasi menggunakan Framer Motion
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <article className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                {/* Bagian Hero Image dengan gradien overlay */}
                <div className="relative w-full h-64 sm:h-80 md:h-96">
                    <Image
                        src={image}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-8">
                        <motion.div variants={itemVariants}>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                                {title}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* Konten Artikel */}
                <div className="p-6 md:p-8 space-y-8 text-gray-800">
                    <motion.div variants={itemVariants}>
                        <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm font-medium">
                            <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full">{category}</span>
                            <span className="text-gray-500">
                                Diterbitkan pada {new Date(publishDate).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
                        {/* Konten utama di sini. Menggunakan 'prose' untuk styling markdown/HTML */}
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </motion.div>
                </div>
            </article>
        </motion.div>
    );
};

export default ArticleMemberContent;