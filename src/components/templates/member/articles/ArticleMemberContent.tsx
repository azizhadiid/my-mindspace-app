'use client'
import { useEffect, useState, useCallback } from "react";
import CardArticle from "./components/CardArticle";
import HeaderArticle from "./components/HeaderArticle";
import type { Artikel } from "@/types/article";

const categories = [
    "All",
    "Mental Health",
    "Mindfulness",
    "Self-Care",
    "Personal Growth",
    "Work-Life Balance",
    "Physical Health",
];

export default function ArticleMemberContent() {
    const [articles, setArticles] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        try {
            const searchQuery = search ? `&search=${search}` : '';
            const categoryQuery = category && category !== 'All' ? `&category=${category}` : '';

            const response = await fetch(`/api/articles?page=1&limit=20${searchQuery}${categoryQuery}`);
            if (!response.ok) {
                throw new Error('Failed to fetch articles.');
            }
            const data = await response.json();
            setArticles(data.articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }, [search, category]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return (
        <div className="container mx-auto px-4 py-12">
            <HeaderArticle
                categories={categories}
                onSearch={setSearch}
                onCategorySelect={setCategory}
            />
            {loading ? (
                // Tambahkan loading skeleton atau pesan loading
                <div className="text-center py-16">
                    <p className="text-gray-500">Loading articles...</p>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <CardArticle
                                key={article.id}
                                article={{
                                    id: article.id,
                                    title: article.title,
                                    summary: article.content.slice(0, 120) + "...",
                                    category: article.category,
                                    imageUrl: article.image,
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 bg-rose-50 rounded-2xl border border-rose-100 shadow-inner">
                            <svg
                                className="w-16 h-16 text-rose-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M12 21a9 9 0 100-18 9 9 0 000 18z"
                                />
                            </svg>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                No articles found
                            </h2>
                            <p className="text-gray-500 text-sm mb-6 text-center max-w-md">
                                We couldn’t find any articles matching your search or filter. Try adjusting your keywords or selecting another category.
                            </p>
                            <button
                                onClick={() => { setSearch(''); setCategory('All'); }}
                                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
                            >
                                Reset Search
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}