import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside aria-label="Direct Studio WhatsApp Contact" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 pointer-events-auto">
      {/* Pop-up Tooltip on desktop */}
      <div className="hidden lg:flex items-center gap-2 py-2 px-3.5 rounded-full bg-ivory/95 backdrop-blur-md border border-stone/60 text-charcoal shadow-xl text-xs font-sans">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-medium text-charcoal">Direct Studio WhatsApp:</span>
        <a
          href="https://wa.me/919999395911"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bronze font-mono font-semibold hover:underline"
        >
          +91 9999395911
        </a>
      </div>

      {/* Floating Action Button */}
      <a
        href="https://wa.me/919999395911"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Inquiry with Star Fox Interior at +91 9999395911"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-108 hover:shadow-emerald-500/25 transition-all duration-300 relative group focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        <MessageSquare size={22} className="sm:w-6 sm:h-6 fill-white" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-bronze border-2 border-ivory" />
      </a>
    </aside>
  );
};

export default WhatsAppFloatingButton;
