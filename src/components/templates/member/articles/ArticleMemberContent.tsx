'use client'
import { useEffect, useState } from "react";
import CardArticle from "./components/CardArticle";
import HeaderArticle from "./components/HeaderArticle";

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
    const [articles, setArticles] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const fetchArticles = async () => {
        const params = new URLSearchParams({
            page: "1",
            limit: "20", // ambil banyak artikel
            search,
            category,
        });

        const res = await fetch(`/api/articles?${params.toString()}`);
        const data = await res.json();
        setArticles(data.articles); // <-- penting: ambil array, bukan data langsung
    };

    useEffect(() => {
        fetchArticles();
    }, [search, category]);

    return (
        <div className="container mx-auto px-4 py-12">
            <HeaderArticle
                categories={categories}
                onSearch={(term) => setSearch(term)}
                onCategorySelect={(cat) => setCategory(cat)}
            />
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
                            We couldn’t find any articles matching your search or filter.
                            Try adjusting your keywords or selecting another category.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
                        >
                            Reset Search
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
}
