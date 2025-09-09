'use client'
import React, { useState } from 'react';

const HeaderArticle = ({ categories }: { categories: string[] }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent inline-block">
                MindSpace Article
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our collection of articles on mental health, well-being, and personal growth. Find tips, guides, and inspiration for a healthier mind.
            </p>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="relative w-full md:w-2/3 max-w-lg">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={handleSearchChange}
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
    );
};

export default HeaderArticle;