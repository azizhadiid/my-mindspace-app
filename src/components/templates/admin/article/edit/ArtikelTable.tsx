// components/templates/admin/article/edit/ArtikelTable.tsx
'use client'

import React from 'react';
import Image from 'next/image';
import { Trash2, Edit } from 'lucide-react';
import type { ArtikelTableProps } from '@/types/article';

const ArtikelTable: React.FC<ArtikelTableProps> = ({ artikels, onEdit, onDelete, deletingId }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full lg:min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 w-16">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 w-64">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 w-40">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 w-40">
                            Publish Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 w-24">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 w-32">
                            Actions
                        </th>
                    </tr>

                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {artikels.map((artikel) => (
                        <tr key={artikel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {artikel.id.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-800 dark:text-gray-200">
                                {artikel.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {artikel.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {new Date(artikel.publishDate).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {artikel.image ? (
                                    <Image
                                        src={artikel.image}
                                        alt={artikel.title}
                                        width={48}
                                        height={48}
                                        className="h-12 w-12 object-cover rounded-md border border-gray-200 dark:border-gray-600 shadow-sm"
                                        unoptimized
                                    />
                                ) : (
                                    <span className="text-gray-400">No picture</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => onEdit(artikel.id)}
                                        className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-xs shadow-md"
                                    >
                                        <Edit className="w-4 h-4 mr-1" /> Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(artikel.id)}
                                        disabled={deletingId === artikel.id}
                                        className={`inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs shadow-md
                                        ${deletingId === artikel.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {deletingId === artikel.id ? (
                                            <svg className="animate-spin h-4 w-4 mr-1 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <Trash2 className="w-4 h-4 mr-1" />
                                        )}
                                        {deletingId === artikel.id ? 'Delete...' : 'Delete'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArtikelTable;