'use client'

import React from 'react';
import MainTemplateMember from "@/components/templates/member/MainTemplateMember";
import Image from 'next/image';

// Dummy data for articles to simulate a real-world scenario
const articles = [
    {
        id: '1',
        title: 'Understanding Anxiety: A Guide to Managing Your Worries',
        summary: 'Anxiety is a common mental health condition. Learn how to identify its symptoms and discover effective coping strategies to regain control of your life.',
        category: 'Mental Health',
        imageUrl: 'https://images.unsplash.com/photo-1549419130-10493874313f?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '2',
        title: 'Mindfulness for Beginners: Simple Steps to a Calmer Mind',
        summary: 'Discover the power of mindfulness. This article provides easy-to-follow exercises to help you stay present and reduce stress in your daily routine.',
        category: 'Mindfulness',
        imageUrl: 'https://images.unsplash.com/photo-1554524859-679951662916?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '3',
        title: 'The Importance of Self-Care in a Busy World',
        summary: 'In a fast-paced life, self-care is not a luxury but a necessity. Explore practical ways to prioritize your well-being and recharge your mental batteries.',
        category: 'Self-Care',
        imageUrl: 'https://images.unsplash.com/photo-1533038590840-a0fb97db6746?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '4',
        title: 'Building Resilience: Bouncing Back from Adversity',
        summary: 'Resilience is the ability to adapt to difficult situations. Learn key techniques to strengthen your mental fortitude and navigate life’s challenges with grace.',
        category: 'Personal Growth',
        imageUrl: 'https://images.unsplash.com/photo-1522814890254-ad66a8775267?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '5',
        title: 'Understanding and Overcoming Burnout',
        summary: 'Burnout is a state of emotional, physical, and mental exhaustion caused by prolonged stress. This guide helps you recognize the signs and provides a path to recovery.',
        category: 'Work-Life Balance',
        imageUrl: 'https://images.unsplash.com/photo-1589254065876-2415132207de?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '6',
        title: 'How to Improve Your Sleep for Better Mental Health',
        summary: 'A good night\'s sleep is crucial for your well-being. Discover tips and tricks to improve your sleep hygiene and boost your mental clarity.',
        category: 'Physical Health',
        imageUrl: 'https://images.unsplash.com/photo-1487856414777-5b65f013fe3a?q=80&w=2070&auto=format&fit=crop',
    },
];

const categories = [
    'All',
    'Mental Health',
    'Mindfulness',
    'Self-Care',
    'Personal Growth',
    'Work-Life Balance',
    'Physical Health',
];

const ArticlePage = () => {
    return (
        <MainTemplateMember>
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent inline-block">
                        MindSpace Article
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our collection of articles on mental health, well-being, and personal growth. Find tips, guides, and inspiration for a healthier mind.
                    </p>

                    {/* Search and Category Filter Section */}
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                        <div className="relative w-full md:w-2/3 max-w-lg">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-4 py-2 rounded-full text-sm font-medium border border-rose-200 text-gray-700 bg-rose-50 hover:bg-rose-100 transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Article Grid Section */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-rose-100"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-t-xl"
                                />
                                <span className="absolute top-3 left-3 bg-white/70 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {article.summary}
                                </p>
                                <a
                                    href={`/member/article/${article.id}`}
                                    className="inline-block text-pink-600 font-semibold hover:underline transition-colors"
                                >
                                    Read more →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainTemplateMember>
    );
};

export default ArticlePage;