'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useParams dan useRouter

import Swal from "sweetalert2";
import TextAreaField from '../TextAreaField';
import InputField from '../InputField';
import SelectField from '../SelectField';
import ImageUploadField from '../ImageUploadField';
import SubmitButton from '../SubmitButton';
import type { Artikel } from '@/types/article';

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
        { value: "Mental Health", label: "Mental Health" },
        { value: "Healthy Living in 2025", label: "Healthy Living in 2025" },
        { value: "Digital Impact on Mental Health", label: "Digital Impact on Mental Health" },
        { value: "Social Media and Mental Health", label: "Social Media and Mental Health" },
        { value: "Work-Life Balance in the Digital Era", label: "Work-Life Balance in the Digital Era" },
        { value: "Mindfulness and Stress Management", label: "Mindfulness and Stress Management" },
        { value: "Youth Mental Health Awareness", label: "Youth Mental Health Awareness" },
        { value: "Online Privacy and Emotional Wellbeing", label: "Online Privacy and Emotional Wellbeing" },
        { value: "Mental Health Support for Students", label: "Mental Health Support for Students" }
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
                Swal.fire('Error', 'Failed to load article data.', 'error');
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
            if (!res.ok) throw new Error(data.error || "Failed to load article data.");

            Swal.fire({
                icon: "success",
                title: "Article successfully updated!",
                showConfirmButton: false,
                timer: 1500,
            });

            // Redirect kembali ke halaman daftar artikel setelah sukses update
            router.push('/admin/article/edit');
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "Failed",
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
                    <p className="text-gray-700 dark:text-gray-300">Loading article data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="container mx-auto px-4 py-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Article</h1>

                <form className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Kolom Kiri: Judul dan Konten */}
                        <div className="lg:col-span-2 space-y-6">
                            <InputField
                                id="title"
                                label="Article Title"
                                type="text"
                                placeholder="Enter the article title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <TextAreaField
                                id="content"
                                label="Article Content"
                                placeholder="Write the article content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                required
                            />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Use this editor to format text, add images, or embed videos.
                            </p>
                        </div>

                        {/* Kolom Kanan: Pengaturan Artikel */}
                        <div className="lg:col-span-1 space-y-6">
                            <SelectField
                                id="category"
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                options={categories}
                                required
                            />

                            <InputField
                                id="publish-date"
                                label="Publish Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />

                            <ImageUploadField
                                id="featured-image"
                                label="Featured Image"
                                onFileChange={handleImageChange}
                                previewUrl={imagePreview}
                                required
                            />
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-end space-x-4 mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <SubmitButton
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Update Article
                        </SubmitButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditByID;