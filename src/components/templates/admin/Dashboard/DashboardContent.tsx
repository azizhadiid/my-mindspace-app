import React from 'react';

import {
    Users, UserCheck, MessageCircle, Heart
} from 'lucide-react';
import StatsCard from './StatsCard';
import RecentConsultations from './RecentConsultations';
import RecentArticles from './RecentArticles';

const DashboardContent = () => (
    <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
                icon={Users}
                title="Total Pengguna"
                value="2,847"
                change={12}
                color="blue"
            />
            <StatsCard
                icon={UserCheck}
                title="Psikolog Aktif"
                value="24"
                change={8}
                color="green"
            />
            <StatsCard
                icon={MessageCircle}
                title="Konsultasi Hari Ini"
                value="156"
                change={-3}
                color="pink"
            />
            <StatsCard
                icon={Heart}
                title="Rating Kepuasan"
                value="4.8"
                change={2}
                color="purple"
            />
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentConsultations />
            <RecentArticles />
        </div>
    </div>
);

export default DashboardContent;
