'use client'

import { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import SelectField from './SelectField';
import ImageUploadField from './ImageUploadField';
import SubmitButton from './SubmitButton';
import Swal from "sweetalert2";

const AddArticleContent = () => {
    // Pindahkan semua state ke dalam komponen
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Categories for the select field
    const categories = [
        { value: "Kesehatan Mental", label: "Kesehatan Mental" },
        { value: "Hidup Sehat Tahun 2025", label: "Hidup Sehat Tahun 2025" },
        { value: "Dampak Digital Terhadap Mental", label: "Dampak Digital Terhadap Mental" },
        { value: "Sosial Media dan Kesehatan Mental", label: "Sosial Media dan Kesehatan Mental" },
    ];

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
            setImagePreview(null);
        }
    };

    // Fungsi ini sekarang hanya akan melakukan simulasi atau menampilkan data di konsol
    const handleSubmit = async () => {
        if (!featuredImage) {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Pilih gambar terlebih dahulu!",
            });
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("publishDate", date);
            formData.append("content", content);
            formData.append("image", featuredImage);

            const res = await fetch("/api/articles", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to add article");

            // Alert sukses
            Swal.fire({
                icon: "success",
                title: "Article successfully uploaded!",
                showConfirmButton: false,
                timer: 1500,
            });

            // Reset form
            setTitle("");
            setContent("");
            setCategory("");
            setDate("");
            setFeaturedImage(null);
            setImagePreview(null);
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

    return (
        <div className="space-y-6">
            <div className="container mx-auto px-4 py-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tambah Artikel Baru</h1>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
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
                            Publikasikan Artikel
                        </SubmitButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddArticleContent;