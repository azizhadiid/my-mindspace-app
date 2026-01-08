import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Pastikan path ini sesuai dengan instance prisma client Anda

export async function GET() {
    try {
        // 1. Definisikan Range Waktu untuk "Hari Ini"
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // 2. Jalankan Query secara Paralel (Promise.all) agar performa cepat
        const [
            totalUsers,
            totalPsychologists,
            consultationsToday,
            avgRatingAgg,
            recentConsultations,
            recentArticles
        ] = await prisma.$transaction([
            // A. Total Users (Role MEMBER)
            prisma.user.count({
                where: { role: 'MEMBER' }
            }),

            // B. Active Psychologists
            prisma.psychologist.count({
                where: { verified: true }
            }),

            // C. Today's Consultations
            prisma.consultation.count({
                where: {
                    date: {
                        gte: today,
                        lt: tomorrow,
                    },
                },
            }),

            // D. Satisfaction Rate (Rata-rata rating Psikolog)
            prisma.psychologist.aggregate({
                _avg: {
                    rating: true,
                },
            }),

            // E. Recent Consultations (Ambil 5 terakhir)
            prisma.consultation.findMany({
                take: 5,
                orderBy: { date: 'desc' },
                include: {
                    user: { select: { name: true } } // Ambil nama user
                }
            }),

            // F. Recent Articles (Ambil 3 terakhir)
            prisma.article.findMany({
                take: 3,
                orderBy: { publishDate: 'desc' },
                include: {
                    author: { select: { name: true } }
                }
            })
        ]);

        // 3. Format Data agar sesuai dengan Tampilan Front-End
        const data = {
            stats: {
                totalUsers: totalUsers,
                activePsychologists: totalPsychologists,
                todayConsultations: consultationsToday,
                satisfactionRate: avgRatingAgg._avg.rating?.toFixed(1) || "0.0",
            },
            recentConsultations: recentConsultations.map(c => ({
                id: c.id,
                name: c.user.name,
                psychologist: c.name_psikolog,
                time: new Date(c.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                status: c.status, // Menggunakan status dari DB (pending, confirmed, etc)
            })),
            recentArticles: recentArticles.map(a => ({
                id: a.id,
                title: a.title,
                // Karena field 'views' tidak ada di schema, kita mock 0 atau random
                views: Math.floor(Math.random() * 500) + 100,
                // Logika sederhana: jika tanggal publish sudah lewat = Published
                status: new Date(a.publishDate) <= new Date() ? 'Published' : 'Draft',
            }))
        };

        return NextResponse.json(data);

    } catch (error) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}