import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Sparkles, Compass, Check, ShieldCheck, Sun, Layers, Feather, Eye } from 'lucide-react';
import { MATERIAL_CHAPTERS, BRAND_PARTNERS, MaterialEditorialChapter } from '../data/materialsData';

interface CraftsmanshipSectionProps {
  onOpenConsultation: () => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({ onOpenConsultation }) => {
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const [revealedChapters, setRevealedChapters] = useState<Record<string, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsHeaderRevealed(true);
      const all: Record<string, boolean> = {};
      MATERIAL_CHAPTERS.forEach((c) => { all[c.id] = true; });
      setRevealedChapters(all);
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsHeaderRevealed(true);
        const all: Record<string, boolean> = {};
        MATERIAL_CHAPTERS.forEach((c) => { all[c.id] = true; });
        setRevealedChapters(all);
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderRevealed(true);
          }
        });
      },
      { threshold: 0.08 }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-chapter-id');
            if (id) {
              setRevealedChapters((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    chaptersRef.current.forEach((el) => {
      if (el) chapterObserver.observe(el);
    });

    return () => {
      headerObserver.disconnect();
      chapterObserver.disconnect();
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <section
      id="craftsmanship"
      className="scroll-mt-20 sm:scroll-mt-24 py-24 sm:py-32 lg:py-40 bg-ivory-warm text-charcoal relative overflow-hidden border-t border-stone/50"
      aria-label="Star Fox Interior Craftsmanship, Materials, and Architectural Detailing"
    >
      {/* Restrained subtle stone grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.75px,transparent_0.75px)] [background-size:64px_64px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ====================================================================
            2. SECTION INTRODUCTION
            ==================================================================== */}
        <div ref={headerRef} className="max-w-4xl mb-24 sm:mb-32">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-eyebrow font-sans text-xs tracking-[0.2em] sm:tracking-[0.28em] font-semibold text-bronze uppercase">
              THE ART OF DETAIL
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-charcoal leading-[1.08] sm:leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-800 ease-out"
                style={{
                  transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                  transitionDuration: '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                Luxury lives in
              </span>
            </span>
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-800 ease-out italic font-normal text-bronze"
                style={{
                  transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                  transitionDuration: '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '0.18s'
                }}
              >
                the details.
              </span>
            </span>
          </h2>


          <p
            className="font-sans text-charcoal-muted text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl transition-all duration-700 ease-out"
            style={{
              opacity: isHeaderRevealed || prefersReducedMotion ? 1 : 0,
              transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '0.35s'
            }}
          >
            Every material, surface, and finish contributes to how a space looks, feels, and lives over time.
          </p>
        </div>

        {/* ====================================================================
            3 & 4. MATERIAL STORYTELLING & EDITORIAL LAYOUT SEQUENCE
            ==================================================================== */}
        <div className="space-y-32 sm:space-y-40 lg:space-y-48">

          {/* ------------------------------------------------------------------
              SEQUENCE 01: OVERSIZED ARCHITECTURAL MATERIAL PHOTOGRAPH (NATURAL STONE)
              ------------------------------------------------------------------ */}
          {(() => {
            const chapter = MATERIAL_CHAPTERS[0];
            const isRevealed = revealedChapters[chapter.id] || prefersReducedMotion;

            return (
              <article
                key={chapter.id}
                data-chapter-id={chapter.id}
                ref={(el) => (chaptersRef.current[0] = el)}
                className={`transition-all duration-1000 ease-out ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'
                }`}
              >
                {/* Chapter Meta */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-stone/60">
                  <div>
                    <span className="font-mono text-xs text-bronze uppercase tracking-widest block mb-1">
                      {chapter.discipline}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                      {chapter.title}
                    </h3>
                  </div>
                  <p className="font-mono text-xs text-charcoal-muted uppercase tracking-wider">
                    {chapter.sourcingNote}
                  </p>
                </div>

                {/* Oversized Architectural Photograph Container */}
                <div className="arch-frame min-h-[320px] sm:min-h-0 aspect-auto sm:aspect-[16/10] lg:aspect-[21/10] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden relative group bg-stone">
                  <img
                    src={chapter.image}
                    alt={chapter.headline}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal-deep/30 to-transparent opacity-80" />

                  {/* Overlaid Editorial Footprint */}
                  <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 right-5 sm:right-10 z-10 text-ivory flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-full bg-ivory/15 backdrop-blur-md border border-champagne-gold/30 text-champagne text-xs font-mono uppercase tracking-wider sm:tracking-widest mb-2.5 sm:mb-3 min-w-0">
                        <Sparkles size={12} className="shrink-0" />
                        <span className="truncate">Tactile Texture • Honed Architectural Polish</span>
                      </div>
                      <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-ivory mb-2 leading-tight">
                        {chapter.headline}
                      </h4>
                      <p className="font-sans text-stone/90 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                        {chapter.leadCopy}
                      </p>
                    </div>

                    <div className="text-right hidden sm:block shrink-0">
                      <span className="text-xs font-mono uppercase tracking-widest text-champagne block">
                        Surface Execution
                      </span>
                      <span className="text-xs text-stone font-medium">Zero Artificial Glare / Low Lustre</span>
                    </div>
                  </div>
                </div>

                {/* Narrative & Tactile Attributes Grid */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7">
                    <p className="font-sans text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
                      {chapter.narrative}
                    </p>
                  </div>
                  <div className="lg:col-span-5 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-charcoal font-semibold block">
                      Architectural Stone Disciplines:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {chapter.tactileAttributes.map((attr, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-charcoal-muted">
                          <Check size={13} className="text-bronze shrink-0" />
                          <span>{attr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* ------------------------------------------------------------------
              SEQUENCE 02: SPLIT LAYOUT WITH LARGE TYPOGRAPHY & CLOSE-UP (WOOD & JOINERY)
              ------------------------------------------------------------------ */}
          {(() => {
            const chapter = MATERIAL_CHAPTERS[1];
            const isRevealed = revealedChapters[chapter.id] || prefersReducedMotion;

            return (
              <article
                key={chapter.id}
                data-chapter-id={chapter.id}
                ref={(el) => (chaptersRef.current[1] = el)}
                className={`transition-all duration-1000 ease-out ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  {/* Left Column: Large Editorial Typography & Narrative */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-bronze uppercase tracking-widest">
                        {chapter.discipline}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-[1.1] tracking-[-0.015em]">
                      Warm Grain Nuances & <br />
                      <span className="italic font-normal text-bronze">Millimeter Craft</span>
                    </h3>

                    <p className="font-sans text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
                      {chapter.narrative}
                    </p>

                    <div className="liquid-glass-subcard p-5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-charcoal font-semibold">
                        <Layers size={13} className="text-bronze" />
                        <span>Tactile Joinery Attributes:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {chapter.tactileAttributes.map((attr, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-charcoal-muted">
                            <Check size={13} className="text-bronze shrink-0 mt-0.5" />
                            <span>{attr}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-charcoal-muted font-mono">
                      <Compass size={13} className="text-bronze" />
                      <span>{chapter.sourcingNote}</span>
                    </div>
                  </div>

                  {/* Right Column: Close-up Wood Joinery Frame */}
                  <div className="lg:col-span-6">
                    <div className="arch-frame aspect-[4/5] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone">
                      <img
                        src={chapter.image}
                        alt="Wood and Joinery Craftsmanship"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/70 via-transparent to-transparent opacity-60" />

                      {/* Editorial Stamp */}
                      <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl liquid-glass-badge-panel text-charcoal">
                        <span className="text-xs font-mono uppercase tracking-wider text-bronze font-semibold block mb-0.5">
                          In-House Woodworking Workshop
                        </span>
                        <p className="text-xs text-charcoal-muted font-light leading-snug">
                          Custom milled at our dedicated atelier in Gurugram to fit room dimensions without showroom compromise.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* ------------------------------------------------------------------
              SEQUENCE 03: OFFSET ASYMMETRICAL COMPOSITION WITH EDITORIAL LABELS (FABRICS)
              ------------------------------------------------------------------ */}
          {(() => {
            const chapter = MATERIAL_CHAPTERS[2];
            const isRevealed = revealedChapters[chapter.id] || prefersReducedMotion;

            return (
              <article
                key={chapter.id}
                data-chapter-id={chapter.id}
                ref={(el) => (chaptersRef.current[2] = el)}
                className={`transition-all duration-1000 ease-out ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Asymmetrical Photography with Micro-Labels */}
                  <div className="lg:col-span-7 relative">
                    <div className="arch-frame aspect-[16/11] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone">
                      <img
                        src={chapter.image}
                        alt="Tactile Fabrics and Soft Textures"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/70 via-transparent to-transparent opacity-60" />

                      {/* Floating Tactile Label A */}
                      <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-2.5rem)] px-3 py-1.5 rounded-full liquid-glass-pill flex items-center gap-1.5 text-xs font-mono text-charcoal min-w-0">
                        <Feather size={12} className="text-bronze shrink-0" />
                        <span className="truncate">Looped Wool Bouclé • Northern Mills</span>
                      </div>

                      {/* Floating Tactile Label B */}
                      <div className="absolute bottom-5 right-5 z-10 px-3 py-1.5 rounded-full bg-charcoal-deep/85 backdrop-blur-md border border-white/10 shadow-sm flex items-center gap-1.5 text-xs font-mono text-champagne hidden sm:flex">
                        <Sun size={12} className="text-champagne" />
                        <span>Organic Daylight Interplay</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Editorial Narrative & Acoustic Notes */}
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <span className="font-mono text-xs text-bronze uppercase tracking-widest block mb-1">
                        {chapter.discipline}
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal leading-tight">
                        {chapter.title}
                      </h3>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-bronze mt-1">
                        {chapter.headline}
                      </p>
                    </div>

                    <p className="font-sans text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
                      {chapter.narrative}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-stone/50">
                      <p className="text-xs font-mono uppercase tracking-widest text-charcoal font-semibold">
                        Acoustic & Soft Textures:
                      </p>
                      <div className="space-y-1.5">
                        {chapter.tactileAttributes.map((attr, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-charcoal-muted">
                            <Check size={13} className="text-bronze shrink-0 mt-0.5" />
                            <span>{attr}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-charcoal-muted font-light italic">
                      "Fabrics modulate room reverberation, softening harsh daylight into a calm residential sanctuary."
                    </p>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* ------------------------------------------------------------------
              SEQUENCE 04: RESTRAINED FULL-WIDTH ARCHITECTURAL TRANSITION (METALS & HARDWARE)
              ------------------------------------------------------------------ */}
          {(() => {
            const chapter = MATERIAL_CHAPTERS[3];
            const isRevealed = revealedChapters[chapter.id] || prefersReducedMotion;

            return (
              <article
                key={chapter.id}
                data-chapter-id={chapter.id}
                ref={(el) => (chaptersRef.current[3] = el)}
                className={`rounded-3xl overflow-hidden border border-[#3C2D24] bg-[#231A15] text-[#E8DFD5] shadow-2xl relative group transition-all duration-1000 ease-out ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'
                }`}
              >
                <div className="relative min-h-[360px] xs:min-h-[340px] sm:min-h-0 aspect-auto sm:aspect-[16/10] lg:aspect-[21/9] w-full overflow-hidden bg-stone">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 opacity-90"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231A15] via-[#231A15]/60 to-[#231A15]/20" />

                  {/* Overlaid Editorial Header */}
                  <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 right-5 sm:right-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 text-[#E8DFD5]">
                    <div className="max-w-2xl">
                      <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-full bg-ivory/15 backdrop-blur-md border border-champagne-gold/30 text-champagne text-xs font-mono uppercase tracking-wider sm:tracking-widest mb-2.5 sm:mb-3 min-w-0">
                        <Sparkles size={12} className="shrink-0" />
                        <span className="truncate">{chapter.discipline} • Precision Anodized Bronze</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-ivory mb-1.5 sm:mb-2 leading-tight">
                        {chapter.headline}
                      </h3>
                      <p className="font-sans text-stone/90 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                        {chapter.narrative}
                      </p>
                    </div>

                    <div className="text-right hidden sm:block shrink-0">
                      <span className="text-xs font-mono uppercase tracking-widest text-champagne block">
                        Hardware Sourcing
                      </span>
                      <span className="text-xs text-stone font-medium">Hettich & Hafele Concealed Systems</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Architectural Specification Bar */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1E1713] border-t border-[#3C2D24]">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-champagne font-semibold mb-2">
                      Precision Metal Craftsmanship
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {chapter.tactileAttributes.map((attr, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#C5B8A8]">
                          <Check size={13} className="text-champagne shrink-0 mt-0.5" />
                          <span>{attr}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-champagne font-semibold mb-2">
                      Architectural Placement
                    </p>
                    <p className="text-xs text-[#C5B8A8] leading-relaxed font-light">
                      {chapter.architecturalApplication}
                    </p>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* ------------------------------------------------------------------
              SEQUENCE 05: LIGHTING & SHADOW + FINAL CRAFTSMANSHIP CLOSING STATEMENT
              ------------------------------------------------------------------ */}
          {(() => {
            const chapter = MATERIAL_CHAPTERS[4];
            const isRevealed = revealedChapters[chapter.id] || prefersReducedMotion;

            return (
              <article
                key={chapter.id}
                data-chapter-id={chapter.id}
                ref={(el) => (chaptersRef.current[4] = el)}
                className={`transition-all duration-1000 ease-out ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
                  {/* Left Column: Architectural Shadow & Light Imagery */}
                  <div className="lg:col-span-6">
                    <div className="arch-frame aspect-[4/3] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone">
                      <img
                        src={chapter.image}
                        alt="Architectural Lighting and Shadow"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/75 via-transparent to-transparent opacity-60" />

                      <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl liquid-glass-badge-panel text-charcoal">
                        <span className="text-xs font-mono uppercase tracking-wider text-bronze font-semibold block mb-0.5">
                          2700K Warm Spectrum
                        </span>
                        <p className="text-xs text-charcoal-muted font-light leading-snug">
                          Sculpting architectural depth, framing stone textures, and creating evening visual calm.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Narrative on Spatial Atmosphere */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <span className="font-mono text-xs text-bronze uppercase tracking-widest block mb-1">
                        {chapter.discipline}
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal leading-tight">
                        {chapter.headline}
                      </h3>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-bronze mt-1">
                        Atmospheric Illumination & Depth
                      </p>
                    </div>

                    <p className="font-sans text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
                      {chapter.narrative}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone/50">
                      {chapter.tactileAttributes.map((attr, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-charcoal-muted">
                          <Check size={13} className="text-bronze shrink-0 mt-0.5" />
                          <span>{attr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Closing Craftsmanship Statement Banner */}
                <div className="p-8 sm:p-12 lg:p-16 rounded-3xl liquid-glass-card text-center max-w-4xl mx-auto space-y-6">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-bronze font-semibold block">
                    THE STAR FOX STANDARD
                  </span>

                  <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-relaxed italic">
                    "True luxury is not loud ornament; it is the quiet harmony of considered materials, millimeter proportions, and enduring execution."
                  </blockquote>

                  <p className="font-sans text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto font-light leading-relaxed">
                    We invite you to touch, examine, and feel every material sample at our design studio in M3M Urbana, Gurugram.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onOpenConsultation}
                      className="btn-primary text-xs sm:text-sm !py-3 !px-8 group shadow-md"
                    >
                      <span>Schedule Studio Material Review</span>
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })()}

        </div>

        {/* ====================================================================
            VERIFIED INSTITUTIONAL BRAND PARTNERS
            ==================================================================== */}
        <div className="mt-28 sm:mt-36 pt-16 border-t border-stone/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold block mb-2">
              Tested Core Materials
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              Engineered With Verified Institutional Partners
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-2 font-light">
              Every carcass, hinge, and panel is built using certified, war-tested materials backed by direct brand warranties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="p-6 rounded-2xl liquid-glass-card liquid-glass-interactive flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 flex items-center mb-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-9 max-w-[140px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  <h5 className="font-serif text-lg font-medium text-charcoal mb-1">
                    {partner.name}
                  </h5>
                  <p className="text-xs font-mono text-bronze uppercase tracking-wider mb-2">
                    {partner.category}
                  </p>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                    {partner.relationship}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CraftsmanshipSection;
