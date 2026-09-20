import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import IntroSection from './components/IntroSection';
import ProjectHighlights from './components/ProjectHighlights';
import ResidencesSection from './components/ResidencesSection';
import AmenitiesSection from './components/AmenitiesSection';
import NatureLifestyle from './components/NatureLifestyle';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import SustainabilitySection from './components/SustainabilitySection';
import FinalCTA from './components/FinalCTA';
import EnquiryModal from './components/EnquiryModal';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';

export default function App() {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [selectedResidenceTitle, setSelectedResidenceTitle] = useState('');

  const handleOpenEnquire = (residenceTitle = '') => {
    setSelectedResidenceTitle(residenceTitle);
    setEnquireOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-sans">
      {/* Fixed Navigation Header */}
      <Navbar
        onOpenEnquire={() => handleOpenEnquire()}
        onSelectResidence={(title) => handleOpenEnquire(title)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 01 HERO — 300 Frame Scroll Canvas Build Sequence */}
        <HeroCanvas onOpenEnquire={() => handleOpenEnquire()} />

        {/* 02 PHILOSOPHICAL INTRO — Editorial Layout */}
        <IntroSection />

        {/* 03 PROJECT HIGHLIGHTS — Key Metrics */}
        <ProjectHighlights />

        {/* 04 RESIDENCES — Showcase & Floorplan Blueprints */}
        <ResidencesSection onOpenEnquire={(title) => handleOpenEnquire(title)} />

        {/* 05 AMENITIES — Resort Facilities Showcase */}
        <AmenitiesSection />

        {/* 06 NATURE & LIFESTYLE — Immersive Parallax & Soundscape */}
        <NatureLifestyle />

        {/* 07 GALLERY — Asymmetric Editorial Portfolio */}
        <GallerySection />

        {/* 08 LOCATION — Interactive Destinations & Distance Map */}
        <LocationSection />

        {/* 09 SUSTAINABILITY — Environmental Engineering */}
        <SustainabilitySection />

        {/* 10 FINAL CTA — Architectural Conclusion */}
        <FinalCTA onOpenEnquire={() => handleOpenEnquire()} />
      </main>

      {/* Luxury Footer */}
      <Footer onOpenEnquire={() => handleOpenEnquire()} />

      {/* Global Concierge Booking Modal */}
      <EnquiryModal
        isOpen={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        initialResidence={selectedResidenceTitle}
      />

      {/* Persistent Background Music Controller */}
      <BackgroundMusic />
    </div>
  );
}
