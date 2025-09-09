'use client'

import CardArticle from "./components/CardArticle";
import HeaderArticle from "./components/HeaderArticle";


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