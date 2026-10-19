import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Monitor prefers-reduced-motion for accessible navigation
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Throttled scroll listener to prevent jitter and maintain accurate active indicator
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          
          // Section mappings resolving any sub-sections directly to the 5 core navigation items
          const sectionMap: Record<string, string> = {
            contact: 'contact',
            consultation: 'contact',
            testimonials: 'about',
            process: 'services',
            craftsmanship: 'services',
            services: 'services',
            portfolio: 'portfolio',
            projects: 'portfolio',
            about: 'about',
            manifesto: 'about',
            home: 'home',
            hero: 'home'
          };
          const sections = ['contact', 'consultation', 'testimonials', 'process', 'craftsmanship', 'services', 'portfolio', 'about', 'manifesto', 'home'];
          
          let current = 'home';
          if (window.scrollY < 120) {
            current = 'home';
          } else {
            for (const id of sections) {
              const el = document.getElementById(id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 240 && rect.bottom >= 120) {
                  current = sectionMap[id] || id;
                  break;
                }
              }
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Keyboard navigation: Escape key closes mobile navigation panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Verified navigation mappings to actual section IDs
  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#portfolio', id: 'portfolio' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const smoothBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    if (href === '#' || href === '#home' || href === '#hero') {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: smoothBehavior, block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: smoothBehavior });
      }
      return;
    }

    try {
      const cleanId = href.replace(/^#/, '');
      const target = document.getElementById(cleanId) || document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: smoothBehavior, block: 'start' });
      }
    } catch (e) {
      console.warn('Navbar navigation fallback:', e);
    }
  }, [prefersReducedMotion]);

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    onOpenConsultation();
  };

  return (
    <>
      {/* Floating Pill Navbar Container */}
      <header
        role="banner"
        className="site-header fixed top-3 sm:top-5 md:top-6 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none transition-all duration-300"
      >
        <div className="navbar-container max-w-5xl mx-auto w-full pointer-events-auto">
          <nav
            aria-label="Main navigation"
            className={`navbar-pill rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between ${
              scrolled
                ? 'navbar-liquid-glass-scrolled scrolled'
                : 'navbar-liquid-glass'
            }`}
          >
            {/* Left: Star Fox Wordmark Logo */}
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="navbar-brand flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 rounded-full px-1.5 py-1"
              aria-label="Star Fox Interior Studio Home"
            >
              <div className="flex flex-col">
                <span
                  className={`navbar-brand-title font-serif text-lg sm:text-xl font-semibold tracking-wider transition-colors duration-300 leading-tight ${
                    scrolled
                      ? 'text-charcoal group-hover:text-bronze'
                      : 'text-ivory group-hover:text-champagne-gold'
                  }`}
                >
                  STAR FOX
                </span>
                <span
                  className={`navbar-brand-subtitle text-xs tracking-[0.14em] uppercase font-sans font-medium leading-none transition-colors duration-300 ${
                    scrolled
                      ? 'text-charcoal-subtle'
                      : 'text-stone/80'
                  }`}
                >
                  INTERIOR ARCHITECTURE
                </span>
              </div>
            </a>

            {/* Center: Desktop Navigation Links */}
            <div className="navbar-desktop-menu hidden md:flex items-center gap-3.5 lg:gap-7 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`navbar-nav-link relative py-1 text-xs uppercase tracking-[0.11em] lg:tracking-[0.16em] font-sans font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze rounded-sm ${
                      isActive
                        ? scrolled
                          ? 'is-active text-bronze font-semibold'
                          : 'is-active text-champagne-gold font-semibold'
                        : scrolled
                          ? 'text-charcoal-muted hover:text-charcoal'
                          : 'text-stone/90 hover:text-ivory'
                    }`}
                  >
                    <span>{link.label}</span>
                    {/* Animated Underline Transition */}
                    <span
                      className={`navbar-indicator absolute bottom-[-1px] left-1/2 -translate-x-1/2 h-[1.5px] rounded-full transition-all duration-300 ease-out pointer-events-none ${
                        scrolled ? 'bg-bronze' : 'bg-champagne-gold'
                      } ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Right: CTA Button & Mobile Toggle */}
            <div className="navbar-actions flex items-center gap-2 sm:gap-2.5">
              {/* Primary Rounded CTA: "Discuss Your Project" */}
              <button
                type="button"
                onClick={handleCtaClick}
                className={`navbar-cta-btn group relative inline-flex items-center gap-1.5 lg:gap-2 px-3.5 sm:px-4 lg:px-5 !py-2 sm:!py-2.5 text-xs font-medium tracking-wide shrink-0 transition-all duration-300 ${
                  scrolled
                    ? 'btn-primary'
                    : 'btn-champagne'
                }`}
                aria-label="Discuss Your Project — Book a Consultation"
              >
                <span className="hidden lg:inline">Discuss Your Project</span>
                <span className="lg:hidden">Consult</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                />
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`navbar-mobile-toggle btn-icon md:hidden w-9 h-9 transition-colors duration-300 ${
                  scrolled ? 'text-charcoal hover:bg-stone/30' : 'text-ivory hover:bg-white/10'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Responsive Navigation Panel (Full Backdrop + Liquid Glass Drawer) */}
      <div
        className={`mobile-nav-overlay fixed inset-0 z-[1100] transition-all duration-400 ease-out md:hidden ${
          mobileMenuOpen ? 'is-open opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Dimmer Backdrop */}
        <div
          className="mobile-nav-backdrop absolute inset-0 bg-charcoal-deep/60 backdrop-blur-sm transition-opacity duration-400"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Floating Rounded Mobile Menu Sheet */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className={`mobile-nav-sheet absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 max-w-lg mx-auto max-h-[calc(100svh-1.5rem)] overflow-y-auto liquid-glass-menu-panel rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-400 ease-out shadow-2xl ${
            mobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-98'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Panel Header */}
          <div className="mobile-nav-header flex items-center justify-between pb-5 border-b border-stone/60">
            <div>
              <p className="font-serif text-xl font-bold tracking-wider text-charcoal">
                STAR FOX
              </p>
              <p className="text-xs tracking-[0.14em] uppercase text-bronze font-sans font-medium">
                INTERIOR ARCHITECTURE
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-close btn-icon w-9 h-9"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-nav-links py-6 flex flex-col gap-1.5" aria-label="Mobile links">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`mobile-nav-item font-serif text-2xl py-2 px-3 rounded-xl transition-all flex items-center justify-between group ${
                    isActive
                      ? 'is-active bg-ivory text-bronze font-medium'
                      : 'text-charcoal hover:text-bronze hover:bg-ivory/60'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    size={18}
                    className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isActive ? 'text-bronze' : 'text-stone-muted'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile Bottom Quick Actions */}
          <div className="mobile-nav-actions pt-5 border-t border-stone/60 space-y-3 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full btn-champagne justify-center text-xs py-3.5 tracking-wider uppercase font-medium shadow-md"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight size={15} />
            </button>

            <a
              href="https://wa.link/ct3bi4"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-secondary justify-center text-xs py-3 gap-2 flex items-center"
            >
              <MessageSquare size={14} className="text-bronze" />
              <span>WhatsApp Studio Inquiry</span>
            </a>

            <div className="pt-2 text-center">
              <a
                href="tel:+919999395911"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal hover:text-bronze transition-colors"
              >
                <Phone size={11} className="text-bronze" />
                <span>+91 9999395911</span>
              </a>
              <p className="text-xs text-charcoal-subtle mt-0.5 font-sans">
                R4/109B, M3M Urbana, Sector-67, Gurugram
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
