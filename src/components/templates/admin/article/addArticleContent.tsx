'use client'

import { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import SelectField from './SelectField';
import ImageUploadField from './ImageUploadField';
import SubmitButton from './SubmitButton';

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
        { value: "IT Consulting", label: "IT Consulting" },
        { value: "Business Strategy", label: "Business Strategy" },
        { value: "Digital Transformation", label: "Digital Transformation" },
        { value: "Cyber Security", label: "Cyber Security" },
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
    const handleSubmit = () => {
        setLoading(true);
        // Simulasi proses pengiriman data
        setTimeout(() => {
            console.log("Data Artikel yang disubmit:", {
                title,
                content,
                category,
                date,
                featuredImage,
            });
            // Reset loading state
            setLoading(false);
            alert('Artikel berhasil disubmit! Cek console untuk data.')
        }, 1500);
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