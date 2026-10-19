import React, { useEffect, useState, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ArrowUp, MessageSquare, Globe } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenCaseStudy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onOpenCaseStudy }) => {
  const currentYear = new Date().getFullYear();
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) setIsRevealed(true);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsRevealed(true);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    try {
      if (id === '#home' || id === '#hero') {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        return;
      }
      const cleanId = id.replace(/^#/, '');
      const el = document.getElementById(cleanId) || document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    } catch (err) {
      console.warn('Scroll navigation fallback:', err);
    }
  };


  return (
    <footer
      id="site-footer"
      ref={footerRef}
      className="bg-[#141210] text-ivory pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-14 border-t border-[#3C2D24] relative overflow-hidden"
      aria-label="Star Fox Interior Architecture Studio Footer"
    >
      {/* Subtle ambient architectural warm backlight */}
      <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] rounded-full bg-bronze/[0.07] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ====================================================================
            2. FINAL BRAND STATEMENT BANNER
            ==================================================================== */}
        <div className="pb-12 sm:pb-14 mb-12 sm:mb-14 border-b border-[#3C2D24]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <span className="font-mono text-xs tracking-[0.2em] sm:tracking-[0.28em] text-champagne uppercase font-semibold block mb-4">
                THE FINAL CHAPTER
              </span>

              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-ivory leading-[1.08] tracking-[-0.015em]">
                <span className="block overflow-hidden pb-2.5 sm:pb-2">
                  <span
                    className="inline-block transform transition-transform duration-800 ease-out"
                    style={{
                      transform: isRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                      transitionDuration: '0.8s',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    Let's create a space
                  </span>
                </span>
                <span className="block overflow-hidden pb-2.5 sm:pb-2">
                  <span
                    className="inline-block transform transition-transform duration-800 ease-out italic font-normal text-champagne"
                    style={{
                      transform: isRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                      transitionDuration: '0.8s',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: '0.15s'
                    }}
                  >
                    that feels like yours.
                  </span>
                </span>
              </h2>


              <p className="font-sans text-stone/85 text-base sm:text-lg font-light leading-relaxed mt-5 max-w-xl">
                Have a project in mind? Start a conversation with our team.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="btn-champagne text-xs sm:text-sm !py-3.5 !px-8 shadow-xl group inline-flex items-center gap-2"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="https://wa.me/919999395911"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs sm:text-sm !py-3.5 !px-6 border-[#3C2D24] text-stone hover:text-ivory hover:border-champagne inline-flex items-center gap-2"
              >
                <MessageSquare size={14} />
                <span>Quick WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ====================================================================
            3. FOUR LOGICAL FOOTER AREAS
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 pb-12 sm:pb-14 border-b border-[#3C2D24] items-start">

          {/* AREA A: BRAND IDENTITY */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-3xl font-semibold tracking-wider text-ivory block">
                STAR FOX
              </span>
              <span className="text-xs font-mono tracking-[0.14em] sm:tracking-[0.2em] uppercase text-champagne block mt-1">
                INTERIOR ARCHITECTURE & DESIGN STUDIO
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone/80 leading-relaxed font-light max-w-sm">
              Gurugram’s foremost bespoke interior design and turnkey execution studio. Creating refined, tailored sanctuaries for luxury residences and corporate headquarters across Delhi NCR.
            </p>

            <div className="pt-1 text-xs text-stone-muted font-mono space-y-1">
              <p>Studio: R4/109B, First Floor, M3M Urbana</p>
              <p>Sector-67, Gurugram, Haryana 122102</p>
            </div>
          </div>

          {/* AREA B: NAVIGATION */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-champagne font-semibold">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-sans tracking-wide">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, '#home')}
                  className="text-stone hover:text-champagne transition-colors duration-200 block py-0.5"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, '#about')}
                  className="text-stone hover:text-champagne transition-colors duration-200 block py-0.5"
                >
                  About & Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, '#services')}
                  className="text-stone hover:text-champagne transition-colors duration-200 block py-0.5"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => scrollToSection(e, '#portfolio')}
                  className="text-stone hover:text-champagne transition-colors duration-200 block py-0.5"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="text-stone hover:text-champagne transition-colors duration-200 block py-0.5"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* AREA C: VERIFIED CONTACT */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-champagne font-semibold">
              Studio Contact
            </h3>

            <div className="space-y-2.5 text-xs text-stone">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-champagne shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  First Floor, R4/109B, M3M Urbana, Sector-67, Gurugram, Haryana 122102
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-champagne shrink-0" />
                <a
                  href="tel:+919999395911"
                  className="hover:text-champagne transition-colors font-mono font-medium text-ivory"
                >
                  +91 9999395911
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-champagne shrink-0" />
                <a
                  href="mailto:info@starfoxinterior.com"
                  className="text-sm hover:text-champagne transition-colors text-stone hover:underline"
                >
                  info@starfoxinterior.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-champagne shrink-0" />
                <span>Open 7 Days: 09:00 AM – 07:00 PM</span>
              </div>
            </div>
          </div>

          {/* AREA D: SOCIAL LINKS & CERTIFIED CHANNELS */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-champagne font-semibold">
              Verified Presence
            </h3>

            <p className="text-xs text-stone/80 font-light leading-relaxed">
              Explore completed project walkthroughs, materiality updates, and studio archives across our official channels.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/starfoxinterior"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#3C2D24] bg-[#1E1713] flex items-center justify-center text-champagne hover:bg-champagne hover:text-charcoal hover:border-champagne transition-all duration-300"
                aria-label="Star Fox Interior Instagram Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/starfoxinterior"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#3C2D24] bg-[#1E1713] flex items-center justify-center text-champagne hover:bg-champagne hover:text-charcoal hover:border-champagne transition-all duration-300"
                aria-label="Star Fox Interior Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/starfoxinterior"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#3C2D24] bg-[#1E1713] flex items-center justify-center text-champagne hover:bg-champagne hover:text-charcoal hover:border-champagne transition-all duration-300"
                aria-label="Star Fox Interior LinkedIn Company Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Official Domain */}
              <a
                href="https://starfoxinterior.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#3C2D24] bg-[#1E1713] flex items-center justify-center text-champagne hover:bg-champagne hover:text-charcoal hover:border-champagne transition-all duration-300"
                aria-label="Star Fox Interior Official Website"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* ====================================================================
            4. VISUAL CLOSING: OVERSIZED ARCHITECTURAL WATERMARK
            ==================================================================== */}
        <div className="py-6 sm:py-8 overflow-hidden select-none relative" aria-hidden="true">
          <p className="font-serif font-normal tracking-[0.08em] text-[clamp(2rem,7vw,5.5rem)] leading-none text-ivory/[0.04] text-center whitespace-nowrap uppercase">
            STAR FOX INTERIOR
          </p>
        </div>

        {/* ====================================================================
            6. LEGAL, COPYRIGHT & BACK-TO-TOP CONTROL
            ==================================================================== */}
        <div className="pt-6 border-t border-[#3C2D24] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-muted gap-4">
          <p className="font-sans font-light text-center sm:text-left">
            © {currentYear} Star Fox Interior. All rights reserved. Registered at M3M Urbana, Gurugram, Haryana.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center sm:justify-end">
            {onOpenCaseStudy && (
              <>
                <button
                  type="button"
                  onClick={onOpenCaseStudy}
                  className="hover:text-champagne transition-colors duration-200 cursor-pointer font-sans"
                >
                  Architectural Case Study
                </button>
                <span className="text-stone/30">•</span>
              </>
            )}
            <a
              href="#consultation"
              onClick={(e) => scrollToSection(e, '#consultation')}
              className="hover:text-champagne transition-colors duration-200"
            >
              Privacy & Consultations
            </a>
            <span className="text-stone/30">•</span>
            
            {/* Back to Top Control */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-champagne transition-colors duration-200 font-mono text-xs group cursor-pointer pr-16 sm:pr-0"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
