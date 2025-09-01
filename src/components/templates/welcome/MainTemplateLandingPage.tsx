'use client'

// Component
import NavbarLandingPage from './NavbarLandingPage';
import Footer from './FooterLandingPage';
import SectionFour from './section/SectionFour';
import SectionOne from './section/SectionOne';
import SectionThree from './section/SectionThree';
import SectionTwo from './section/SectionTwo';
import SectionFive from './section/SectionFive';
import { useEffect, useRef, useState } from 'react';

const MainTemplateLandingPage = () => {
    const [activeSection, setActiveSection] = useState('hero');

    const sectionRefs = {
        hero: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        services: useRef<HTMLDivElement>(null),
        therapists: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // 50% dari section terlihat
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const currentRefs = {
            hero: sectionRefs.hero.current,
            about: sectionRefs.about.current,
            services: sectionRefs.services.current,
            therapists: sectionRefs.therapists.current,
            contact: sectionRefs.contact.current,
        };

        Object.values(currentRefs).forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            Object.values(currentRefs).forEach(ref => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
            {/* Navigation */}
            <NavbarLandingPage activeSection={activeSection} />

            {/* Hero Section */}
            <div id="hero" ref={sectionRefs.hero}>
                <SectionOne />
            </div>

            {/* About Section */}
            <div id="about" ref={sectionRefs.about}>
                <SectionTwo />
            </div>

            {/* Service Section */}
            <div id="services" ref={sectionRefs.services}>
                <SectionThree />
            </div>

            {/* Therapies Section */}
            <div id="therapists" ref={sectionRefs.therapists}>
                <SectionFour />
            </div>

            {/* Contact Section */}
            <div id="contact" ref={sectionRefs.contact}>
                <SectionFive />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainTemplateLandingPage;