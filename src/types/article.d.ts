export interface Artikel {
    id: string; // Menggunakan string sesuai Prisma
    title: string; // Menggunakan title sesuai Prisma
    category: string;
    publishDate: string; // Tetap string karena akan diparsing Date di frontend
    image: string; // Menggunakan image sesuai Prisma
    // Add other fields as needed
}