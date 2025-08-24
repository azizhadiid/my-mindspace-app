'use client';

import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Pastikan Anda menginstal react-icons

const Footer = () => {
    return (
        <footer className="bg-pink-500 text-white py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Brand & Description */}
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-white">Mindspace</h3>
                        <p className="text-sm text-gray-200 leading-relaxed">
                            Your personal haven for mental well-being. Confidential, compassionate, and professional guidance is just a tap away.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="hover:text-pink-300 transition-colors duration-200">
                                <FaFacebook className="h-6 w-6" />
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-pink-300 transition-colors duration-200">
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a href="#" aria-label="Twitter" className="hover:text-pink-300 transition-colors duration-200">
                                <FaTwitter className="h-6 w-6" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="hover:text-pink-300 transition-colors duration-200">
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#about" className="hover:text-pink-300 transition-colors duration-200">About Us</a></li>
                            <li><a href="#services" className="hover:text-pink-300 transition-colors duration-200">Services</a></li>
                            <li><a href="#therapists" className="hover:text-pink-300 transition-colors duration-200">Our Therapists</a></li>
                            <li><a href="#contact" className="hover:text-pink-300 transition-colors duration-200">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-300 transition-colors duration-200">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-pink-300 transition-colors duration-200">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-pink-300 transition-colors duration-200">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter (optional, bisa dihilangkan) */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Stay Connected</h4>
                        <p className="text-sm text-gray-200">Subscribe to our newsletter for updates and tips on mental wellness.</p>
                        <form className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full p-3 rounded-l-md text-gray-900 border-none outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-pink-500 text-white p-3 rounded-r-md hover:bg-red-500 transition-colors duration-200"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 text-center text-sm text-gray-300 border-t border-red-500 pt-8">
                    &copy; {new Date().getFullYear()} Mindspace. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;