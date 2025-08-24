'use client'

// Component
import NavbarLandingPage from './NavbarLandingPage';
import Footer from './FooterLandingPage';
import SectionFour from './section/SectionFour';
import SectionOne from './section/SectionOne';
import SectionThree from './section/SectionThree';
import SectionTwo from './section/SectionTwo';
import SectionFive from './section/SectionFive';

const MainTemplateLandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
            {/* Navigation */}
            <NavbarLandingPage />

            {/* Hero Section */}
            <SectionOne />

            {/* About Section */}
            <SectionTwo />

            {/* Service Section */}
            <SectionThree />

            {/* Therapies Section */}
            <SectionFour />

            {/* Contact Section */}
            <SectionFive />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainTemplateLandingPage;