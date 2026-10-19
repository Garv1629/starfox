import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../data/projectsData';
import { X, MapPin, Layers, CheckCircle2, ArrowUpRight, MessageSquare, Compass, Shield } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onBookConsultation
}) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sync active image when project opens
  useEffect(() => {
    if (project) {
      setActiveImage(project.heroImage);
    }
  }, [project]);

  // Lock background body scroll and listen for Escape key
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleConsultation = () => {
    onClose();
    onBookConsultation();
  };

  const getEncodedWhatsAppProjectUrl = () => {
    const text = `*Inquiry Regarding Completed Project: ${project.name}*
• Location: ${project.location}
• Scope: ${project.scope}
• Area: ${project.area}
Hello Star Fox Team, I am interested in a similar design approach for my property.`;
    return `https://wa.me/919999395911?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 bg-charcoal-deep/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-ivory max-w-5xl w-full rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-stone my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-stone/50 flex items-center justify-between bg-ivory-warm shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold">
                {project.category} Architectural Case Study
              </span>
              <span className="text-stone-muted">•</span>
              <span className="text-xs font-mono text-charcoal-muted">{project.area}</span>
            </div>
            <h3 id="modal-project-title" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal">
              {project.name}
            </h3>
            <p className="text-xs font-sans text-charcoal-muted flex items-center gap-1.5 mt-1 font-light">
              <MapPin size={13} className="text-bronze" />
              <span>{project.location}</span>
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="btn-icon border border-stone-muted/70 text-charcoal hover:bg-charcoal hover:text-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
            aria-label="Close project modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* Main Showcase Image Frame */}
          <div className="arch-frame aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-stone">
            <img
              src={activeImage || project.heroImage}
              alt={`${project.name} architectural view`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Thumbnail Gallery Strip */}
          {project.gallery && project.gallery.length > 1 && (
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-charcoal-subtle mb-2">
                Project Gallery Views:
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze ${
                      activeImage === img ? 'border-bronze shadow-md scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View ${project.name} image ${idx + 1}`}
                  >
                    <img src={img} alt={`${project.name} angle ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-stone/50">
            {/* Left Narrative */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h4 className="font-serif text-xl font-medium text-charcoal mb-2">
                  The Design Brief & Context
                </h4>
                <p className="text-sm font-sans text-charcoal-muted leading-relaxed font-light">
                  {project.brief}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-medium text-charcoal mb-2">
                  Design Approach & Architectural Solution
                </h4>
                <p className="text-sm font-sans text-charcoal-muted leading-relaxed font-light">
                  {project.designApproach}
                </p>
              </div>

              {/* Architectural Highlights */}
              <div>
                <h4 className="font-serif text-lg font-medium text-charcoal mb-3">
                  Signature Highlights
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-muted font-light">
                      <CheckCircle2 size={14} className="text-bronze shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Meta Column */}
            <div className="md:col-span-5 space-y-6">
              <div className="liquid-glass-subcard p-6 rounded-2xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-bronze font-semibold block">
                  Project Specifications
                </span>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-stone/40 pb-2">
                    <span className="text-charcoal-muted font-sans">Scope:</span>
                    <strong className="text-charcoal font-medium font-sans">{project.scope}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone/40 pb-2">
                    <span className="text-charcoal-muted font-sans">Area:</span>
                    <span className="font-mono text-charcoal font-medium">{project.area}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone/40 pb-2">
                    <span className="text-charcoal-muted font-sans">Timeline Delivered:</span>
                    <span className="font-mono text-charcoal font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted font-sans">Location:</span>
                    <span className="text-charcoal text-right font-light">{project.location.split(',')[0]}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone/40">
                  <span className="text-xs font-mono uppercase tracking-widest text-charcoal font-semibold block mb-2">
                    Materials & Finishes Specified:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.materialsUsed.map((mat, i) => (
                      <span
                        key={i}
                        className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-ivory border border-stone/60 text-charcoal font-medium"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation Prompt */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleConsultation}
                  className="w-full btn-champagne justify-center text-xs !py-3.5 !px-6 shadow-md group"
                >
                  <span>Discuss A Similar Project</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <a
                  href={getEncodedWhatsAppProjectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-secondary justify-center text-xs !py-3 !px-6 gap-2"
                >
                  <MessageSquare size={14} className="text-bronze" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
