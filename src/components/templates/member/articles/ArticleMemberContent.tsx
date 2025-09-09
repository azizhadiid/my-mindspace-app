'use client'

import CardArticle from "./components/CardArticle";
import HeaderArticle from "./components/HeaderArticle";


const articles = [
    {
        id: '1',
        title: 'Understanding Anxiety: A Guide to Managing Your Worries',
        summary: 'Anxiety is a common mental health condition. Learn how to identify its symptoms and discover effective coping strategies to regain control of your life.',
        category: 'Mental Health',
        imageUrl: '/uploads/article/ai2.jpg',
    },
    {
        id: '2',
        title: 'Mindfulness for Beginners: Simple Steps to a Calmer Mind',
        summary: 'Discover the power of mindfulness. This article provides easy-to-follow exercises to help you stay present and reduce stress in your daily routine.',
        category: 'Mindfulness',
        imageUrl: '/uploads/article/analisis.jpg',
    },
    {
        id: '3',
        title: 'The Importance of Self-Care in a Busy World',
        summary: 'In a fast-paced life, self-care is not a luxury but a necessity. Explore practical ways to prioritize your well-being and recharge your mental batteries.',
        category: 'Self-Care',
        imageUrl: '/uploads/article/digital 2.jpg',
    },
    {
        id: '4',
        title: 'Building Resilience: Bouncing Back from Adversity',
        summary: 'Resilience is the ability to adapt to difficult situations. Learn key techniques to strengthen your mental fortitude and navigate life’s challenges with grace.',
        category: 'Personal Growth',
        imageUrl: '/uploads/article/iot.jpg',
    },
    {
        id: '5',
        title: 'Understanding and Overcoming Burnout',
        summary: 'Burnout is a state of emotional, physical, and mental exhaustion caused by prolonged stress. This guide helps you recognize the signs and provides a path to recovery.',
        category: 'Work-Life Balance',
        imageUrl: '/uploads/article/pexels-fauxels-3184416.jpg',
    },
    {
        id: '6',
        title: 'How to Improve Your Sleep for Better Mental Health',
        summary: 'A good night\'s sleep is crucial for your well-being. Discover tips and tricks to improve your sleep hygiene and boost your mental clarity.',
        category: 'Physical Health',
        imageUrl: '/uploads/article/pexels-rpnickson-3082341.jpg',
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

export default function ArticleMemberContent() {
    return (
        <div className="container mx-auto px-4 py-12">
            <HeaderArticle categories={categories} />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <CardArticle key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};