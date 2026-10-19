import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, Check, Compass, Layers, Palette, Sparkles, Building2, ShieldCheck, MessageSquare } from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConsultation = () => {
    onClose();
    onOpenConsultation();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 bg-charcoal-deep/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <article
        className="bg-ivory max-w-4xl w-full rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-stone my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Case Study Header Bar */}
        <div className="p-6 sm:p-8 border-b border-stone/50 flex items-center justify-between bg-ivory-warm shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold">
                Digital Design & Creative Direction Case Study
              </span>
              <span className="text-stone-muted">•</span>
              <span className="text-xs font-mono text-charcoal-muted">Gurugram Studio</span>
            </div>
            <h2 id="case-study-title" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal">
              Star Fox Interior — A Cinematic Digital Experience
            </h2>
            <p className="text-xs sm:text-sm font-sans text-charcoal-muted mt-1 font-light max-w-xl">
              Reimagining an interior-design brand through editorial storytelling, architectural imagery, and purposeful motion.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="btn-icon border border-stone-muted/70 text-charcoal hover:bg-charcoal hover:text-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
            aria-label="Close case study"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Case Study Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-12 text-charcoal">

          {/* Project Overview Metadata Box */}
          <section aria-labelledby="cs-overview" className="liquid-glass-subcard p-6 rounded-2xl">
            <h3 id="cs-overview" className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold mb-4">
              Project Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-charcoal-muted block">Client:</span>
                <strong className="text-charcoal font-medium">Star Fox Interior</strong>
              </div>
              <div>
                <span className="text-charcoal-muted block">Studio Location:</span>
                <span className="text-charcoal">M3M Urbana, Gurugram</span>
              </div>
              <div>
                <span className="text-charcoal-muted block">Tech Stack:</span>
                <span className="text-charcoal">React 18, TypeScript, Vite 6</span>
              </div>
              <div>
                <span className="text-charcoal-muted block">Live Status:</span>
                <span className="text-bronze font-medium">Production-Ready Redesign</span>
              </div>
            </div>
          </section>

          {/* 1. The Challenge */}
          <section aria-labelledby="cs-challenge" className="space-y-4">
            <h3 id="cs-challenge" className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              1. The Challenge
            </h3>
            <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
              Prior to the redesign, the online presence of Star Fox Interior was constrained by generic template aesthetics: equal-sized card grids, decorative icon boxes, and dense textual layouts that failed to reflect the bespoke, multi-crore nature of their turnkey luxury residential work in prime Gurugram developments (*Ireo Victory Valley, M3M Golf Estate, Pareena Micasa*).
            </p>
            <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
              The business needed an authoritative digital flag that communicates spatial clarity, architectural craftsmanship, and disciplined turnkey execution to discerning homeowners and corporate clients.
            </p>
          </section>

          {/* 2. Creative Direction */}
          <section aria-labelledby="cs-direction" className="space-y-4">
            <h3 id="cs-direction" className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              2. Architectural Editorial Aesthetic
            </h3>
            <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
              We drew inspiration from international luxury architecture and interior publications, orchestrating a calm, warm-ivory canvas (`#FAF7F2`), deep charcoal typography (`#171615`), and muted brushed bronze accents (`#9E7948`).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="liquid-glass-subcard p-4 rounded-xl">
                <span className="text-xs font-mono uppercase text-bronze font-semibold block mb-1">Color Palette</span>
                <p className="text-xs text-charcoal font-medium">Warm Ivory, Stone Beige, Deep Charcoal & Brushed Bronze</p>
              </div>
              <div className="liquid-glass-subcard p-4 rounded-xl">
                <span className="text-xs font-mono uppercase text-bronze font-semibold block mb-1">Typography</span>
                <p className="text-xs text-charcoal font-medium">Cormorant Garamond (Display) & Plus Jakarta Sans (Interface)</p>
              </div>
              <div className="liquid-glass-subcard p-4 rounded-xl">
                <span className="text-xs font-mono uppercase text-bronze font-semibold block mb-1">Visual Rhythm</span>
                <p className="text-xs text-charcoal font-medium">Rounded Architectural Frames with Optical Insets</p>
              </div>
            </div>
          </section>

          {/* 3. Implemented Architecture */}
          <section aria-labelledby="cs-architecture" className="space-y-4">
            <h3 id="cs-architecture" className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              3. Implemented Customer Journey
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Floating Liquid-Glass Navbar', desc: 'Minimal pill container with frosted glass blur, responsive drawer, and keyboard Escape listener.' },
                { label: 'Cinematic Architectural Hero', desc: 'Above-the-fold project photography with LCP preloading and line-by-line masked reveals.' },
                { label: 'Brand Manifesto & Scroll Reveal', desc: 'Asymmetrical editorial typography with clip-path image reveals celebrating thoughtful design.' },
                { label: 'Horizontal Showcase Portfolio', desc: 'Scroll-linked horizontal track on desktop featuring 6 real projects with deep-dive modal case studies.' },
                { label: 'Editorial Service Chapters', desc: '5 distinct editorial compositions highlighting verified disciplines without repetitive card grids.' },
                { label: 'Craftsmanship & Materiality Matrix', desc: 'Tactile stone, wood joinery, and textiles paired with verified brand partners (CenturyPly, Hettich, Action TESA).' },
                { label: 'The Five-Stage Design Journey', desc: 'Disciplined methodology from lifestyle discovery and 3D modeling to white-glove handover.' },
                { label: 'Substantiated Social Proof', desc: 'Real client experiences from Ireo Victory Valley and M3M Golf Estate with zero fabricated ratings.' },
                { label: 'Qualified Consultation Form', desc: 'Clean, accessible inquiry form with configurable budget ranges and direct WhatsApp brief transmission.' }
              ].map((item, idx) => (
                <div key={idx} className="liquid-glass-subcard flex items-start gap-3 p-3 rounded-xl">
                  <Check size={15} className="text-bronze shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-serif text-charcoal font-medium block">{item.label}</strong>
                    <span className="text-xs text-charcoal-muted font-light">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Performance & Technical Metrics */}
          <section aria-labelledby="cs-tech" className="space-y-4">
            <h3 id="cs-tech" className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              4. Technical Implementation & Performance
            </h3>
            <div className="p-5 rounded-2xl bg-[#141210] text-[#E8DFD5] space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-champagne block">
                Production Bundle Diagnostics (Vite 6)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone block">Gzipped Bundle:</span>
                  <strong className="text-ivory text-sm">~87.4 kB Combined</strong>
                </div>
                <div>
                  <span className="text-stone block">LCP Optimization:</span>
                  <span className="text-ivory">Hero image preloaded with high priority</span>
                </div>
                <div>
                  <span className="text-stone block">Accessibility:</span>
                  <span className="text-ivory">WCAG AA Compliant with focus rings</span>
                </div>
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="pt-6 border-t border-stone/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif text-xl font-medium text-charcoal">Discuss a bespoke project</p>
              <p className="text-xs text-charcoal-muted font-light">Schedule a private dialogue at M3M Urbana, Gurugram.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleConsultation}
                className="btn-champagne text-xs !py-3 !px-6 shadow-md w-full sm:w-auto justify-center"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight size={14} />
              </button>

              <a
                href="https://wa.me/919999395911"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs !py-3 !px-5 gap-2 w-full sm:w-auto justify-center"
              >
                <MessageSquare size={14} className="text-bronze" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
};

export default CaseStudyModal;
