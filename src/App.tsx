import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandManifesto } from './components/BrandManifesto';
import { HorizontalPortfolio } from './components/HorizontalPortfolio';
import { EditorialServices } from './components/EditorialServices';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { DesignProcess } from './components/DesignProcess';
import { TestimonialsAndCredentials } from './components/TestimonialsAndCredentials';
import { ConsultationSection } from './components/ConsultationSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ScrollProgress } from './components/ScrollProgress';
import { Project } from './data/projectsData';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  // Align to URL hash on initial load or reload once layout and ScrollTrigger pin spacers stabilize
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const timer = setTimeout(() => {
        try {
          const rawHash = window.location.hash;
          if (rawHash && rawHash.length > 1) {
            const cleanId = rawHash.replace(/^#/, '');
            const el = document.getElementById(cleanId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        } catch (e) {
          console.warn('Hash navigation safe fallback:', e);
        }
      }, 450);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToConsultation = () => {
    const el = document.querySelector('#contact') || document.querySelector('#consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToPortfolio = () => {
    const el = document.querySelector('#portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans relative selection:bg-champagne selection:text-charcoal-deep">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Liquid-Glass Navigation */}
      <Navbar onOpenConsultation={scrollToConsultation} />

      {/* 1. Cinematic Hero Section */}
      <Hero
        onExploreWork={scrollToPortfolio}
        onBookConsultation={scrollToConsultation}
      />

      {/* 2. Brand Manifesto with Oversized Typography & Reveals */}
      <BrandManifesto />

      {/* 3. Selected Projects Horizontal Cinematic Portfolio */}
      <HorizontalPortfolio onSelectProject={(project) => setSelectedProject(project)} />

      {/* 4. Interior Services as Editorial Chapters */}
      <EditorialServices onBookConsultation={scrollToConsultation} />

      {/* 5. Craftsmanship & Materiality Matrix */}
      <CraftsmanshipSection onOpenConsultation={scrollToConsultation} />

      {/* 6. Clear Design-and-Execution Process */}
      <DesignProcess onOpenConsultation={scrollToConsultation} />

      {/* 7 & 8. Client Testimonials & Substantiated Credentials */}
      <TestimonialsAndCredentials onOpenConsultation={scrollToConsultation} />

      {/* 9. Refined Consultation Section with Functional Enquiry Form */}
      <ConsultationSection />

      {/* 10. Elegant Editorial Footer */}
      <Footer
        onOpenConsultation={scrollToConsultation}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
      />

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookConsultation={scrollToConsultation}
      />

      {/* Interactive Architectural Design Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        onBookConsultation={scrollToConsultation}
      />

      {/* Persistent WhatsApp Floating Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default App;
