// components/templates/admin/article/edit/ArtikelTable.tsx
'use client'

import React from 'react';
import Image from 'next/image';
import { Trash2, Edit } from 'lucide-react';
import type { ArtikelTableProps } from '@/types/article';

const ArtikelTable: React.FC<ArtikelTableProps> = ({ artikels, onEdit, onDelete, deletingId }) => {
    return (
        <div className="mt-8">
            {/* Tampilan Tabel untuk Desktop (Hidden on Mobile) */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hidden md:block">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 w-24">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Publish Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Image</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {artikels.map((artikel) => (
                            <tr key={artikel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {artikel.id.substring(0, 8)}...
                                </td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-800 dark:text-gray-200 max-w-xs">
                                    {artikel.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {artikel.category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {new Date(artikel.publishDate).toLocaleDateString('id-ID')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
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
                                        <span className="text-gray-400 text-xs">No image</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex justify-center items-center space-x-2">
                                        <button onClick={() => onEdit(artikel.id)} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors shadow-md"> <Edit className="w-4 h-4" /> </button>
                                        <button onClick={() => onDelete(artikel.id)} disabled={deletingId === artikel.id} className={`p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-md ${deletingId === artikel.id ? 'opacity-50 cursor-not-allowed' : ''}`} > {deletingId === artikel.id ? (<svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">...</svg>) : (<Trash2 className="w-4 h-4" />)} </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tampilan Kartu untuk Mobile (Visible on Mobile) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {artikels.map((artikel) => (
                    <div key={artikel.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{artikel.title}</h3>
                                <p className="text-sm text-blue-600 dark:text-blue-400">{artikel.category}</p>
                            </div>
                            {artikel.image && (
                                <Image
                                    src={artikel.image}
                                    alt={artikel.title}
                                    width={64}
                                    height={64}
                                    className="h-16 w-16 object-cover rounded-md border border-gray-200 dark:border-gray-600 shadow-sm ml-4"
                                    unoptimized
                                />
                            )}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600 pt-3">
                            <p><strong>ID:</strong> {artikel.id.substring(0, 8)}...</p>
                            <p><strong>Published:</strong> {new Date(artikel.publishDate).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div className="flex justify-end items-center space-x-2 pt-2">
                            <button onClick={() => onEdit(artikel.id)} className="inline-flex items-center px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-xs shadow-md"> <Edit className="w-4 h-4 mr-1" /> Edit </button>
                            <button onClick={() => onDelete(artikel.id)} disabled={deletingId === artikel.id} className={`inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs shadow-md ${deletingId === artikel.id ? 'opacity-50 cursor-not-allowed' : ''}`} > {deletingId === artikel.id ? (<svg className="animate-spin h-4 w-4 mr-1 text-white" viewBox="0 0 24 24">...</svg>) : (<Trash2 className="w-4 h-4 mr-1" />)} {deletingId === artikel.id ? 'Deleting...' : 'Delete'} </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtikelTable;