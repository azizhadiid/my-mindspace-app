'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const SectionFive = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Simulate form submission
        if (formData.name && formData.email && formData.message) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
            }, 3000);
        }
    };

    return (
        <section id="contact" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/20 to-red-50/30 py-20 sm:py-32">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-red-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-red-100 px-4 py-2 rounded-full mb-6">
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-pink-700">Get in Touch</span>
                    </div>

                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                        <span className="bg-gradient-to-r from-red-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                            Start Your
                        </span>
                        <br />
                        <span className="text-gray-900">Journey Today</span>
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Ready to prioritize your mental wellness? Our team is here to support you every step of the way.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12 items-start">
                    {/* Contact Form */}
                    <div className="xl:col-span-3">
                        <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100/50">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center">
                                    <Send className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Send Message</h3>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                                    <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <div onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                                                placeholder="Your full name"
                                            />
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="group w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <span>Send Message</span>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="xl:col-span-2 space-y-6">
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h4>
                                    <p className="text-gray-600 mb-1">Available 24/7 for urgent support</p>
                                    <a href="tel:+11234567890" className="text-lg font-semibold text-pink-500 hover:text-red-500 transition-colors">
                                        +1 (123) 456-7890
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Email Us</h4>
                                    <p className="text-gray-600 mb-1">We'll respond within 2 hours</p>
                                    <a href="mailto:support@mindspace.com" className="text-lg font-semibold text-pink-500 hover:text-red-500 transition-colors">
                                        support@mindspace.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Visit Our Office</h4>
                                    <p className="text-gray-600 mb-1">Open Mon-Fri, 9AM-6PM</p>
                                    <address className="text-lg text-gray-700 not-italic leading-relaxed">
                                        123 Wellness Street,<br />
                                        Suite 456, Mindville<br />
                                        MA 01234, USA
                                    </address>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionFive;