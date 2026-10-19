import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { TESTIMONIALS, SUBSTANTIATED_CREDENTIALS, Testimonial } from '../data/testimonialsData';

interface TestimonialsAndCredentialsProps {
  onOpenConsultation?: () => void;
}

export const TestimonialsAndCredentials: React.FC<TestimonialsAndCredentialsProps> = ({ onOpenConsultation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const el = document.querySelector('#consultation');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) setIsHeaderRevealed(true);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsHeaderRevealed(true);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const observer = new IntersectionObserver(
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
      observer.observe(headerRef.current);
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current: Testimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 sm:scroll-mt-24 py-24 sm:py-32 lg:py-40 bg-ivory text-charcoal border-t border-stone/50 relative overflow-hidden"
      aria-label="Star Fox Interior Client Experiences and Verified Credentials"
    >
      {/* Subtle architectural dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.75px,transparent_0.75px)] [background-size:64px_64px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ====================================================================
            2. SECTION INTRODUCTION
            ==================================================================== */}
        <div ref={headerRef} className="max-w-3xl mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-eyebrow font-sans text-xs tracking-[0.2em] sm:tracking-[0.28em] font-semibold text-bronze uppercase">
              CLIENT EXPERIENCES
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
                Good design is felt.
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
                Trust is built.
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
            Every project begins with a conversation and grows through collaboration, thoughtful decisions, and attention to detail.
          </p>
        </div>

        {/* ====================================================================
            3. EDITORIAL TESTIMONIAL PRESENTATION
            ==================================================================== */}
        <div className="liquid-glass-card rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden mb-24">
          
          {/* Top Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 sm:mb-12 border-b border-stone/50 gap-4">
            <div className="flex items-center gap-3">
              <span className="liquid-glass-pill text-xs font-mono uppercase tracking-widest text-bronze font-semibold px-3.5 py-1 rounded-full">
                {current.featuredHighlight}
              </span>
              {current.year && (
                <span className="text-xs font-mono text-charcoal-muted hidden sm:inline-block">
                  Completed {current.year}
                </span>
              )}
            </div>

            {/* Accessible Navigation Controls */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-charcoal-muted tracking-wider" aria-live="polite">
                0{activeIndex + 1} / 0{TESTIMONIALS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="btn-icon border border-stone/70 text-charcoal hover:bg-charcoal hover:text-ivory"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="btn-icon border border-stone/70 text-charcoal hover:bg-charcoal hover:text-ivory"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Main Editorial Two-Column Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Large Editorial Serif Quotation & Author Metadata */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div>
                <span className="font-serif text-5xl sm:text-6xl text-bronze/40 block -mb-1 sm:-mb-2 font-normal select-none" aria-hidden="true">
                  “
                </span>
                <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-charcoal leading-[1.4] tracking-[-0.01em] italic">
                  {current.quote}
                </blockquote>
              </div>


              <div className="pt-6 border-t border-stone/50 space-y-1.5">
                <h3 className="font-serif text-2xl font-medium text-charcoal">
                  {current.clientName}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-bronze font-semibold">
                  {current.role}
                </p>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-charcoal-muted pt-1">
                  <span className="flex items-center gap-1.5 font-sans">
                    <MapPin size={13} className="text-bronze" />
                    {current.location}
                  </span>
                  <span className="text-stone-muted">•</span>
                  <span className="font-mono text-xs text-charcoal-subtle">
                    Scope: <strong className="text-charcoal font-medium">{current.projectType}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Genuine Project Photograph */}
            <div className="lg:col-span-5">
              <div className="arch-frame aspect-[4/3] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone">
                <img
                  key={current.id}
                  src={current.projectImage}
                  alt={`${current.clientName}'s residence at ${current.location}`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/70 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl liquid-glass-badge-panel text-charcoal">
                  <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold block mb-0.5">
                    Verified Completed Project
                  </span>
                  <p className="text-xs text-charcoal font-medium truncate">
                    {current.location}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Testimonial Direct Selector Tabs */}
          <div className="mt-12 pt-8 border-t border-stone/50 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`p-3 rounded-xl text-left border liquid-glass-tab ${
                  activeIndex === idx
                    ? 'is-active'
                    : ''
                }`}
              >
                <span className="block text-xs font-mono text-bronze uppercase">
                  0{idx + 1} • {t.clientName.split(' ')[0]}
                </span>
                <span className="block text-xs font-serif font-medium text-charcoal truncate mt-0.5">
                  {t.location.split(',')[0]}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* ====================================================================
            4. RESTRAINED CREDIBILITY STRIP
            ==================================================================== */}
        <div className="mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold block mb-2">
              SUBSTANTIATED CREDIBILITY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              A Grounded, Professional Practice
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-2 font-light">
              Clear accountability, physical studio presence, and verified execution standards across Gurugram.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBSTANTIATED_CREDENTIALS.map((cred, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl liquid-glass-card liquid-glass-interactive flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold block mb-2">
                    {cred.discipline}
                  </span>
                  <h4 className="font-serif text-xl font-medium text-charcoal mb-2">
                    {cred.title}
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                    {cred.substantiation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================================
            6. ENQUIRY CONNECTION CALL TO ACTION
            ==================================================================== */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl liquid-glass-card text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-bronze font-semibold block">
            BEGIN YOUR JOURNEY
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight">
            Planning a space of your own?
          </h3>

          <p className="font-sans text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto font-light leading-relaxed">
            Tell us about your project and start a conversation with the team.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleConsultation}
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

export default TestimonialsAndCredentials;
