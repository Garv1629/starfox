import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project, PROJECTS } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalPortfolioProps {
  onSelectProject: (project: Project) => void;
}

export const HorizontalPortfolio: React.FC<HorizontalPortfolioProps> = ({ onSelectProject }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef(0);

  // Showcase all curated architectural projects in their established order
  const showcaseProjects = useMemo(() => PROJECTS, []);

  useEffect(() => {
    // Reduced motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) setIsHeaderRevealed(true);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsHeaderRevealed(true);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // If reduced motion is requested, show static natural flow
    if (mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    }

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop view (>= 1024px): Pinned scroll-driven horizontal gallery
    mm.add('(min-width: 1024px)', () => {
      // Header reveal when section approaches viewport
      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        onEnter: () => setIsHeaderRevealed(true),
        once: true
      });

      // Precise calculation of horizontal translation needed to reveal all project cards
      const calculateDistance = () => {
        try {
          const cards = track?.children;
          if (!cards || cards.length === 0) return 0;

          const firstCard = cards[0] as HTMLElement | undefined;
          const lastCard = cards[cards.length - 1] as HTMLElement | undefined;
          if (!firstCard || !lastCard) return 0;

          // Total distance from start of first card to end of last card
          const totalTrackWidth = (lastCard.offsetLeft + lastCard.offsetWidth) - firstCard.offsetLeft;
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
          const startPadding = viewportWidth >= 1024 ? 48 : 24;
          const endPadding = viewportWidth >= 1280 ? 64 : 48;

          return Math.max(0, totalTrackWidth - viewportWidth + startPadding + endPadding);
        } catch (err) {
          console.warn('Horizontal gallery translation offset calculation safe fallback:', err);
          return 0;
        }
      };


      const getLingerDistance = () => Math.min(window.innerHeight * 0.12, 100);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${calculateDistance() + getLingerDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Micro progress bar
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.max(progress * 100, 14)}%`;
            }

            // Update active index indicator based on progress
            const activeIdx = Math.min(
              Math.floor(progress * showcaseProjects.length),
              showcaseProjects.length - 1
            );
            if (lastIndexRef.current !== activeIdx) {
              lastIndexRef.current = activeIdx;
              setActiveProjectIndex(activeIdx);
            }
          }
        }
      });

      // Horizontal track travel revealing every card in sequence
      tl.to(track, {
        x: () => -calculateDistance(),
        ease: 'none',
        duration: 1
      });

      // Linger cushion so the final project card is fully appreciated before unpinning
      tl.to({}, {
        duration: () => {
          const dist = calculateDistance();
          return dist > 0 ? getLingerDistance() / dist : 0.15;
        }
      });
    });

    // Mobile / Tablet (< 1024px): Reveal header with ScrollTrigger, normal document flow
    mm.add('(max-width: 1023px)', () => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => setIsHeaderRevealed(true),
        once: true
      });
    });

    // Refresh triggers when fonts or images complete loading
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMediaChange);
      mm.revert();
    };
  }, [showcaseProjects.length]);

  // Mobile / Touch horizontal scroll button navigation
  const scrollMobileTrack = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = 360;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="scroll-mt-16 sm:scroll-mt-20 relative bg-ivory-warm text-charcoal border-y border-stone/50 overflow-hidden h-auto min-h-0 lg:h-screen w-full"
      aria-label="Selected Works Showcase"
    >
      {/* Anchor alias for #projects compatibility */}
      <span id="projects" className="sr-only" aria-hidden="true" />

      {/* Main Viewport Container */}
      <div className="w-full h-auto lg:h-full flex flex-col justify-between py-12 sm:py-14 lg:py-6 xl:py-8 px-6 sm:px-8 lg:px-12 max-w-[100vw]">
        {/* Section Introduction Header */}
        <div ref={headerRef} className="max-w-7xl mx-auto w-full mb-6 lg:mb-4 xl:mb-6 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone/50">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="section-eyebrow font-sans text-xs tracking-[0.2em] sm:tracking-[0.28em] font-semibold text-bronze uppercase">
                  SELECTED WORK
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-[1.08] tracking-[-0.015em]">
                <span className="block overflow-hidden pb-2.5 sm:pb-2">
                  <span
                    className="inline-block transform transition-transform duration-800 ease-out"
                    style={{
                      transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                      transitionDuration: '0.8s',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    Spaces designed
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
                    to be experienced.
                  </span>
                </span>
              </h2>
            </div>

            {/* Supporting Copy & Progress Counter */}
            <div className="max-w-md flex flex-col justify-between gap-4">
              <p
                className="font-sans text-charcoal-muted text-sm font-light leading-relaxed transition-all duration-700 ease-out"
                style={{
                  opacity: isHeaderRevealed || prefersReducedMotion ? 1 : 0,
                  transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: '0.35s'
                }}
              >
                Explore a selection of thoughtfully considered interiors, where material, light, proportion, and everyday living come together.
              </p>

              {/* Desktop Scroll Progress Indicator */}
              <div className="hidden lg:flex items-center justify-between gap-4 pt-3 border-t border-stone/40 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-bronze font-semibold">0{activeProjectIndex + 1}</span>
                  <span className="text-stone-muted">/</span>
                  <span className="text-charcoal-subtle">0{showcaseProjects.length}</span>
                </div>

                {/* Micro Progress Bar */}
                <div className="flex-1 h-[2px] bg-stone/40 rounded-full overflow-hidden mx-3">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-bronze transition-all duration-150 ease-out"
                    style={{ width: '14%' }}
                  />
                </div>

                <span className="text-xs text-charcoal-subtle tracking-wider uppercase">
                  Vertical Scroll Guided
                </span>
              </div>

              {/* Mobile Arrows */}
              <div className="flex lg:hidden items-center justify-between gap-3 pt-2 border-t border-stone/40">
                <span className="font-mono text-xs text-charcoal-muted">
                  Swipe horizontally to browse
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollMobileTrack('left')}
                    className="btn-icon w-9 h-9 border border-stone-muted/60 text-charcoal hover:bg-charcoal hover:text-ivory"
                    aria-label="Previous project"
                  >
                    <ArrowLeft size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollMobileTrack('right')}
                    className="btn-icon w-9 h-9 border border-stone-muted/60 text-charcoal hover:bg-charcoal hover:text-ivory"
                    aria-label="Next project"
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Horizontal Track */}
        <div className="relative w-full my-auto overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-10 lg:gap-14 overflow-x-auto lg:overflow-visible scroll-smooth scrollbar-none will-change-transform pb-4 lg:pb-0"
          >
            {showcaseProjects.map((project, idx) => {
              const isPortrait = idx % 3 === 1;

              return (
                <article
                  key={project.id}
                  className={`shrink-0 group cursor-pointer transition-all duration-500 ${
                    isPortrait
                      ? 'w-[85vw] sm:w-[540px] lg:w-[620px]'
                      : 'w-[90vw] sm:w-[680px] lg:w-[760px]'
                  }`}
                  onClick={() => onSelectProject(project)}
                >
                  {/* Card Image Frame */}
                  <div
                    className={`arch-frame relative rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden bg-stone mb-3.5 sm:mb-4 ${
                      isPortrait
                        ? 'aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-[38vh] xl:h-[44vh] lg:max-h-[380px] xl:max-h-[450px] lg:min-h-[260px]'
                        : 'aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:h-[38vh] xl:h-[44vh] lg:max-h-[380px] xl:max-h-[450px] lg:min-h-[260px]'
                    }`}
                  >
                    <img
                      src={project.heroImage}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Architectural Ambient Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal-deep/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Top Metadata Badges */}
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="liquid-glass-pill text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full text-charcoal font-semibold shadow-sm">
                          {project.category}
                        </span>
                        <span className="hidden sm:inline-block text-xs font-mono text-champagne liquid-glass-dark-badge px-2.5 py-1 rounded-full">
                          {project.area}
                        </span>
                      </div>

                      <span className="text-xs font-mono text-champagne-gold font-medium liquid-glass-dark-badge px-2.5 py-1 rounded-full">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Bottom Image Overlay Text */}
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-16 sm:right-20 z-10 text-ivory pr-2 min-w-0">
                      <p className="text-xs uppercase tracking-widest text-champagne font-mono flex items-center gap-1.5 mb-1 min-w-0">
                        <MapPin size={12} className="text-bronze-light shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-ivory leading-tight drop-shadow-sm line-clamp-2">
                        {project.name}
                      </h3>
                    </div>

                    {/* Inspect Quick Action Icon */}
                    <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 w-11 h-11 rounded-full liquid-glass-pill text-charcoal flex items-center justify-center shadow-lg group-hover:bg-bronze group-hover:text-ivory transition-all duration-300 scale-95 group-hover:scale-105 shrink-0">
                      <Maximize2 size={16} />
                    </div>
                  </div>

                  {/* Editorial Typography & Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4 pt-1">
                    <div className="max-w-xl min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-mono uppercase tracking-wider text-bronze mb-1">
                        <span>{project.scope}</span>
                        <span>•</span>
                        <span className="text-charcoal-muted">{project.year}</span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                        {project.brief}
                      </p>
                    </div>

                    {/* "View Project" CTA button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="btn-text shrink-0 self-start sm:self-auto mt-1"
                      aria-label={`View ${project.name} project details`}
                    >
                      <span>View Project</span>
                      <ArrowUpRight size={13} className="text-bronze transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Footer Notes & Seamless Transition */}
        <div className="max-w-7xl mx-auto w-full pt-6 border-t border-stone/50 hidden lg:flex items-center justify-between text-xs text-charcoal-muted font-sans shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span>Photography of verified turnkey completions in Gurugram, Haryana.</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-subtle tracking-wider uppercase">
            <span>Scroll vertically to advance projects</span>
            <span className="text-bronze font-semibold">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalPortfolio;
