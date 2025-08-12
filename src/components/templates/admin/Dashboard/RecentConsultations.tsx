import React from 'react';
import { User, MoreVertical } from 'lucide-react';

const RecentConsultations = () => {
    const consultations = [
        { name: 'Sarah Johnson', time: '10:30 AM', status: 'Berlangsung', psychologist: 'Dr. Smith' },
        { name: 'Mike Chen', time: '11:15 AM', status: 'Selesai', psychologist: 'Dr. Brown' },
        { name: 'Anna Wilson', time: '12:00 PM', status: 'Menunggu', psychologist: 'Dr. Davis' }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Konsultasi Terbaru</h3>
                <button className="text-pink-500 hover:text-pink-600 text-sm font-medium">
                    Lihat Semua
                </button>
            </div>
            <div className="space-y-4">
                {consultations.map((consultation, index) => (
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
                            <span className={`text-xs px-2 py-1 rounded-full ${consultation.status === 'Berlangsung' ? 'bg-green-100 text-green-600' :
                                    consultation.status === 'Selesai' ? 'bg-blue-100 text-blue-600' :
                                        'bg-yellow-100 text-yellow-600'
                                }`}>
                                {consultation.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentConsultations;
