import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, ArrowUpRight, Check, AlertCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface ConsultationSectionProps {
  onPrivacyClick?: () => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ onPrivacyClick }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Apartment',
    location: '',
    serviceRequired: 'Complete Turnkey Interior Architecture',
    budget: '₹30L - ₹60L',
    timeline: 'Within 1 to 2 Months',
    projectDetails: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'ready-to-send'>('idle');
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Validation: Requires full name, and at least one contact method (phone or email)
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    const hasPhone = Boolean(formData.phone.trim());
    const hasEmail = Boolean(formData.email.trim());

    if (!hasPhone && !hasEmail) {
      newErrors.phone = 'Please provide a phone number or email address.';
      newErrors.email = 'Please provide a phone number or email address.';
    } else {
      if (hasPhone) {
        const cleanPhone = formData.phone.replace(/[\s+-]/g, '').slice(-10);
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
          newErrors.phone = 'Please enter a valid 10-digit mobile number.';
        }
      }
      if (hasEmail) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
          newErrors.email = 'Please enter a valid email address.';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getEncodedWhatsAppUrl = () => {
    const text = `*New Interior Consultation Enquiry*
• *Client Name:* ${formData.fullName}
• *Phone:* ${formData.phone || 'Provided via form'}
• *Email:* ${formData.email || 'N/A'}
• *Property Type:* ${formData.propertyType}
• *Project Location:* ${formData.location || 'Gurugram / NCR'}
• *Service Required:* ${formData.serviceRequired}
• *Budget Window:* ${formData.budget}
• *Timeline:* ${formData.timeline}
• *Project Scope / Brief:* ${formData.projectDetails || 'Turnkey residential design inquiry'}`;
    return `https://wa.me/919999395911?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      /* Integration Point for Production API Endpoint:
         If a backend service or serverless webhook (e.g. /api/enquiries or Formspree/CRM)
         is configured, this is where the POST request executes. */
      
      // Attempt optional backend API ping if configured
      let apiDelivered = false;
      try {
        const response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          apiDelivered = true;
        }
      } catch {
        // No local backend server active in static/dev bundle — expected fallback
      }

      // Small deliberate delay for UX smoothness
      await new Promise((r) => setTimeout(r, 600));

      if (apiDelivered) {
        setSubmissionStatus('success');
      } else {
        // Ready to dispatch directly via verified WhatsApp communication channel
        setSubmissionStatus('ready-to-send');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionStatus('idle');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      propertyType: 'Apartment',
      location: '',
      serviceRequired: 'Complete Turnkey Interior Architecture',
      budget: '₹30L - ₹60L',
      timeline: 'Within 1 to 2 Months',
      projectDetails: ''
    });
    setErrors({});
  };

  return (
    <section
      id="contact"
      data-section="consultation"
      className="scroll-mt-20 sm:scroll-mt-24 py-24 sm:py-32 lg:py-40 bg-ivory-warm text-charcoal relative overflow-hidden border-t border-stone/50"
      aria-label="Star Fox Interior Project Consultation and Design Enquiry"
    >
      {/* Anchor alias for #consultation compatibility */}
      <span id="consultation" className="sr-only" aria-hidden="true" />
      {/* Subtle stone radial architectural background */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.75px,transparent_0.75px)] [background-size:64px_64px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ====================================================================
            2. SECTION INTRODUCTION
            ==================================================================== */}
        <div ref={headerRef} className="max-w-4xl mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-eyebrow font-sans text-xs tracking-[0.2em] sm:tracking-[0.28em] font-semibold text-bronze uppercase">
              LET'S CREATE SOMETHING MEANINGFUL
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
                Your space.
              </span>
            </span>
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-800 ease-out"
                style={{
                  transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                  transitionDuration: '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '0.12s'
                }}
              >
                Your vision.
              </span>
            </span>
            <span className="block overflow-hidden pb-2.5 sm:pb-2">
              <span
                className="inline-block transform transition-transform duration-800 ease-out italic font-normal text-bronze"
                style={{
                  transform: isHeaderRevealed || prefersReducedMotion ? 'translateY(0%)' : 'translateY(115%)',
                  transitionDuration: '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '0.24s'
                }}
              >
                Let's bring it to life.
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
            Tell us a little about your project. Let's explore how thoughtful design and considered details can shape your space.
          </p>
        </div>

        {/* ====================================================================
            TWO-COLUMN EDITORIAL COMPOSITION
            ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Architectural Visual & Studio Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            {/* Architectural Visual Container */}
            <div className="arch-frame aspect-[4/3] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative group bg-stone">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85"
                alt="Star Fox Interior Design Studio & Architecture"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal-deep/25 to-transparent opacity-70" />

              <div className="absolute bottom-5 left-5 right-5 text-ivory">
                <span className="text-xs font-mono uppercase tracking-wider sm:tracking-widest text-champagne font-semibold block mb-1">
                  Gurugram Design Studio & Material Lab
                </span>
                <p className="font-serif text-xl sm:text-2xl font-light text-ivory leading-tight">
                  Where ideas, tactile finishes, and architecture align.
                </p>
              </div>
            </div>

            {/* Studio Coordinates Card */}
            <div className="liquid-glass-card p-6 sm:p-7 rounded-2xl space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="text-bronze shrink-0 mt-1" size={18} />
                <div>
                  <h3 className="font-serif text-base font-semibold text-charcoal">Studio & Material Lab</h3>
                  <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed font-light">
                    First Floor, R4/109B, M3M Urbana, Sector-67, Gurugram, Haryana 122102
                  </p>
                  <p className="text-xs font-mono text-bronze mt-1">Open 7 Days: 09:00 AM – 07:00 PM</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone/40 flex items-start gap-3.5">
                <Phone className="text-bronze shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-serif text-base font-semibold text-charcoal">Direct Studio Line</h4>
                  <a
                    href="tel:+919999395911"
                    className="text-xs font-mono font-medium text-charcoal hover:text-bronze transition-colors block mt-0.5"
                  >
                    +91 9999395911
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-stone/40 flex items-start gap-3.5">
                <Mail className="text-bronze shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-serif text-base font-semibold text-charcoal">Electronic Inquiries</h4>
                  <a
                    href="mailto:info@starfoxinterior.com"
                    className="text-sm font-sans text-charcoal-muted hover:text-bronze transition-colors block mt-0.5"
                  >
                    info@starfoxinterior.com
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="liquid-glass-card-dark p-6 sm:p-7 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-champagne text-xs font-mono uppercase tracking-widest">
                <MessageSquare size={14} />
                <span>Immediate WhatsApp Connect</span>
              </div>
              <h4 className="font-serif text-xl text-ivory font-light leading-snug">
                Prefer WhatsApp? Let's talk.
              </h4>
              <p className="text-xs text-[#C5B8A8] font-light leading-relaxed">
                Send floor plans, project locations, or initial concepts directly to our principal design team for an immediate preliminary review.
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/919999395911"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-champagne text-xs !py-2.5 !px-5 inline-flex items-center gap-2 group"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Qualified Consultation Form */}
          <div className="lg:col-span-7 liquid-glass-card rounded-3xl p-6 sm:p-10 lg:p-12 relative">

            {submissionStatus === 'ready-to-send' ? (
              /* Ready-to-Send Brief State (Direct WhatsApp Dispatch) */
              <div className="text-center py-6 sm:py-8 space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-bronze/10 text-bronze flex items-center justify-center mx-auto shadow-inner">
                  <Sparkles size={30} />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold">
                    Consultation Brief Formatted
                  </span>
                  <h3 className="font-serif text-3xl font-medium text-charcoal mt-1.5">
                    Ready For Review, {formData.fullName.split(' ')[0]}.
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mt-2 leading-relaxed font-light">
                    Your brief for your <strong className="text-charcoal font-medium">{formData.propertyType}</strong> has been structured with your budget and service preferences.
                  </p>
                </div>

                {/* Structured Brief Snapshot */}
                <div className="liquid-glass-subcard p-5 rounded-2xl text-left max-w-md mx-auto space-y-2 text-xs">
                  <div className="flex justify-between border-b border-stone/40 pb-1.5">
                    <span className="text-charcoal-muted">Client:</span>
                    <strong className="text-charcoal font-medium">{formData.fullName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone/40 pb-1.5">
                    <span className="text-charcoal-muted">Contact:</span>
                    <span className="font-mono text-charcoal">{formData.phone || formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone/40 pb-1.5">
                    <span className="text-charcoal-muted">Discipline:</span>
                    <span className="text-charcoal">{formData.serviceRequired}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Budget Window:</span>
                    <span className="text-bronze font-medium">{formData.budget}</span>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="space-y-3 pt-2">
                  <a
                    href={getEncodedWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-champagne text-xs sm:text-sm !py-3.5 !px-8 justify-center shadow-lg w-full sm:w-auto inline-flex items-center gap-2"
                  >
                    <MessageSquare size={16} />
                    <span>Send Brief to Studio via WhatsApp</span>
                    <ArrowUpRight size={15} />
                  </a>

                  <div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-text text-xs text-charcoal-muted hover:text-charcoal underline underline-offset-4 font-sans"
                    >
                      Edit details or submit another project
                    </button>
                  </div>
                </div>

                <p className="text-xs text-charcoal-subtle font-light pt-2 max-w-sm mx-auto">
                  Your information will be used exclusively to assess project feasibility and prepare a preliminary design perspective.
                </p>
              </div>
            ) : submissionStatus === 'success' ? (
              /* Backend-Confirmed Submission State */
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check size={32} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold">
                    Enquiry Delivered
                  </span>
                  <h3 className="font-serif text-3xl font-medium text-charcoal mt-1">
                    Thank You, {formData.fullName}.
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mt-2 leading-relaxed">
                    Our principal design team will review your project parameters and reach out within 2 business hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary text-xs !py-2.5 !px-6"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              /* Qualified Consultation Form */
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                    Tell Us About Your Project
                  </h3>
                  <p className="text-xs text-charcoal-muted font-light mt-1">
                    Fields marked with an asterisk (<span className="text-bronze">*</span>) are required. All inquiries remain strictly confidential.
                  </p>
                </div>

                {/* Full Name (Required) */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                    Full Name <span className="text-bronze">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Vikramaditya Rao"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-ivory-warm border text-sm text-charcoal placeholder:text-stone-muted focus:outline-none focus:border-bronze transition-colors ${
                      errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-stone/60'
                    }`}
                    aria-required="true"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle size={12} />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Contact Row: Phone & Email (At least one required) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Phone Number <span className="text-stone-muted font-normal text-xs">(Required or Email)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-ivory-warm border text-sm text-charcoal placeholder:text-stone-muted focus:outline-none focus:border-bronze transition-colors ${
                        errors.phone ? 'border-red-400 focus:border-red-500' : 'border-stone/60'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle size={12} />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Email Address <span className="text-stone-muted font-normal text-xs">(Required or Phone)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="vikram@domain.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-ivory-warm border text-sm text-charcoal placeholder:text-stone-muted focus:outline-none focus:border-bronze transition-colors ${
                        errors.email ? 'border-red-400 focus:border-red-500' : 'border-stone/60'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle size={12} />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Property Type & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="propertyType" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ivory-warm border border-stone/60 text-sm text-charcoal focus:outline-none focus:border-bronze transition-colors"
                    >
                      <option value="Apartment">Apartment (3 / 4 / 5 BHK)</option>
                      <option value="Villa">Villa / Penthouse</option>
                      <option value="Independent House">Independent House / Kothi</option>
                      <option value="Commercial">Commercial / Office Fit-Out</option>
                      <option value="Other">Other / Hospitality</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Project Location / Society
                    </label>
                    <input
                      id="location"
                      type="text"
                      placeholder="e.g. Ireo Victory Valley / Sector 67"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ivory-warm border border-stone/60 text-sm text-charcoal placeholder:text-stone-muted focus:outline-none focus:border-bronze transition-colors"
                    />
                  </div>
                </div>

                {/* Services Required */}
                <div>
                  <label htmlFor="serviceRequired" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                    Primary Service Required
                  </label>
                  <select
                    id="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-warm border border-stone/60 text-sm text-charcoal focus:outline-none focus:border-bronze transition-colors"
                  >
                    <option value="Complete Turnkey Interior Architecture">Complete Turnkey Interior Architecture</option>
                    <option value="Modular Kitchen & Wardrobe Systems">Modular Kitchen & Wardrobe Systems</option>
                    <option value="Living, Dining & Bedroom Architecture">Living, Dining & Bedroom Architecture</option>
                    <option value="Commercial Office Fit-Out">Commercial Office Fit-Out</option>
                    <option value="Design Consultation & 3D Spatial Planning">Design Consultation & 3D Spatial Planning</option>
                  </select>
                </div>

                {/* Configurable Budget Range & Target Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Approximate Budget Window
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ivory-warm border border-stone/60 text-sm text-charcoal focus:outline-none focus:border-bronze transition-colors"
                    >
                      <option value="₹15L - ₹30L">₹15 Lakhs – ₹30 Lakhs</option>
                      <option value="₹30L - ₹60L">₹30 Lakhs – ₹60 Lakhs</option>
                      <option value="₹60L - ₹1.2Cr">₹60 Lakhs – ₹1.2 Crore</option>
                      <option value="₹1.2Cr+">₹1.2 Crore and above</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Target Project Timeline
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ivory-warm border border-stone/60 text-sm text-charcoal focus:outline-none focus:border-bronze transition-colors"
                    >
                      <option value="Immediate (Possession in hand)">Immediate (Possession in hand)</option>
                      <option value="Within 1 to 2 Months">Within 1 to 2 Months</option>
                      <option value="Within 3 to 6 Months">Within 3 to 6 Months</option>
                      <option value="Planning Phase (Under Construction)">Planning Phase (Under Construction)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Project Details */}
                <div>
                  <label htmlFor="projectDetails" className="block text-xs font-mono uppercase tracking-wider text-charcoal font-medium mb-1.5">
                    Additional Project Details <span className="text-stone-muted font-normal text-xs">(Optional)</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    rows={3}
                    placeholder="Tell us about your spatial aspirations, favorite materials, or specific family requirements..."
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-warm border border-stone/60 text-sm text-charcoal placeholder:text-stone-muted focus:outline-none focus:border-bronze transition-colors resize-none"
                  />
                </div>

                {/* Primary CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-champagne justify-center text-xs sm:text-sm !py-4 tracking-wider uppercase font-medium disabled:opacity-60 shadow-lg group"
                  >
                    {isSubmitting ? (
                      <span>Structuring Consultation Brief...</span>
                    ) : (
                      <>
                        <span>Start Your Project</span>
                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy and Transparency Disclaimer */}
                <div className="pt-2 text-center space-y-1">
                  <p className="text-xs text-charcoal-muted font-light leading-relaxed">
                    Your details are shared solely with our principal design team at M3M Urbana to review spatial feasibility. Submitting does not imply a fixed quotation or contract.
                  </p>
                  <p className="text-xs text-stone-muted font-mono">
                    Direct studio line: <a href="tel:+919999395911" className="text-bronze hover:underline">+91 9999395911</a> • Sector 67, Gurugram
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default ConsultationSection;
