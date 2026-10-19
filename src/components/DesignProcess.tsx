import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Check, Sparkles, Compass, Layers, Palette, Hammer, KeyRound } from 'lucide-react';

interface DesignProcessProps {
  onOpenConsultation: () => void;
}

interface ProcessStage {
  stageNumber: string;
  stageName: string;
  title: string;
  lead: string;
  explanation: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const DesignProcess: React.FC<DesignProcessProps> = ({ onOpenConsultation }) => {
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const [revealedStages, setRevealedStages] = useState<Record<string, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);

  const STAGES: ProcessStage[] = [
    {
      stageNumber: '01',
      stageName: 'STAGE 01 — DISCOVER',
      title: 'Understanding Your Vision',
      lead: 'A considered dialogue mapping your lifestyle, spatial priorities, and architectural aspirations.',
      explanation: 'We begin with an in-depth design conversation at our M3M Urbana studio or at your residence. Our team listens closely to how your family lives, entertains, works, and rests — auditing architectural plans to identify spatial opportunities and establish an intentional project brief.',
      deliverables: [
        'Spatial & Lifestyle Requirements Mapping',
        'Architectural Floor Plan Review',
        'Project Scope & Feasibility Clarity'
      ],
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85',
      imageAlt: 'Interior design spatial planning and consultation review',
      icon: Compass
    },
    {
      stageNumber: '02',
      stageName: 'STAGE 02 — DESIGN',
      title: 'Shaping the Concept',
      lead: 'Translating your aspirations into photorealistic 3D visualization and millimeter layouts.',
      explanation: 'Our design studio develops comprehensive spatial layouts, circulation flow diagrams, and photorealistic 3D perspectives. We refine room proportions, custom millwork elevations, false ceiling coves, and circadian lighting zones before any physical work begins.',
      deliverables: [
        'Photorealistic 3D Architectural Perspectives',
        'Electrical, Plumbing & HVAC Schematics',
        'Itemized Scope & Bill of Quantities'
      ],
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1400&q=85',
      imageAlt: '3D spatial interior concept and architectural visualization',
      icon: Layers
    },
    {
      stageNumber: '03',
      stageName: 'STAGE 03 — SELECT',
      title: 'Materials and Finishes',
      lead: 'Evaluating physical textures under natural light for cohesive tactile harmony.',
      explanation: 'We review physical material palettes together — touching honed Italian marble slabs, open-grain smoked European oak veneers, looped Belgian bouclé upholstery, and brushed champagne bronze metal trims. Every sample is tested against directional daylight to ensure seamless aesthetic balance.',
      deliverables: [
        'Curated Physical Material & Finish Board',
        'Certified Institutional Hardware Sourcing',
        'Fabric, Veneer & Paint Color Harmonization'
      ],
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=85',
      imageAlt: 'Tactile natural stone, timber, and architectural finish selection',
      icon: Palette
    },
    {
      stageNumber: '04',
      stageName: 'STAGE 04 — EXECUTE',
      title: 'Bringing the Design to Life',
      lead: 'Precision off-site fabrication combined with disciplined on-site civil engineering.',
      explanation: 'Execution proceeds with single-source accountability. Modular cabinetry and custom furniture are precision-machined in a controlled factory environment to eliminate on-site dust. Simultaneously, resident site supervisors direct civil masonry, plumbing, electrical, and surface finishing.',
      deliverables: [
        'Off-Site Precision Joinery Fabrication',
        'Dedicated On-Site Resident Engineer',
        'Multi-Point Civil & MEP Quality Inspections'
      ],
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1400&q=85',
      imageAlt: 'Handcrafted furniture and precision joinery execution',
      icon: Hammer
    },
    {
      stageNumber: '05',
      stageName: 'STAGE 05 — HANDOVER',
      title: 'Ready to Feel Like Home',
      lead: 'A meticulous snagging audit and deep cleaning before welcoming you to your new sanctuary.',
      explanation: 'Before handover, our senior team conducts a comprehensive 120-point quality audit covering soft-close hinge dampeners, surface sealants, illumination channels, and joint alignments. After professional deep cleaning, we present a completely finished residence ready for living.',
      deliverables: [
        'Comprehensive 120-Point Snag Audit Clearance',
        'Professional White-Glove Deep Cleaning',
        'Care Manuals & Official Handover Walkthrough'
      ],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      imageAlt: 'Completed luxury interior ready for move-in and handover',
      icon: KeyRound
    }
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsHeaderRevealed(true);
      const all: Record<string, boolean> = {};
      STAGES.forEach((s) => { all[s.stageNumber] = true; });
      setRevealedStages(all);
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsHeaderRevealed(true);
        const all: Record<string, boolean> = {};
        STAGES.forEach((s) => { all[s.stageNumber] = true; });
        setRevealedStages(all);
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

    const stageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-stage-number');
            if (id) {
              setRevealedStages((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    stageRefs.current.forEach((el) => {
      if (el) stageObserver.observe(el);
    });

    return () => {
      headerObserver.disconnect();
      stageObserver.disconnect();
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <section
      id="process"
      className="scroll-mt-20 sm:scroll-mt-24 py-24 sm:py-32 lg:py-40 bg-ivory text-charcoal relative overflow-hidden border-t border-stone/50"
      aria-label="Star Fox Interior Design and Execution Customer Journey"
    >
      {/* Subtle architectural dot-grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.75px,transparent_0.75px)] [background-size:64px_64px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ====================================================================
            2. SECTION INTRODUCTION
            ==================================================================== */}
        <div ref={headerRef} className="max-w-3xl mb-24 sm:mb-32">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-eyebrow font-sans text-xs tracking-[0.2em] sm:tracking-[0.28em] font-semibold text-bronze uppercase">
              OUR PROCESS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal leading-[1.08] tracking-[-0.015em] mb-6">
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-800 ease-out"
                style={{
                  transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                  transitionDuration: '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                From the first idea
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
                to the final detail.
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
            A considered process brings clarity to every decision, helping transform an initial vision into a thoughtfully designed space.
          </p>
        </div>

        {/* ====================================================================
            3 & 4. FIVE EDITORIAL PROCESS STAGES (SPACIOUS VERTICAL TIMELINE)
            ==================================================================== */}
        <div className="relative">
          {/* Subtle connecting vertical line on desktop */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-12 bottom-20 w-px bg-stone/70 pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-28 sm:space-y-36 lg:space-y-44">
            {STAGES.map((stage, index) => {
              const isEven = index % 2 === 1; // Stage 02, Stage 04
              const isRevealed = revealedStages[stage.stageNumber] || prefersReducedMotion;
              const Icon = stage.icon;

              return (
                <article
                  key={stage.stageNumber}
                  data-stage-number={stage.stageNumber}
                  ref={(el) => (stageRefs.current[index] = el)}
                  className={`relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center transition-all duration-1000 ease-out ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'
                  }`}
                >
                  {/* Timeline Node Center Badge (Desktop) */}
                  <div
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full liquid-glass-pill items-center justify-center font-mono text-xs font-semibold text-bronze transition-transform duration-500 hover:scale-110 shadow-md"
                    aria-hidden="true"
                  >
                    {stage.stageNumber}
                  </div>

                  {/* Stage Image Column */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="arch-frame aspect-[16/11] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone">
                      <img
                        src={stage.image}
                        alt={stage.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/75 via-charcoal-deep/15 to-transparent opacity-60" />

                      {/* Mobile Stage Pill */}
                      <div className="absolute top-4 left-4 z-10 lg:hidden">
                        <span className="liquid-glass-pill text-xs font-mono uppercase tracking-wider sm:tracking-widest px-3 py-1 rounded-full text-charcoal font-semibold shadow-sm">
                          {stage.stageName}
                        </span>
                      </div>

                      {/* Bottom Image Inset Note */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 hidden sm:block">
                        <p className="text-xs text-stone font-light liquid-glass-dark-badge p-3 rounded-xl leading-snug">
                          {stage.lead}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stage Narrative Column */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-md bg-bronze/10 text-bronze flex items-center justify-center">
                          <Icon size={14} />
                        </span>
                        <span className="font-mono text-xs text-bronze uppercase tracking-widest font-semibold">
                          {stage.stageName}
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal leading-tight">
                        {stage.title}
                      </h3>
                    </div>

                    <p className="font-sans text-charcoal-muted text-sm sm:text-base leading-relaxed font-light">
                      {stage.explanation}
                    </p>

                    {/* Key Deliverables */}
                    <div className="pt-2 border-t border-stone/50 space-y-2">
                      <p className="text-xs font-mono uppercase tracking-widest text-charcoal font-semibold">
                        Stage Deliverables & Clarity:
                      </p>
                      <div className="space-y-1.5">
                        {stage.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-charcoal-muted">
                            <Check size={13} className="text-bronze shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            6. FINAL TRANSITION & CLOSING CALL TO ACTION
            ==================================================================== */}
        <div className="mt-28 sm:mt-36 lg:mt-44 p-6 sm:p-12 lg:p-16 rounded-3xl liquid-glass-card text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-bronze font-semibold block">
            THE ARCHITECTURAL PROMISE
          </span>

          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-relaxed">
            "Every detail has a purpose. <br className="hidden sm:block" />
            <span className="italic text-bronze">Every space has a story.</span>"
          </blockquote>

          <p className="font-sans text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto font-light leading-relaxed">
            Take the first step toward a thoughtfully designed and beautifully executed interior. Begin your private dialogue with our design team.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="btn-primary text-xs sm:text-sm !py-3 !px-8 group shadow-md"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignProcess;
