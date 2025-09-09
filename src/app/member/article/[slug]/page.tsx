import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // Import Image for optimized images
import Link from 'next/link'; // For "Back to Articles" button

// --- Sample Data (replace with your actual data fetching) ---
const articles = [
    {
        id: '1',
        title: 'Understanding Anxiety: A Guide to Managing Your Worries',
        summary: 'Anxiety is a common mental health condition. Learn how to identify its symptoms and discover effective coping strategies to regain control of your life.',
        category: 'Mental Health',
        imageUrl: '/uploads/article/ai2.jpg',
        content: `
            <p>Anxiety is a feeling of unease, such as worry or fear, that can be mild or severe. Everyone has feelings of anxiety at some point in their life, but for some, it can be a constant presence. This article explores the different types of anxiety disorders and provides actionable steps for managing your worries.</p>
            <p><strong>What is Anxiety?</strong></p>
            <p>Generalized Anxiety Disorder (GAD) is characterized by persistent and excessive worry about various things, even when there's no clear reason for concern. Other forms include Panic Disorder, Social Anxiety Disorder, and specific phobias.</p>
            <figure>
                <img src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2070&auto=format&fit=crop" alt="A person meditating to calm anxiety" class="rounded-lg shadow-md my-6"/>
                <figcaption class="text-center text-sm text-gray-500 mt-2">Meditation can be a powerful tool for managing anxiety.</figcaption>
            </figure>
            <p><strong>Symptoms of Anxiety:</strong></p>
            <ul>
                <li>Feeling restless, wound-up, or on-edge</li>
                <li>Being easily fatigued</li>
                <li>Difficulty concentrating; mind going blank</li>
                <li>Irritability</li>
                <li>Muscle tension</li>
                <li>Difficulty controlling worry</li>
                <li>Sleep problems (difficulty falling or staying asleep, or restless, unsatisfying sleep)</li>
            </ul>
            <p><strong>Coping Strategies:</strong></p>
            <ol>
                <li><strong>Mindfulness & Deep Breathing:</strong> Practice focusing on the present moment. Simple breathing exercises can calm your nervous system.</li>
                <li><strong>Regular Exercise:</strong> Physical activity is a great stress reliever and can improve mood.</li>
                <li><strong>Healthy Diet:</strong> Balanced nutrition supports overall brain health.</li>
                <li><strong>Limit Caffeine & Alcohol:</strong> These can exacerbate anxiety symptoms.</li>
                <li><strong>Journaling:</strong> Writing down your thoughts and worries can help you process them.</li>
                <li><strong>Connect with Others:</strong> Share your feelings with trusted friends or family.</li>
                <li><strong>Professional Help:</strong> Don't hesitate to seek therapy or counseling. Cognitive Behavioral Therapy (CBT) is often very effective.</li>
            </ol>
            <p>Remember, you're not alone in experiencing anxiety, and effective strategies are available to help you manage it. Taking the first step towards understanding and addressing your anxiety is a significant act of self-care.</p>
        `,
        author: 'Dr. Sarah Chen',
        publishDate: 'October 26, 2024',
        readTime: '7 min read'
    },
    {
        id: '2',
        title: 'Mindfulness for Beginners: Simple Steps to a Calmer Mind',
        summary: 'Discover the power of mindfulness. This article provides easy-to-follow exercises to help you stay present and reduce stress in your daily routine.',
        category: 'Mindfulness',
        imageUrl: '/uploads/article/pexels-fauxels-3184416.jpg',
        content: `
            <p>Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. This article outlines simple exercises, such as the 5-4-3-2-1 grounding technique, to help you get started. Incorporating mindfulness into your daily routine, even for just a few minutes, can significantly reduce stress and improve your overall well-being. It’s about training your mind to be present, which helps you better handle life’s challenges.</p>
            <p><strong>What is Mindfulness?</strong></p>
            <p>At its core, mindfulness means being fully aware of what's happening right now, without judgment. It's not about emptying your mind, but about observing your thoughts, feelings, and bodily sensations as they arise.</p>
            <p><strong>Benefits of Mindfulness:</strong></p>
            <ul>
                <li>Reduces stress and anxiety</li>
                <li>Improves emotional regulation</li>
                <li>Enhances focus and concentration</li>
                <li>Boosts self-awareness</li>
                <li>Increases compassion for self and others</li>
            </ul>
            <p><strong>Simple Mindfulness Exercises:</strong></p>
            <ol>
                <li><strong>Mindful Breathing:</strong> Take a few moments to simply focus on your breath. Notice the sensation of air entering and leaving your body.</li>
                <li><strong>Body Scan:</strong> Lie down and bring your attention to different parts of your body, noticing any sensations without trying to change them.</li>
                <li><strong>Mindful Eating:</strong> Pay full attention to the taste, texture, and smell of your food.</li>
                <li><strong>The 5-4-3-2-1 Grounding Technique:</strong>
                    <ul>
                        <li>Notice <strong>5</strong> things you can see.</li>
                        <li>Notice <strong>4</strong> things you can touch.</li>
                        <li>Notice <strong>3</strong> things you can hear.</li>
                        <li>Notice <strong>2</strong> things you can smell.</li>
                        <li>Notice <strong>1</strong> thing you can taste.</li>
                    </ul>
                </li>
            </ol>
            <p>Start small, perhaps just 5-10 minutes a day. Consistency is key. Over time, you'll find that mindfulness can bring a profound sense of calm and clarity to your life.</p>
        `,
        author: 'Jane Doe',
        publishDate: 'November 1, 2024',
        readTime: '5 min read'
    },
    // Add other articles here with full content and author/date if desired
];
// --- End Sample Data ---


const slugify = (title: string): string => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const getArticleBySlug = (slug: string) => {
    return articles.find(article => slugify(article.title) === slug);
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const article = getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="bg-neutral-50 min-h-screen py-10 sm:py-16 lg:py-20 animate-fade-in">
            <div className="container mx-auto px-4 max-w-screen-md lg:max-w-screen-lg">
                {/* Back to Articles Button */}
                <div className="mb-8">
                    <Link
                        href="/member/article"
                        className="inline-flex items-center text-pink-600 hover:text-red-600 transition-colors duration-200 font-medium group"
                    >
                        <svg className="h-5 w-5 mr-2 -translate-x-1 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Articles
                    </Link>
                </div>

                {/* Article Header */}
                <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100">
                    {/* Hero Image */}
                    <div className="relative w-full h-64 sm:h-80 md:h-96">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority // Preload the main image
                            className="transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <span className="absolute bottom-4 left-4 bg-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                            {article.category}
                        </span>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                        {/* Title & Metadata */}
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 mb-4 leading-tight">
                            {article.title}
                        </h1>
                        <p className="text-neutral-600 text-lg sm:text-xl mb-6">
                            {article.summary}
                        </p>
                        <div className="flex items-center text-neutral-500 text-sm sm:text-base space-x-4 mb-10 pb-6 border-b border-neutral-200">
                            {article.author && (
                                <span className="flex items-center">
                                    <svg className="h-4 w-4 mr-2 text-rose-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                                    By {article.author}
                                </span>
                            )}
                            {article.publishDate && (
                                <span className="flex items-center">
                                    <svg className="h-4 w-4 mr-2 text-rose-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                    {article.publishDate}
                                </span>
                            )}
                            {article.readTime && (
                                <span className="flex items-center">
                                    <svg className="h-4 w-4 mr-2 text-rose-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 9a1 1 0 000 2h4a1 1 0 000-2H5zM15 9a1 1 0 10-2 0v4a1 1 0 102 0V9z" clipRule="evenodd" /></svg>
                                    {article.readTime}
                                </span>
                            )}
                        </div>

                        {/* Article Content */}
                        <div
                            className="prose prose-lg sm:prose-xl max-w-none text-neutral-700 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}

// Ensure generateStaticParams is correctly implemented if using static generation
export async function generateStaticParams() {
    return articles.map(article => ({
        slug: slugify(article.title),
    }));
}