'use client';

import React, { useState } from 'react';
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Heart,
    Shield,
    Award,
    Users,
    ArrowRight,
    CheckCircle
} from 'lucide-react';

interface NewsletterData {
    email: string;
}

const Footer = () => {
    const [newsletterData, setNewsletterData] = useState<NewsletterData>({ email: '' });
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNewsletterSubmit = () => {
        if (newsletterData.email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setNewsletterData({ email: '' });
            }, 3000);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewsletterData({ email: e.target.value });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-red-500 to-pink-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                        {/* Brand & Description */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white fill-current" />
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-black text-white">
                                    Mind<span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">Space</span>
                                </h3>
                            </div>

                            <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                                Your personal sanctuary for mental wellness. Experience confidential, compassionate, and professional guidance that fits your lifestyle.
                            </p>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-gray-700/50">
                                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">HIPAA Compliant</p>
                                        <p className="text-xs text-gray-400">Secure & Private</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-gray-700/50">
                                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                                        <Award className="w-5 h-5 text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Licensed Pros</p>
                                        <p className="text-xs text-gray-400">Certified Therapists</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="group w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 transition-all duration-300"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                                </a>
                                <a
                                    href="#"
                                    className="group w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 transition-all duration-300"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                                </a>
                                <a
                                    href="#"
                                    className="group w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 transition-all duration-300"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                                </a>
                                <a
                                    href="#"
                                    className="group w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { name: 'About Us', href: '#about' },
                                    { name: 'Services', href: '#services' },
                                    { name: 'Our Therapists', href: '#therapists' },
                                    { name: 'Contact', href: '#contact' },
                                ].map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="group flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-all duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact & Legal */}
                        <div className="space-y-8">
                            {/* Contact Info */}
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                    Get in Touch
                                </h4>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                                            <Phone className="w-4 h-4 text-pink-400" />
                                        </div>
                                        <a href="tel:+11234567890" className="hover:text-pink-400 transition-colors">
                                            +1 (123) 456-7890
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                                            <Mail className="w-4 h-4 text-pink-400" />
                                        </div>
                                        <a href="mailto:support@mindspace.com" className="hover:text-pink-400 transition-colors">
                                            support@mindspace.com
                                        </a>
                                    </div>

                                    <div className="flex items-start gap-3 text-gray-300">
                                        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                                            <MapPin className="w-4 h-4 text-pink-400" />
                                        </div>
                                        <address className="not-italic leading-relaxed">
                                            123 Wellness Street,<br />
                                            Suite 456, Mindville<br />
                                            MA 01234, USA
                                        </address>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Links */}
                            <div className="space-y-4">
                                <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h5>
                                <ul className="space-y-2">
                                    {[
                                        { name: 'Privacy Policy', href: '#privacy' },
                                        { name: 'Terms of Service', href: '#terms' },
                                        { name: 'HIPAA Notice', href: '#hipaa' },
                                        { name: 'FAQ', href: '#faq' }
                                    ].map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-300"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="mt-16 pt-12 border-t border-gray-700/50">
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Users className="w-6 h-6 text-pink-500" />
                                <h4 className="text-2xl font-bold text-white">Stay Connected</h4>
                            </div>

                            <p className="text-gray-300 mb-8">
                                Join our community and receive weekly insights, tips, and resources for better mental health.
                            </p>

                            {isSubscribed ? (
                                <div className="flex items-center justify-center gap-3 p-4 bg-green-500/20 rounded-2xl border border-green-500/30">
                                    <CheckCircle className="w-6 h-6 text-green-400" />
                                    <span className="text-green-400 font-medium">Thank you for subscribing!</span>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        value={newsletterData.email}
                                        onChange={handleEmailChange}
                                        placeholder="Enter your email address"
                                        className="flex-1 px-6 py-4 bg-white/10 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-pink-500 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                                    />
                                    <button
                                        onClick={handleNewsletterSubmit}
                                        className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl font-semibold text-white hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <span>Subscribe</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-400">
                                &copy; {currentYear} MindSpace. All rights reserved. Made with ❤️ for mental wellness.
                            </p>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    24/7 Support Available
                                </span>
                                <span>Licensed & Insured</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;