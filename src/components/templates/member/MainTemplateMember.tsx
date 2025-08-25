'use client'

import { ReactNode } from "react";

// Component
import Footer from "../welcome/FooterLandingPage";
import NavabrMember from "./NavbarMember";

interface MainTemplateMemberProps {
    children: ReactNode;
}

const MainTemplateMember = ({ children }: MainTemplateMemberProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
            {/* Navigation */}
            <NavabrMember />

            {children}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainTemplateMember;