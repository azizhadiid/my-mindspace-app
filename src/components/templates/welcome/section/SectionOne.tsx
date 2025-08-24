'use client'

import { Heart, Shield, Users } from 'lucide-react'

const SectionOne = () => {
    return (
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-pink-200/30 to-red-200/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-200/20 to-pink-200/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center space-x-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-2 mb-6">
                            <Heart className="w-4 h-4 text-pink-500" />
                            <span className="text-sm font-medium text-pink-700">
                                Professional Mental Health Support
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            <span className="text-gray-900">Your Journey to</span>
                            <br />
                            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                Mental Wellness
                            </span>
                            <br />
                            <span className="text-gray-900">Starts Here</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Connect with licensed therapists and mental health professionals through our secure,
                            accessible platform. Take the first step towards a healthier, happier you.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold">
                                Start Free Consultation
                            </button>
                            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-pink-300 hover:text-pink-500 transition-all duration-300 text-lg font-semibold backdrop-blur-sm bg-white/50">
                                Learn More
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
                            <div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">10K+</div>
                                <div className="text-sm text-gray-600">Happy Clients</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
                                <div className="text-sm text-gray-600">Licensed Therapists</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
                                <div className="text-sm text-gray-600">Support Available</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Element */}
                    <div className="relative">
                        <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-rose-100">
                            {/* Mock Chat Interface */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Dr. Sarah Johnson</div>
                                        <div className="text-sm text-gray-600">Licensed Therapist</div>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="space-y-3">
                                    <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
                                        <p className="text-sm text-gray-800">
                                            Hi! I'm here to support you on your mental health journey. How are you feeling today?
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-3 max-w-xs ml-auto">
                                        <p className="text-sm">
                                            Thank you for being here. I'm ready to start this conversation.
                                        </p>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="flex items-center justify-center space-x-2 mt-6 p-3 bg-green-50 rounded-xl">
                                    <Shield className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-700 font-medium">
                                        End-to-end encrypted & HIPAA compliant
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-xl opacity-20 blur-sm"></div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-20 blur-sm"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionOne;