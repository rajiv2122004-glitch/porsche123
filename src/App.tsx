import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModelGallery } from './components/ModelGallery';
import { ModelDetailModal } from './components/ModelDetailModal';
import { CompareModal } from './components/CompareModal';
import { IndiaPricing } from './components/IndiaPricing';
import { Porsche3DExperience } from './components/Porsche3DExperience';
import { PerformanceSection } from './components/PerformanceSection';
import { HeritageTimeline } from './components/HeritageTimeline';
import { TestDriveBooking } from './components/TestDriveBooking';
import { Footer } from './components/Footer';
import { PorscheModel } from './types/porsche';
import { PORSCHE_MODELS } from './data/porscheModels';

export default function App() {
  const [selectedModel, setSelectedModel] = useState<PorscheModel | null>(null);
  const [comparingModel, setComparingModel] = useState<PorscheModel | null>(null);
  const [testDriveTargetModel, setTestDriveTargetModel] = useState<PorscheModel | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookModel = (model: PorscheModel) => {
    setTestDriveTargetModel(model);
    scrollToSection('test-drive');
  };

  const handleOpenTestDriveSection = () => {
    scrollToSection('test-drive');
  };

  const handleStartComparison = (model: PorscheModel) => {
    setSelectedModel(null);
    setComparingModel(model);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-[#f3f3f5] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#d50000] selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenTestDrive={handleOpenTestDriveSection} />

      {/* 2. Cinematic Hero Section */}
      <Hero
        onExploreModels={() => scrollToSection('models')}
        onBookTestDrive={handleOpenTestDriveSection}
      />

      {/* 3. Porsche Car Collection – 7 Models */}
      <ModelGallery
        onSelectModel={(model) => setSelectedModel(model)}
        onBookModel={handleBookModel}
      />

      {/* 4. Dedicated India Pricing Section */}
      <IndiaPricing
        onSelectModel={(model) => setSelectedModel(model)}
        onBookModel={handleBookModel}
        onCompare={handleStartComparison}
      />

      {/* 5. Interactive 3D Car Experience */}
      <Porsche3DExperience />

      {/* 6. Porsche Performance Section */}
      <PerformanceSection />

      {/* 8. Porsche Heritage Section */}
      <HeritageTimeline />

      {/* 7. Book a Test Drive Section */}
      <TestDriveBooking preselectedModel={testDriveTargetModel} />

      {/* 11. Footer */}
      <Footer />

      {/* Modal: Deep Model Inspection */}
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
          onBookTestDrive={handleBookModel}
          onCompare={handleStartComparison}
        />
      )}

      {/* Modal: Comparative Analysis */}
      {comparingModel && (
        <CompareModal
          initialModel={comparingModel}
          onClose={() => setComparingModel(null)}
          onBookTestDrive={handleBookModel}
        />
      )}
    </div>
  );
}
