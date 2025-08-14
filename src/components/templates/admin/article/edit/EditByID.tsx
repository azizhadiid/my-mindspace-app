'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useParams dan useRouter

import Swal from "sweetalert2";
import TextAreaField from '../TextAreaField';
import InputField from '../InputField';
import SelectField from '../SelectField';
import ImageUploadField from '../ImageUploadField';
import SubmitButton from '../SubmitButton';

interface Artikel {
    id: string; // ID dari Prisma adalah string
    title: string;
    content: string;
    category: string;
    publishDate: string; // Format YYYY-MM-DD
    image: string; // URL gambar yang sudah ada
}

const EditByID = () => {
    const params = useParams(); // Hook untuk mendapatkan parameter URL
    const router = useRouter();
    const articleId = params.id as string; // Ambil ID artikel dari URL

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Mulai dengan loading true
    const [initialImage, setInitialImage] = useState<string | null>(null); // Untuk menyimpan URL gambar awal

    // Categories for the select field
    const categories = [
        { value: "Kesehatan Mental", label: "Kesehatan Mental" },
        { value: "Hidup Sehat Tahun 2025", label: "Hidup Sehat Tahun 2025" },
        { value: "Dampak Digital Terhadap Mental", label: "Dampak Digital Terhadap Mental" },
        { value: "Sosial Media dan Kesehatan Mental", label: "Sosial Media dan Kesehatan Mental" },
    ];

    // Effect untuk mengambil data artikel saat komponen dimuat atau ID berubah
    useEffect(() => {
        const fetchArticle = async () => {
            if (!articleId) return; // Jangan fetch jika ID belum ada

            setLoading(true);
            try {
                const response = await fetch(`/api/articles/${articleId}`);
                if (!response.ok) {
                    throw new Error('Gagal mengambil data artikel.');
                }
                const data: Artikel = await response.json();

                setTitle(data.title);
                setContent(data.content);
                setCategory(data.category);
                // Format tanggal ke YYYY-MM-DD untuk input type="date"
                setDate(new Date(data.publishDate).toISOString().split('T')[0]);
                setImagePreview(data.image); // Tampilkan gambar yang sudah ada
                setInitialImage(data.image); // Simpan URL gambar awal

            } catch (error) {
                console.error("Error fetching article:", error);
                Swal.fire('Error', 'Gagal memuat data artikel.', 'error');
                router.push('/admin/article/edit'); // Redirect kembali jika gagal
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleId, router]); // Dependency array: articleId dan router

    // Logika handleImageChange
    const handleImageChange = (file: File | null) => {
        setFeaturedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            // Jika file dihapus, kembalikan ke gambar awal jika ada
            setImagePreview(initialImage);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("publishDate", date);
            formData.append("content", content);

            // Hanya tambahkan gambar ke formData jika ada gambar baru yang dipilih
            if (featuredImage) {
                formData.append("image", featuredImage);
            } else if (initialImage) {
                // Jika tidak ada gambar baru, dan ada gambar lama, kirimkan URL gambar lama
                // Ini penting jika API backend Anda mengharapkan `image` selalu ada,
                // atau Anda bisa modifikasi API backend untuk menangani kasus tanpa `image`
                formData.append("image", initialImage);
            }


            const res = await fetch(`/api/articles/${articleId}`, { // Targetkan API route spesifik dengan ID
                method: "PUT", // Gunakan PUT untuk update penuh atau PATCH untuk partial update
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Gagal memperbarui artikel");

            Swal.fire({
                icon: "success",
                title: "Artikel berhasil diperbarui!",
                showConfirmButton: false,
                timer: 1500,
            });

            // Redirect kembali ke halaman daftar artikel setelah sukses update
            router.push('/admin/article/edit');
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-2 flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-700 dark:text-gray-300">Memuat data artikel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="container mx-auto px-4 py-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Artikel</h1>

                <form className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Kolom Kiri: Judul dan Konten */}
                        <div className="lg:col-span-2 space-y-6">
                            <InputField
                                id="title"
                                label="Judul Artikel"
                                type="text"
                                placeholder="Masukkan judul artikel..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <TextAreaField
                                id="content"
                                label="Konten Artikel"
                                placeholder="Tulis konten artikel di sini..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                required
                            />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Gunakan editor ini untuk memformat teks, menambahkan gambar, atau video.</p>
                        </div>

                        {/* Kolom Kanan: Pengaturan Artikel */}
                        <div className="lg:col-span-1 space-y-6">
                            <SelectField
                                id="category"
                                label="Kategori"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                options={categories}
                                required
                            />

                            <InputField
                                id="publish-date"
                                label="Tanggal Publish"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />

                            <ImageUploadField
                                id="featured-image"
                                label="Gambar Unggulan"
                                onFileChange={handleImageChange}
                                previewUrl={imagePreview} // Menampilkan gambar yang sudah ada/baru
                            />
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-end space-x-4 mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <SubmitButton
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Perbarui Artikel
                        </SubmitButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditByID;