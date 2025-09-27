'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Check, X, Trash } from 'lucide-react';
import { useDebounce } from 'use-debounce'; // Anda perlu install: npm install use-debounce
import Swal from 'sweetalert2';

// Definisikan tipe data untuk konsultasi
interface Consultation {
    id: string;
    user: {
        name: string;
        email: string;
    };
    name_psikolog: string;
    main_topic: string;
    createdAt: string; // Ini akan jadi string tanggal dari API
    status: string;
}

const ConsultationContent = () => {
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // State untuk Search dan Pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce untuk search smooth
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const itemsPerPage = 8;

    // --- Efek untuk Fetch Data dari API ---
    useEffect(() => {
        const fetchConsultations = async () => {
            setIsLoading(true);
            try {
                // Buat URL dengan parameter search dan pagination
                const params = new URLSearchParams({
                    page: String(currentPage),
                    limit: String(itemsPerPage),
                    search: debouncedSearchTerm,
                });

                const response = await fetch(`/api/consultation?${params.toString()}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setConsultations(data.data);
                setTotalPages(data.totalPages);
                setTotalItems(data.totalItems);
            } catch (error) {
                console.error("Error fetching consultations:", error);
                // Handle error di sini (misal: tampilkan notifikasi)
            } finally {
                setIsLoading(false);
            }
        };

        fetchConsultations();
    }, [currentPage, debouncedSearchTerm]); // Fetch ulang jika halaman atau search term berubah


    // --- Fungsi Aksi (Sementara update state lokal, idealnya panggil API) ---
    const handleAction = async (id: string, newStatus: 'pay' | 'cancelled') => {
        try {
            const response = await fetch(`/api/consultation/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                // Jika server mengembalikan error, tampilkan pesan
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update status');
            }

            // Jika berhasil, update state lokal agar UI langsung berubah
            setConsultations(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, status: newStatus } : item
                )
            );

            // --- GANTI ALERT DENGAN SWEETALERT SUKSES ---
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `Consultation status has been changed to ${newStatus}.`,
                timer: 2000, // Alert akan hilang setelah 2 detik
                showConfirmButton: false,
                background: '#fff',
                color: '#333'
            });
        } catch (error: any) {
            console.error("Error updating status:", error);

            // --- GANTI ALERT DENGAN SWEETALERT ERROR ---
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Something went wrong!',
                background: '#fff',
                color: '#333'
            });
        }
    };

    const handleDelete = (id: string, name: string) => {
        // 1. Tampilkan dialog konfirmasi
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete the consultation belonging to "${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // Warna tombol konfirmasi (merah)
            cancelButtonColor: '#3085d6', // Warna tombol batal (biru)
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: '#fff',
            color: '#333'
        }).then(async (result) => {
            // 2. Cek apakah pengguna menekan tombol konfirmasi
            if (result.isConfirmed) {
                try {
                    // 3. Jika dikonfirmasi, kirim request DELETE ke API
                    const response = await fetch(`/api/consultation/${id}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to delete data');
                    }

                    // 4. Hapus item dari state agar UI ter-update
                    setConsultations(prev => prev.filter(item => item.id !== id));

                    // 5. Tampilkan notifikasi sukses
                    Swal.fire({
                        title: 'Success!!',
                        text: 'Consultation data has been deleted.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    });

                } catch (error: any) {
                    // 6. Tampilkan notifikasi jika terjadi error
                    Swal.fire({
                        title: 'Failed!',
                        text: error.message || 'Unable to delete consultation.',
                        icon: 'error',
                    });
                }
            }
        });
    };

    const getStatusClasses = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'pay': return 'bg-blue-100 text-blue-800'; // Status baru
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'confirmed': return 'bg-green-100 text-green-800'; // Jaga-jaga jika masih ada
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100/50">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex-1 text-center md:text-left">Consultation Requests</h2>
                <div className="relative w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, topic..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white"
                    />
                </div>
            </div>

            {/* Kontainer untuk Tabel dan Kartu */}
            <div className="min-h-[400px]">
                {/* Tampilan Tabel Desktop */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="min-w-full w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/70">
                            <tr>
                                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient Name</th>
                                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Psychologist</th>
                                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Topic</th>
                                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submitted</th>
                                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-4 md:px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white/50 divide-y divide-gray-200">
                            {isLoading ? (
                                <tr><td colSpan={6} className="py-10 text-center text-gray-500">Loading...</td></tr>
                            ) : consultations.length > 0 ? (
                                consultations.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.user.name}</td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.name_psikolog}</td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.main_topic}</td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                            <span className={`capitalize px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button onClick={() => handleAction(item.id, 'pay')} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors" title="Set to Pay" disabled={item.status !== 'pending'}>
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleAction(item.id, 'cancelled')} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors" title="Cancel" disabled={item.status !== 'pending'}>
                                                    <X className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDelete(item.id, item.user.name)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Delete">
                                                    <Trash className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={6} className="py-10 text-center text-gray-500">No consultations found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tampilan Kartu Mobile */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {isLoading ? (
                        <div className="py-10 text-center text-gray-500">Loading...</div>
                    ) : consultations.length > 0 ? (
                        consultations.map((item) => (
                            <div key={item.id} className="bg-white/70 p-4 rounded-xl shadow-md border border-gray-100 space-y-3">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <h3 className="font-bold text-gray-900">{item.user.name}</h3>
                                    <span className={`capitalize px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="text-sm space-y-2">
                                    <p><strong className="font-medium text-gray-600">Psychologist:</strong> {item.name_psikolog}</p>
                                    <p><strong className="font-medium text-gray-600">Topic:</strong> {item.main_topic}</p>
                                    <p><strong className="font-medium text-gray-600">Submitted:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex justify-end space-x-2 pt-2">
                                    <button onClick={() => handleAction(item.id, 'pay')} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors" title="Set to Pay" disabled={item.status !== 'pending'}>
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleAction(item.id, 'cancelled')} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors" title="Cancel" disabled={item.status !== 'pending'}>
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(item.id, item.user.name)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Delete">
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center text-gray-500">No consultations found.</div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                <span className="text-sm text-gray-600">
                    Showing {consultations.length} of {totalItems} results
                </span>
                <nav className="relative z-0 inline-flex rounded-full shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || isLoading}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-full border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border-y border-gray-300 bg-white text-sm font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || isLoading}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-full border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default ConsultationContent;