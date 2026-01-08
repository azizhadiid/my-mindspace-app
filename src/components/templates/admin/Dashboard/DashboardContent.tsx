'use client';

import React, { useEffect, useState } from 'react';
import { Users, UserCheck, MessageCircle, Heart } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentConsultations from './RecentConsultations';
import RecentArticles from './RecentArticles';

// Definisi tipe state agar TypeScript senang
interface DashboardData {
    stats: {
        totalUsers: number;
        activePsychologists: number;
        todayConsultations: number;
        satisfactionRate: string;
    };
    recentConsultations: any[]; // Bisa dispesifikkan sesuai interface di RecentConsultations
    recentArticles: any[];      // Bisa dispesifikkan sesuai interface di RecentArticles
}

const DashboardContent = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/admin/dashboard');
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                } else {
                    console.error("Failed to fetch dashboard data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="p-10 text-center text-gray-500">Loading Dashboard stats...</div>;
    }

    // Default value jika data null (fallback)
    const stats = data?.stats || {
        totalUsers: 0,
        activePsychologists: 0,
        todayConsultations: 0,
        satisfactionRate: "0"
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    icon={Users}
                    title="Total Users"
                    value={stats.totalUsers.toLocaleString()}
                    // change={12} // Anda bisa menghitung logika % change nanti
                    color="blue"
                />
                <StatsCard
                    icon={UserCheck}
                    title="Active Psychologists"
                    value={stats.activePsychologists.toLocaleString()}
                    // change={8}
                    color="green"
                />
                <StatsCard
                    icon={MessageCircle}
                    title="Today's Consultations"
                    value={stats.todayConsultations.toLocaleString()}
                    // change={-3}
                    color="pink"
                />
                <StatsCard
                    icon={Heart}
                    title="Satisfaction Rate"
                    value={stats.satisfactionRate}
                    // change={2}
                    color="purple"
                />
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentConsultations data={data?.recentConsultations} />
                <RecentArticles data={data?.recentArticles} />
            </div>
        </div>
    );
};

export default DashboardContent;