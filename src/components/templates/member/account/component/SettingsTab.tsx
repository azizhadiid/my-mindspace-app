import React from 'react';
import { Shield, Bell } from 'lucide-react';

const SettingsTab = () => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Pengaturan</h2>
        <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                    <Shield className="w-6 h-6 text-pink-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Privasi & Keamanan</h3>
                </div>
                <div className="space-y-4">
                    <button className="w-full text-left p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">Ubah Password</span>
                    </button>
                    <button className="w-full text-left p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors text-red-600">
                        <span>Hapus Akun</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default SettingsTab;