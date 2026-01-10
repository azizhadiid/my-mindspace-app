import React from 'react';
import { User, Download } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Definisikan tipe data props
interface ConsultationData {
    id: string;
    name: string;
    time: string;
    status: string;
    psychologist: string;
}

interface StatsData {
    totalUsers: number;
    activePsychologists: number;
    todayConsultations: number;
    satisfactionRate: string;
}

interface RecentConsultationsProps {
    data?: ConsultationData[]; // Jadikan opsional agar tidak error jika data belum load
    stats?: StatsData;
}

const RecentConsultations: React.FC<RecentConsultationsProps> = ({ data = [], stats }) => {
    // 2. Fungsi Generate PDF
    const handleDownloadReport = () => {
        const doc = new jsPDF();

        // --- Bagian Header ---
        doc.setFontSize(18);
        doc.text('Admin Dashboard Report', 14, 20);

        doc.setFontSize(10);
        doc.text(`Printed on: ${new Date().toLocaleString('id-ID')}`, 14, 28);
        doc.line(14, 32, 196, 32); // Garis horizontal

        // --- Bagian 1: Ringkasan Statistik (Pertumbuhan Pengguna) ---
        if (stats) {
            doc.setFontSize(14);
            doc.text('Statistics Summary', 14, 42);

            const statsData = [
                ['Total Users (Member)', stats.totalUsers.toLocaleString()],
                ['Active Psychologists', stats.activePsychologists.toLocaleString()],
                ['Consultations Today', stats.todayConsultations.toLocaleString()],
                ['Satisfaction Rate', `${stats.satisfactionRate} / 5.0`],
            ];

            autoTable(doc, {
                startY: 45,
                head: [['Metric', 'Value']],
                body: statsData,
                theme: 'plain', // Tampilan tabel sederhana untuk stats
                styles: { fontSize: 10, cellPadding: 2 },
                columnStyles: { 0: { fontStyle: 'bold', cellWidth: 80 } },
            });
        }

        // --- Bagian 2: Data Konsultasi Terbaru ---
        // Menentukan posisi Y setelah tabel stats (atau default jika stats kosong)
        // @ts-ignore (mengabaikan error tipe lastAutoTable di TypeScript standar)
        const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 40;

        doc.setFontSize(14);
        doc.text('Recent Consultation History', 14, finalY);

        // Menyiapkan data untuk tabel
        const tableBody = data.map(item => [
            item.name,
            item.psychologist,
            item.time,
            item.status
        ]);

        autoTable(doc, {
            startY: finalY + 5,
            head: [['Patient Name', 'Psychologist', 'Time', 'Status']],
            body: tableBody,
            headStyles: { fillColor: [236, 72, 153] }, // Warna Pink (sesuai tema Anda)
            styles: { fontSize: 10 },
            alternateRowStyles: { fillColor: [250, 240, 245] }, // Pink sangat muda
        });

        // --- Simpan File ---
        doc.save(`Dashboard_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    // Helper function untuk warna status
    const getStatusColor = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'ongoing' || s === 'confirmed') return 'bg-green-100 text-green-600';
        if (s === 'completed') return 'bg-blue-100 text-blue-600';
        return 'bg-yellow-100 text-yellow-600'; // pending
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Consultations</h3>
                <div className="flex space-x-2">
                    {/* Tombol Download (Placeholder) */}
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-600 text-sm font-medium transition-colors px-2 py-1 rounded-lg hover:bg-pink-50" onClick={handleDownloadReport}>
                        <Download className="w-4 h-4" />
                        <span>Report</span>
                    </button>
                    <Link href="/admin/consultation" className="text-pink-500 hover:text-pink-600 text-sm font-medium flex items-center">
                        View All
                    </Link>
                </div>
            </div>
            <div className="space-y-4">
                {data.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada konsultasi terbaru.</p>
                ) : (
                    data.map((consultation, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{consultation.name}</p>
                                    <p className="text-xs text-gray-500">{consultation.psychologist}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-800">{consultation.time}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(consultation.status)}`}>
                                    {consultation.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentConsultations;