import { PrismaClient } from '@prisma/client';

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Data seed untuk psikolog
const psychologistData = [
    {
        name: 'Dr. Anisa Rahmawati, M.Psi.',
        specialization: 'Psikolog Klinis Dewasa',
        rating: 4.9,
        experience: '10 tahun',
        price: '350000',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
        verified: true,
        phoneNumber: '081234567890',
    },
    {
        name: 'Budi Santoso, S.Psi., M.A.',
        specialization: 'Psikolog Anak & Remaja',
        rating: 4.8,
        experience: '8 tahun',
        price: '300000',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop',
        verified: true,
        phoneNumber: '081298765432',
    },
    {
        name: 'Citra Lestari, M.Psi.',
        specialization: 'Konselor Pernikahan & Keluarga',
        rating: 4.9,
        experience: '12 tahun',
        price: '400000',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop',
        verified: false,
        phoneNumber: '081345678901',
    },
    {
        name: 'Dr. David Wijaya, Ph.D.',
        specialization: 'Psikolog Industri & Organisasi',
        rating: 4.7,
        experience: '15 tahun',
        price: '500000',
        image: 'https://images.unsplash.com/photo-1651008376811-6a6de491b72a?q=80&w=1974&auto=format&fit=crop',
        verified: true,
        phoneNumber: '081456789012',
    },
    {
        name: 'Eka Putri, S.Psi.',
        specialization: 'Konselor Karir',
        rating: 4.6,
        experience: '5 tahun',
        price: '250000',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
        verified: false,
        phoneNumber: '081567890123',
    },
    {
        name: 'Farhan Maulana, M.Psi.',
        specialization: 'Psikolog Pendidikan',
        rating: 4.8,
        experience: '7 tahun',
        price: '280000',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16e?q=80&w=2070&auto=format&fit=crop',
        verified: true,
        phoneNumber: '081678901234',
    },
];

async function main() {
    console.log('🌱 Memulai proses seeding...');

    // Hapus data lama untuk menghindari duplikasi saat menjalankan seed berulang kali
    await prisma.psychologist.deleteMany({});
    console.log('🗑️ Data lama berhasil dihapus.');

    // Masukkan data baru menggunakan createMany untuk efisiensi
    await prisma.psychologist.createMany({
        data: psychologistData,
    });
    console.log(`✅ Seeding selesai. ${psychologistData.length} data psikolog berhasil ditambahkan.`);
}

// Panggil fungsi main dan tangani kemungkinan error
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // Tutup koneksi ke database
        await prisma.$disconnect();
    });