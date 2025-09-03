'use client'

import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

// Data dummy untuk simulasi
const dummyUsers = [
    { id: 'usr-001', name: 'John Doe', email: 'john.d@email.com', date: '2025-08-28', status: 'Pending' },
    { id: 'usr-002', name: 'Jane Smith', email: 'jane.s@email.com', date: '2025-08-27', status: 'Verified' },
    { id: 'usr-003', name: 'Peter Jones', email: 'peter.j@email.com', date: '2025-08-26', status: 'Rejected' },
    { id: 'usr-004', name: 'Mary Williams', email: 'mary.w@email.com', date: '2025-08-25', status: 'Pending' },
    { id: 'usr-005', name: 'Sarah Miller', email: 'sarah.m@email.com', date: '2025-08-24', status: 'Pending' },
    { id: 'usr-006', name: 'David Wilson', email: 'david.w@email.com', date: '2025-08-23', status: 'Verified' },
    { id: 'usr-007', name: 'Linda Davis', email: 'linda.d@email.com', date: '2025-08-22', status: 'Pending' },
    { id: 'usr-008', name: 'Richard Moore', email: 'richard.m@email.com', date: '2025-08-21', status: 'Pending' },
    { id: 'usr-009', name: 'Susan Taylor', email: 'susan.t@email.com', date: '2025-08-20', status: 'Pending' },
    { id: 'usr-010', name: 'Charles Brown', email: 'charles.b@email.com', date: '2025-08-19', status: 'Verified' },
    { id: 'usr-011', name: 'Jessica White', email: 'jessica.w@email.com', date: '2025-08-18', status: 'Pending' },
    { id: 'usr-012', name: 'Thomas Hall', email: 'thomas.h@email.com', date: '2025-08-17', status: 'Pending' },
    { id: 'usr-013', name: 'Karen Martin', email: 'karen.m@email.com', date: '2025-08-16', status: 'Pending' },
];

const VerificationContent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState(dummyUsers);
    const itemsPerPage = 8;

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredUsers, currentPage, itemsPerPage]);

    const handleAction = (id: string, newStatus: 'Verified' | 'Rejected') => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === id ? { ...user, status: newStatus } : user
            )
        );
    };

    const getStatusClasses = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Verified':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100/50">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex-1">Verification Requests</h2>
                <div className="relative w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white"
                    />
                </div>
            </div>

            {/* Verification Table */}
            <div className="overflow-x-auto min-h-[400px]">
                <table className="min-w-full divide-y divide-gray-200 border-collapse">
                    <thead className="bg-gray-50/70 sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submitted</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 divide-y divide-gray-200">
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleAction(user.id, 'Verified')}
                                                className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                                                title="Verify"
                                                disabled={user.status !== 'Pending'}
                                            >
                                                <Check className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleAction(user.id, 'Rejected')}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                                title="Reject"
                                                disabled={user.status !== 'Pending'}
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-10 text-center text-gray-500">
                                    No users found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-gray-600">
                    Showing {paginatedUsers.length} of {filteredUsers.length} results
                </span>
                <nav className="relative z-0 inline-flex rounded-full shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-full border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-full border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default VerificationContent;