import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Compass, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onBookConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onBookConsultation }) => {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Scroll-linked parallax & gradual focus fade
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const heroHeight = heroRef.current.offsetHeight || window.innerHeight;
            if (window.scrollY <= heroHeight * 1.2) {
              setScrollY(window.scrollY);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  // Compute restrained scroll interpolation values
  const maxScroll = typeof window !== 'undefined' ? window.innerHeight : 800;
  const progress = Math.min(scrollY / maxScroll, 1);

  // Parallax calculations (disabled if prefers-reduced-motion is active)
  const bgScale = prefersReducedMotion ? 1 : 1 + progress * 0.08;
  const contentTranslateY = prefersReducedMotion ? 0 : -progress * 24;
  const contentOpacity = prefersReducedMotion ? 1 : Math.max(1 - progress * 1.25, 0.08);

  return (
    <section
      id="home"
      ref={heroRef}
      className="scroll-mt-0 relative min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-36 lg:pt-40 pb-6 sm:pb-10 px-5 sm:px-8 lg:px-12 overflow-hidden bg-charcoal-deep text-ivory"
      aria-label="Star Fox Interior Hero Introduction"
    >
      {/* Anchor alias for #hero compatibility */}
      <span id="hero" className="sr-only" aria-hidden="true" />
      {/* Background Architectural Composition with subtle parallax scaling */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
          alt="Star Fox Interior bespoke residential architecture with warm ambient lighting and tailored finishes, Gurugram"
          className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${bgScale})`,
            transformOrigin: 'center center'
          }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {/* Cinematic Scrim & Vignette Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/65 to-charcoal-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/85 via-charcoal-deep/45 to-transparent" />
        {/* Subtle architectural dot grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:48px_48px] opacity-10" />
      </div>

      {/* Main Hero Content Wrapper */}
      <div
        className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10 transition-all duration-100 ease-out"
        style={{
          transform: `translateY(${contentTranslateY}px)`,
          opacity: contentOpacity
        }}
      >
        <div className="max-w-4xl">
          {/* Studio Location Descriptor Badge */}
          <div className="inline-flex max-w-full items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-ivory/10 backdrop-blur-md border border-champagne-gold/30 text-champagne text-xs font-sans font-medium tracking-wide mb-6 sm:mb-8 animate-fade-in shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold animate-pulse shrink-0" />
            <span className="flex items-center gap-1.5 min-w-0">
              <MapPin size={12} className="text-bronze-light shrink-0" />
              <span className="normal-case truncate sm:whitespace-normal">Studio Atelier • M3M Urbana, Sector-67, Gurugram</span>
            </span>
          </div>

          {/* Editorial Headline with Line-by-Line Mask Reveals */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.14] sm:leading-[1.08] tracking-[-0.02em] font-normal text-ivory mb-6 sm:mb-8">
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-700 ease-out"
                style={{
                  animation: prefersReducedMotion ? 'none' : 'maskRevealUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards'
                }}
              >
                Spaces That Feel
              </span>
            </span>
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-700 ease-out italic font-light text-champagne"
                style={{
                  animation: prefersReducedMotion ? 'none' : 'maskRevealUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.28s forwards'
                }}
              >
                Like They Were Made
              </span>
            </span>
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-700 ease-out"
                style={{
                  animation: prefersReducedMotion ? 'none' : 'maskRevealUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.44s forwards'
                }}
              >
                for You.
              </span>
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="font-sans text-stone/90 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mb-8 sm:mb-10"
            style={{
              animation: prefersReducedMotion ? 'none' : 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.62s both'
            }}
          >
            Thoughtfully designed interiors. Exceptional craftsmanship. Spaces shaped around the way you live.
          </p>

          {/* Action CTAs */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
            style={{
              animation: prefersReducedMotion ? 'none' : 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.78s both'
            }}
          >
            {/* Primary CTA: "Explore Our Work" */}
            <button
              type="button"
              onClick={onExploreWork}
              className="btn-champagne text-sm !py-3.5 !px-8 justify-center group shadow-lg"
              aria-label="Explore Our Work — View Selected Projects"
            >
              <span className="text-sm">Explore Our Work</span>
              <Compass size={17} className="group-hover:rotate-45 transition-transform duration-300 ease-out" />
            </button>

            {/* Secondary CTA: "Discuss Your Project" */}
            <button
              type="button"
              onClick={onBookConsultation}
              className="btn-outline text-sm !py-3.5 !px-8 justify-center group"
              aria-label="Discuss Your Project — Schedule a Consultation"
            >
              <span className="text-sm">Discuss Your Project</span>
              <ArrowUpRight
                size={16}
                className="text-champagne group-hover:text-ivory transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-ivory/15 flex items-center justify-between text-xs text-stone/75 font-sans">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-bronze shrink-0" />
          <span className="text-xs uppercase tracking-wider text-stone-muted truncate sm:whitespace-normal">
            Turnkey Residential & Commercial Architecture
          </span>
        </div>

        <button
          type="button"
          onClick={onExploreWork}
          className="btn-text border-b-0 text-champagne hover:text-ivory text-xs uppercase tracking-widest group focus:outline-none focus-visible:ring-1 focus-visible:ring-champagne rounded-sm px-1 py-0.5 lg:mr-72 xl:mr-80"
          aria-label="Scroll to discover selected works"
        >
          <span className="hidden sm:inline font-mono">Scroll to Discover</span>
          <ArrowDown size={13} className="animate-bounce text-champagne-gold group-hover:text-ivory" />
        </button>

      </div>
    </section>
  );
};

export default Hero;
