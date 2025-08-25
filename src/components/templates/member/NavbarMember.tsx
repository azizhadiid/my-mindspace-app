'use client'

import { useState } from 'react'
import { Menu, X, Brain } from 'lucide-react'

const NavabrMember = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="relative bg-white/80 backdrop-blur-lg border-b border-rose-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            MindSpace
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="/member/home" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                            Home
                        </a>
                        <a href="/member/article" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                            Article
                        </a>
                        <a href="/member/chat" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                            Chating
                        </a>
                        <a href="/member/consultation" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                            Consultation
                        </a>

                        <a href="/member/mindbot" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                            Mindbot
                        </a>
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a className="text-gray-700 hover:text-pink-500 transition-colors font-medium" href='/member/account'>
                            Account
                        </a>
                        <a className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" href='/auth/logout'>
                            Logout
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-pink-500 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-rose-100 shadow-lg">
                        <div className="px-4 py-4 space-y-4">
                            <a href="/member/home" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
                                Home
                            </a>
                            <a href="/member/article" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
                                Article
                            </a>
                            <a href="/member/chat" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
                                Chating
                            </a>
                            <a href="/member/consultation" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
                                Consultation
                            </a>
                            <a href="/member/mindbot" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
                                Mindbot
                            </a>
                            <div className="flex flex-col space-y-2 pt-4 border-t border-rose-100">
                                <a className="text-left text-gray-700 hover:text-pink-500 transition-colors font-medium" href='/member/account'>
                                    Account
                                </a>
                                <a className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-center" href='/auth/logout'>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavabrMember;