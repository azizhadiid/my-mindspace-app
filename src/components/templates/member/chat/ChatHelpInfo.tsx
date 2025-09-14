'use client'

// components/chat/ChatHelpInfo.tsx
import React from 'react';
import { Shield } from 'lucide-react';

const ChatHelpInfo: React.FC = () => {
    return (
        <div className="mt-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Shield className="h-5 w-5 text-pink-500 mr-2" />
                How can our admin team help you?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                    <ul className="space-y-2">
                        <li>• Account and subscription questions</li>
                        <li>• Technical support</li>
                        <li>• Billing inquiries</li>
                    </ul>
                </div>
                <div>
                    <ul className="space-y-2">
                        <li>• Feature requests</li>
                        <li>• General platform guidance</li>
                        <li>• Report issues or bugs</li>
                    </ul>
                </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg border border-rose-200">
                <p className="text-xs text-gray-500">
                    <strong>Response Time:</strong> Our admin team typically responds within 15-30 minutes during business hours (9 AM - 6 PM).
                </p>
            </div>
        </div>
    );
};

export default ChatHelpInfo;