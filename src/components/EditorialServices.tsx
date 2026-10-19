import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Check, Clock, Sparkles, ShieldCheck, Ruler, Hammer, Building2 } from 'lucide-react';
import { SERVICES, ServiceChapter } from '../data/servicesData';

interface EditorialServicesProps {
  onBookConsultation: () => void;
}

export const EditorialServices: React.FC<EditorialServicesProps> = ({ onBookConsultation }) => {
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
      SERVICES.forEach(s => { all[s.id] = true; });
      setRevealedChapters(all);
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsHeaderRevealed(true);
        const all: Record<string, boolean> = {};
        SERVICES.forEach(s => { all[s.id] = true; });
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
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-service-id');
            if (id) {
              setRevealedChapters((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
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
    <section id="services" className="scroll-mt-20 sm:scroll-mt-24 pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-32 lg:pb-40 bg-ivory text-charcoal relative overflow-hidden" aria-label="Star Fox Interior Design and Execution Services">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.75px,transparent_0.75px)] [background-size:64px_64px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Introduction Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-eyebrow font-sans text-xs tracking-[0.2em] sm:tracking-[0.28em] font-semibold text-bronze uppercase">
              WHAT WE DO
            </span>
          </div>


          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal leading-[1.14] sm:leading-[1.08] tracking-[-0.015em] mb-6">
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-800 ease-out"
                style={{
                  transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                  transitionDuration: '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                Thoughtfully designed.
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
                Beautifully executed.
              </span>
            </span>
          </h2>

          <p
            className="font-sans text-charcoal-muted text-base sm:text-lg lg:text-xl font-light leading-relaxed transition-all duration-700 ease-out max-w-2xl"
            style={{
              opacity: isHeaderRevealed || prefersReducedMotion ? 1 : 0,
              transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '0.35s'
            }}
          >
            From the first design conversation to the finishing details, we bring clarity, craftsmanship, and intention to every space.
          </p>
        </div>

        {/* Five Alternating Editorial Service Chapters */}
        <div className="space-y-20 sm:space-y-24 lg:space-y-32">
          {SERVICES.map((service, index) => {
            const isRevealed = revealedChapters[service.id] || prefersReducedMotion;

            /* ==============================================================
               CHAPTER 03: FULL-WIDTH ARCHITECTURAL COMPOSITION (WARDROBES)
               ============================================================== */
            if (service.layoutVariant === 'full-width') {
              return (
                <article
                  key={service.id}
                  data-service-id={service.id}
                  ref={(el) => (chaptersRef.current[index] = el)}
                  className={`rounded-3xl overflow-hidden border border-stone/60 bg-ivory-warm shadow-xl relative group transition-all duration-1000 ease-out ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                >
                  <div className="relative aspect-auto sm:aspect-[16/9] lg:aspect-[21/9] min-h-[520px] xs:min-h-[480px] sm:min-h-[420px] md:min-h-[420px] lg:min-h-0 w-full overflow-hidden bg-stone">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/95 via-charcoal-deep/50 to-charcoal-deep/20" />

                    {/* Floating Hero Content Overlay */}
                    <div className="absolute bottom-5 sm:bottom-8 lg:bottom-10 left-5 sm:left-8 lg:left-10 right-5 sm:right-8 lg:right-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 text-ivory">
                      <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory/15 backdrop-blur-md border border-champagne-gold/30 text-champagne text-xs font-mono uppercase tracking-wider sm:tracking-widest mb-2.5 sm:mb-3">
                          <Sparkles size={12} />
                          <span>Chapter {service.number} • Storage Architecture</span>
                        </div>
                        <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium text-ivory mb-1.5 sm:mb-2 leading-tight">
                          {service.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm font-medium uppercase tracking-wider text-champagne mb-2 sm:mb-3">
                          {service.subtitle}
                        </p>
                        <p className="font-sans text-stone/90 text-xs sm:text-sm leading-relaxed max-w-xl font-light line-clamp-3 sm:line-clamp-none">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 sm:gap-3 shrink-0">
                        <div className="text-right hidden md:block">
                          <p className="text-xs font-mono text-champagne uppercase">Typical Turnkey Delivery</p>
                          <p className="text-sm font-medium text-ivory">{service.turnaroundTime}</p>
                        </div>

                        <button
                          type="button"
                          onClick={onBookConsultation}
                          className="btn-champagne text-xs !py-3 !px-6 shadow-lg group/btn"
                        >
                          <span>Discuss Your Project</span>
                          <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Specification Bar */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-ivory border-t border-stone/50">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold mb-2">
                        Precision Storage Deliverables
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-charcoal-muted">
                            <Check size={13} className="text-bronze shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold mb-2">
                        Material & Hardware Sourcing
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.materials.map((mat, i) => (
                          <span
                            key={i}
                            className="text-xs font-sans px-3 py-1 rounded-full bg-ivory-warm border border-stone/60 text-charcoal font-medium"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            /* ==============================================================
               CHAPTER 04: OFFSET ASYMMETRICAL EDITORIAL (COMMERCIAL INTERIORS)
               ============================================================== */
            if (service.layoutVariant === 'offset') {
              return (
                <article
                  key={service.id}
                  data-service-id={service.id}
                  ref={(el) => (chaptersRef.current[index] = el)}
                  className={`transition-all duration-1000 ease-out ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    {/* Architectural Image with Tag */}
                    <div className="lg:col-span-7">
                      <div className="arch-frame aspect-[16/11] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone lg:h-full min-h-[280px] sm:min-h-[340px]">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/75 via-charcoal-deep/20 to-transparent opacity-70" />

                        <div className="absolute top-4 left-4 z-10">
                          <span className="liquid-glass-pill text-xs font-mono uppercase tracking-wider sm:tracking-widest px-3 py-1 rounded-full text-charcoal font-semibold shadow-sm flex items-center gap-1.5">
                            <Building2 size={12} className="text-bronze" />
                            Chapter {service.number} • Corporate Fit-Out
                          </span>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 z-10 hidden sm:block">
                          <p className="text-xs text-stone font-light max-w-md backdrop-blur-sm bg-charcoal-deep/40 p-3 rounded-xl border border-white/10">
                            Engineered for high-performing corporate leadership, acoustic isolation, and seamless audiovisual integration.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Pull-Card Narrative */}
                    <div className="lg:col-span-5 flex flex-col justify-between liquid-glass-card p-6 sm:p-10 rounded-2xl sm:rounded-3xl">
                      <div className="space-y-4">
                        <div>
                          <span className="font-mono text-xs text-bronze uppercase tracking-widest block mb-1">
                            Executive Workspaces
                          </span>
                          <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal leading-tight">
                            {service.title}
                          </h3>
                          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-bronze mt-1">
                            {service.subtitle}
                          </p>
                        </div>

                        <p className="font-sans text-charcoal-muted text-xs sm:text-sm leading-relaxed font-light">
                          {service.description}
                        </p>

                        <div className="pt-3 border-t border-stone/50 space-y-2">
                          <p className="text-xs font-mono uppercase tracking-widest text-charcoal font-semibold">
                            Deliverables & Engineering:
                          </p>
                          <div className="space-y-1.5">
                            {service.deliverables.map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-charcoal-muted">
                                <Check size={13} className="text-bronze shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-stone/50 mt-6 flex items-center justify-between gap-4">
                        <div className="text-xs text-charcoal-muted">
                          <span className="block text-xs font-mono uppercase text-bronze font-semibold">Timeline</span>
                          <span className="font-medium text-charcoal">{service.turnaroundTime}</span>
                        </div>

                        <button
                          type="button"
                          onClick={onBookConsultation}
                          className="btn-primary text-xs !py-2.5 !px-5 group"
                        >
                          <span>Discuss Your Project</span>
                          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            /* ==============================================================
               CHAPTER 05: MATERIALITY & EXECUTION FOCUS (TURNKEY EXECUTION)
               ============================================================== */
            if (service.layoutVariant === 'material-focus') {
              return (
                <article
                  key={service.id}
                  data-service-id={service.id}
                  ref={(el) => (chaptersRef.current[index] = el)}
                  className={`rounded-3xl liquid-glass-card p-6 sm:p-10 lg:p-14 transition-all duration-1000 ease-out ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Narrative & Accountability Pillars */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory border border-champagne-gold/30 text-bronze text-xs font-mono uppercase tracking-wider sm:tracking-widest">
                        <ShieldCheck size={13} />
                        <span>Chapter {service.number} • Complete Single-Source Delivery</span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal leading-tight">
                        {service.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-bronze">
                        {service.subtitle}
                      </p>

                      <p className="font-sans text-charcoal-muted text-sm sm:text-base leading-relaxed font-light">
                        {service.description}
                      </p>

                      {/* 4-Pillar Turnkey Commitments */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {service.deliverables.map((item, i) => (
                          <div key={i} className="p-3.5 rounded-xl liquid-glass-subcard flex items-start gap-2.5">
                            <Check size={14} className="text-bronze shrink-0 mt-0.5" />
                            <span className="text-xs text-charcoal leading-snug font-medium">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Sourced Precision Brands */}
                      <div className="pt-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-charcoal-subtle mb-2">
                          Standard Tested Materials & Chemical Systems:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.materials.map((mat, i) => (
                            <span
                              key={i}
                              className="text-xs font-sans px-3 py-1 rounded-full bg-ivory border border-stone/60 text-charcoal font-medium"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-6">
                        <button
                          type="button"
                          onClick={onBookConsultation}
                          className="btn-primary text-xs !py-3 !px-6 group shadow-md"
                        >
                          <span>Discuss Your Project</span>
                          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>

                        <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                          <Clock size={14} className="text-bronze" />
                          <span>Delivery: <strong className="text-charcoal font-medium">{service.turnaroundTime}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Right Architectural Image Frame */}
                    <div className="lg:col-span-5">
                      <div className="arch-frame aspect-[4/5] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-charcoal-deep/15 to-transparent opacity-60" />

                        {/* On-Site Engineering Stamp */}
                        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl liquid-glass-badge-panel text-charcoal">
                          <div className="flex items-center gap-2 text-bronze font-mono text-xs uppercase tracking-wider font-semibold mb-1">
                            <Hammer size={12} />
                            <span>Zero Subcontractor Hand-Off</span>
                          </div>
                          <p className="text-xs text-charcoal-muted font-light leading-tight">
                            Direct supervision by Star Fox Interior resident engineers at M3M Urbana studio.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            /* ==============================================================
               CHAPTER 01 & 02: ALTERNATING EDITORIAL COMPOSITION (HOME & KITCHEN)
               ============================================================== */
            const isImageLeft = service.layoutVariant === 'image-left';

            return (
              <article
                key={service.id}
                data-service-id={service.id}
                ref={(el) => (chaptersRef.current[index] = el)}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center transition-all duration-1000 ease-out ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                {/* Visual Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="arch-frame aspect-[16/11] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/70 via-charcoal-deep/15 to-transparent opacity-60" />

                    {/* Chapter Watermark Pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-ivory/95 backdrop-blur-md text-charcoal font-semibold border border-champagne-gold/30 shadow-sm">
                        Chapter {service.number}
                      </span>
                    </div>

                    {/* Inset Detail Chip */}
                    {service.detailImage && (
                      <div className="absolute bottom-4 right-4 z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-ivory shadow-xl hidden sm:block">
                        <img
                          src={service.detailImage}
                          alt={`${service.title} material detail`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Narrative & Specification Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    <span className="font-mono text-xs text-bronze uppercase tracking-wider sm:tracking-widest block mb-1">
                      Chapter {service.number} • Architectural Discipline
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal leading-tight">
                      {service.title}
                    </h3>
                    <p
                      className={`font-sans font-semibold text-bronze mt-1.5 ${
                        service.id === 'home-interiors'
                          ? 'text-sm normal-case tracking-normal'
                          : 'text-xs sm:text-sm uppercase tracking-wider'
                      }`}
                    >
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-charcoal-muted text-sm sm:text-base leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-mono uppercase tracking-widest text-charcoal font-semibold">
                      Deliverables & Scope:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-charcoal-muted">
                          <Check size={13} className="text-bronze shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Materials & Action Row */}
                  <div className="pt-4 border-t border-stone/50 space-y-4">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-charcoal-subtle mb-1.5">
                        Materials & Engineering:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.materials.map((mat, i) => (
                          <span
                            key={i}
                            className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-ivory-warm border border-stone/60 text-charcoal font-medium"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-xs text-charcoal-muted font-sans">
                        <Clock size={14} className="text-bronze" />
                        <span>Timeline: <strong className="text-charcoal font-medium">{service.turnaroundTime}</strong></span>
                      </div>

                      <button
                        type="button"
                        onClick={onBookConsultation}
                        className="btn-primary text-xs !py-2.5 !px-5 group"
                      >
                        <span>Discuss Your Project</span>
                        <ArrowUpRight
                          size={14}
                          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Editorial Footnote Banner */}
        <div className="mt-24 sm:mt-32 p-8 sm:p-10 rounded-3xl liquid-glass-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mb-1">
              Need a bespoke scope for your estate?
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-muted font-light">
              Visit our studio at M3M Urbana, Gurugram or schedule a preliminary spatial conversation.
            </p>
          </div>

          <button
            type="button"
            onClick={onBookConsultation}
            className="btn-champagne text-xs sm:text-sm shrink-0"
          >
            <span>Book Design Consultation</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditorialServices;

