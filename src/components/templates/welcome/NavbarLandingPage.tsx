'use client'

import { useState } from 'react'
import { Menu, X, Brain } from 'lucide-react'

interface NavbarLandingPageProps {
    activeSection: string;
}

const NavbarLandingPage = ({ activeSection }: NavbarLandingPageProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper function to apply active styles
    const getLinkClasses = (sectionId: string, isMobile: boolean) => {
        const baseClasses = isMobile
            ? "block px-3 py-2 text-base font-medium transition-colors"
            : "text-gray-700 hover:text-pink-500 transition-colors font-medium";

        const activeClasses = isMobile
            ? "bg-pink-100 text-pink-600 rounded-lg"
            : "text-pink-500 font-bold";

        return `${baseClasses} ${activeSection === sectionId ? activeClasses : ''}`;
    };

    return (
        <nav className="relative bg-white/80 backdrop-blur-lg border-b border-rose-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href='/' className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            MindSpace
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#hero" className={getLinkClasses('hero', false)}>Home</a>
                        <a href="#about" className={getLinkClasses('about', false)}>About</a>
                        <a href="#services" className={getLinkClasses('services', false)}>Services</a>
                        <a href="#therapists" className={getLinkClasses('therapists', false)}>Therapists</a>
                        <a href="#contact" className={getLinkClasses('contact', false)}>Contact</a>
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a className="text-gray-700 hover:text-pink-500 transition-colors font-medium" href='/auth/login'>
                            Sign In
                        </a>
                        <a className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" href='/auth/register'>
                            Get Started
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
                            <a
                                href="#hero"
                                onClick={() => setIsMenuOpen(false)}
                                className={getLinkClasses('hero', true)}
                            >
                                Home
                            </a>
                            <a
                                href="#about"
                                onClick={() => setIsMenuOpen(false)}
                                className={getLinkClasses('about', true)}
                            >
                                About
                            </a>
                            <a
                                href="#services"
                                onClick={() => setIsMenuOpen(false)}
                                className={getLinkClasses('services', true)}
                            >
                                Services
                            </a>
                            <a
                                href="#therapists"
                                onClick={() => setIsMenuOpen(false)}
                                className={getLinkClasses('therapists', true)}
                            >
                                Therapists
                            </a>
                            <a
                                href="#contact"
                                onClick={() => setIsMenuOpen(false)}
                                className={getLinkClasses('contact', true)}
                            >
                                Contact
                            </a>
                            <div className="flex flex-col space-y-2 pt-4 border-t border-rose-100">
                                <a className="text-left text-gray-700 hover:text-pink-500 transition-colors font-medium" href='/auth/login'>
                                    Sign In
                                </a>
                                <a className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-center" href='/auth/register'>
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavbarLandingPage;