import React, { useEffect, useState, useRef } from 'react';
import { Compass, Sparkles, SlidersHorizontal, Layers, CheckCircle } from 'lucide-react';

export const BrandManifesto: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsRevealed(true);
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsRevealed(true);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Scroll-triggered reveal when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Restrained parallax calculation for architectural imagery
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
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
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  // Subtle image parallax offset
  const imageTranslateY = prefersReducedMotion
    ? 0
    : Math.max(Math.min((scrollY - (sectionRef.current?.offsetTop || 800)) * 0.06, 35), -35);

  return (
    <section
      id="about"
      data-section="manifesto"
      ref={sectionRef}
      className="scroll-mt-20 sm:scroll-mt-24 py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-ivory text-charcoal relative overflow-hidden transition-colors duration-500"
      aria-label="Star Fox Interior Design Philosophy"
    >
      {/* Anchor alias for #manifesto compatibility */}
      <span id="manifesto" className="sr-only" aria-hidden="true" />
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.75px,transparent_0.75px)] [background-size:64px_64px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Eyebrow Label */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className="section-eyebrow font-sans text-xs tracking-[0.2em] sm:tracking-[0.28em] font-semibold text-bronze uppercase">
            OUR DESIGN PHILOSOPHY
          </span>
        </div>


        {/* Asymmetrical Layout: Editorial Headline + Supporting Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 sm:mb-28">
          {/* Oversized Headline with Mask Reveals */}
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-charcoal leading-[1.14] sm:leading-[1.08] tracking-[-0.02em]">
              <span className="block overflow-hidden pb-2.5 sm:pb-2">
                <span
                  className="inline-block transform transition-transform duration-800 ease-out"
                  style={{
                    transform: isRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                    transitionDuration: '0.85s',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0.08s'
                  }}
                >
                  Great design isn't
                </span>
              </span>

              <span className="block overflow-hidden pb-2.5 sm:pb-2">
                <span
                  className="inline-block transform transition-transform duration-800 ease-out"
                  style={{
                    transform: isRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                    transitionDuration: '0.85s',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0.24s'
                  }}
                >
                  just what you see.
                </span>
              </span>

              <span className="block overflow-hidden pb-2.5 sm:pb-2">
                <span
                  className="inline-block transform transition-transform duration-800 ease-out italic font-light text-bronze"
                  style={{
                    transform: isRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                    transitionDuration: '0.85s',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0.40s'
                  }}
                >
                  It's how you feel.
                </span>
              </span>
            </h2>
          </div>

          {/* Supporting Statement in Proportional Column */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-6 lg:pt-4 lg:border-l border-stone/70 pl-0 lg:pl-8">
            <div
              className="space-y-6 transition-all duration-800 ease-out"
              style={{
                opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                transform: isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '0.55s'
              }}
            >
              <p className="font-sans text-charcoal-muted text-base sm:text-lg leading-relaxed font-light">
                We create thoughtful interiors that balance architecture, materials, light, and everyday living — shaping spaces that feel personal, timeless, and beautifully considered.
              </p>

              {/* Secondary Line */}
              <div className="pt-4 border-t border-stone/50 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-bronze shrink-0" />
                <p className="font-serif text-base sm:text-lg text-charcoal font-medium italic">
                  Considered in every detail. Designed around you.
                </p>
              </div>
            </div>

            {/* Subtle Atelier Note */}
            <div
              className="pt-8 mt-8 border-t border-stone/40 flex items-center justify-between text-xs text-charcoal-subtle font-mono transition-opacity duration-800"
              style={{
                opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                transitionDelay: '0.70s'
              }}
            >
              <span>Gurugram Atelier</span>
              <span className="text-bronze tracking-widest uppercase">M3M Urbana</span>
            </div>
          </div>
        </div>

        {/* Cinematic Architectural Image Reveal & Compositional Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 border-t border-stone/50">
          {/* Large Architectural Photography Frame */}
          <div className="lg:col-span-8 relative">
            <div
              ref={imageRef}
              className={`arch-clip-reveal aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-2xl overflow-hidden shadow-2xl relative bg-stone ${
                isRevealed || prefersReducedMotion ? 'is-revealed' : ''
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
                alt="Bespoke contemporary residential interior architecture with warm textures, balanced proportions, and natural light"
                className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                style={{
                  transform: `scale(1.03) translateY(${imageTranslateY}px)`
                }}
                loading="lazy"
                decoding="async"
              />
              {/* Natural Atmospheric Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/75 via-charcoal-deep/15 to-transparent opacity-70" />

              {/* Bottom Architectural Caption */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-ivory">
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-champagne bg-charcoal-deep/60 backdrop-blur-md px-2.5 py-1 rounded-sm">
                    Spatial Architecture & Flow
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-medium mt-1.5 text-ivory">
                    Natural Light, Proportions & Custom Millwork
                  </p>
                </div>
                <span className="text-xs font-mono text-stone/80 tracking-wider">
                  M3M Urbana Portfolio
                </span>
              </div>
            </div>
          </div>

          {/* Right Pillar Cards: Architectural Pillars */}
          <div className="lg:col-span-4 space-y-6">
            <div className="liquid-glass-card liquid-glass-interactive p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-bronze font-semibold">
                01 • Spatial Harmony
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal">
                Proportion Above Ornament
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed font-sans font-light">
                True elegance stems from deliberate volumes, intuitive sightlines, and uninterrupted air circulation rather than superficial decor.
              </p>
            </div>

            <div className="liquid-glass-card liquid-glass-interactive p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-bronze font-semibold">
                02 • Tactile Materiality
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal">
                Substance You Can Touch
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed font-sans font-light">
                European smoked oak, book-matched Italian marble, and hand-finished champagne bronze selected for longevity and organic patina.
              </p>
            </div>

            <div className="liquid-glass-card liquid-glass-interactive p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-bronze font-semibold">
                03 • Living Experience
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal">
                Designed Around Everyday Life
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed font-sans font-light">
                A home should adapt to your personal morning rituals, intimate family dinners, and peaceful evening retreats effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandManifesto;
