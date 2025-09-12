'use client'
import Image from 'next/image';
import Link from 'next/link';

interface Article {
    id: string;
    title: string;
    summary: string;
    category: string;
    imageUrl: string;
}

const CardArticle = ({ article }: { article: Article }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-rose-100">
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
                <Link
                    href={`/member/article/${article.id}`}
                    className="inline-block text-pink-600 font-semibold hover:underline transition-colors"
                >
                    Read more →
                </Link>
            </div>
        </div>
    );
};

export default CardArticle;