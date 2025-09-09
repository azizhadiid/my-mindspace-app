// components/templates/admin/article/edit/EditArticleContent.tsx
'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// Bagian komponen untuk mengedit artikel
import ArtikelTable from "./ArtikelTable";
import PaginationControls from "./PaginationControls ";
import SearchAndFilter from "./SearchAndFilter";
import type { Artikel } from "@/types/article";

// Hapus DUMMY_ARTIKELS karena kita akan fetch dari API

const EditArtikelContent = () => {
    const router = useRouter();
    const [artikels, setArtikels] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null); // Mengubah tipe id menjadi string

    // State untuk Search dan Pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [perPage, setPerPage] = useState(10);

    // Menggunakan useCallback untuk memoize fungsi fetchArtikels
    const fetchArtikels = useCallback(async (page: number, search: string, itemsPerPage: number) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/articles?page=${page}&limit=${itemsPerPage}&search=${search}`);
            if (!response.ok) {
                throw new Error('Gagal mengambil data artikel');
            }
            const data = await response.json();
            setArtikels(data.articles.map((artikel: any) => ({
                id: artikel.id,
                title: artikel.title, // Sesuaikan dengan 'title' dari Prisma
                category: artikel.category,
                publishDate: artikel.publishDate, // Sesuaikan dengan 'publishDate' dari Prisma
                image: artikel.image, // Sesuaikan dengan 'image' dari Prisma
            }))); // Sesuaikan field dari API ke interface Artikel
            setTotalItems(data.totalItems);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching articles:", error);
            Swal.fire('Error', 'Gagal mengambil data artikel.', 'error');
            setArtikels([]); // Kosongkan data jika ada error
            setTotalItems(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, []);

    // Effect untuk memanggil fetchArtikels saat ada perubahan state
    useEffect(() => {
        fetchArtikels(currentPage, searchTerm, perPage);
    }, [currentPage, searchTerm, perPage, fetchArtikels]);

    const handleEdit = (artikelId: string) => { // Mengubah tipe id menjadi string
        router.push(`/admin/article/edit/${artikelId}`);
    };

    const handleDelete = async (artikelId: string) => { // Mengubah tipe id menjadi string
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda tidak akan bisa mengembalikan artikel ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setDeletingId(artikelId);
                try {
                    const response = await fetch(`/api/articles/${artikelId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Gagal menghapus artikel');
                    }

                    // Update state lokal setelah berhasil hapus
                    setArtikels(prevArtikels => prevArtikels.filter(artikel => artikel.id !== artikelId));
                    Swal.fire('Terhapus!', 'Artikel Anda telah dihapus.', 'success');
                    fetchArtikels(currentPage, searchTerm, perPage); // Refresh the list
                } catch (error) {
                    console.error("Error deleting article:", error);
                    Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus artikel.', 'error');
                } finally {
                    setDeletingId(null);
                }
            }
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset ke halaman 1 setiap kali search term berubah
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset ke halaman 1
    };

    return (
        <div className="container mx-auto px-4 py-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Daftar Artikel Anda</h1>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
                <SearchAndFilter
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    perPage={perPage}
                    onPerPageChange={handlePerPageChange}
                    loading={loading}
                />
                {loading && artikels.length === 0 ? (
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                        {[...Array(perPage)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded-md mb-2"></div>
                        ))}
                    </div>
                ) : artikels.length === 0 && !loading ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                        <p className="mb-4 text-lg">Tidak ada artikel ditemukan dengan kriteria pencarian Anda.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                        >
                            Reset Pencarian
                        </button>
                    </div>
                ) : (
                    <ArtikelTable
                        artikels={artikels}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        deletingId={deletingId}
                    />
                )}
                {artikels.length > 0 && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        loading={loading}
                        totalItems={totalItems}
                        perPage={perPage}
                    />
                )}
            </div>
        </div>
    );
};

export default EditArtikelContent;