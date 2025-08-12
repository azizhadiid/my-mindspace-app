import React from 'react';
import { MoreVertical } from 'lucide-react';

const RecentArticles = () => {
    const articles = [
        { title: 'Tips Mengatasi Anxiety', views: 1247, status: 'Published' },
        { title: 'Mindfulness untuk Pemula', views: 892, status: 'Draft' },
        { title: 'Cara Tidur yang Berkualitas', views: 2156, status: 'Published' }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Artikel Terbaru</h3>
                <button className="text-pink-500 hover:text-pink-600 text-sm font-medium">
                    Kelola Artikel
                </button>
            </div>
            <div className="space-y-4">
                {articles.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                            <p className="font-medium text-gray-800">{article.title}</p>
                            <p className="text-xs text-gray-500">{article.views} views</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${article.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                }`}>
                                {article.status}
                            </span>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentArticles;
