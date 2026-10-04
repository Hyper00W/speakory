import { PhoneCall } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsapp.ts';

export function WhatsAppFloatingButton() {
  return (
    <aside aria-label="Admissions Quick Contact" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 sm:gap-2.5 bg-[#171717] hover:bg-[#7357FF] text-white pl-3.5 pr-4 sm:pl-4 sm:pr-5 py-2.5 sm:py-3 rounded-full shadow-[0_12px_30px_-5px_rgba(23,23,23,0.4)] hover:shadow-[0_16px_35px_-5px_rgba(115,87,255,0.45)] border border-white/10 transition-all duration-300 hover:scale-105 cursor-pointer font-bold text-xs sm:text-sm"
        aria-label="Connect with Speakory Admissions"
      >
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4F0B0] opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#D4F0B0]"></span>
        </span>
        <PhoneCall size={16} className="text-[#D4F0B0] sm:w-[17px] sm:h-[17px]" />
        <span className="tracking-tight hidden sm:inline">Talk to Us · {WHATSAPP_CONFIG.displayPhoneNumber}</span>
        <span className="tracking-tight sm:hidden text-xs">Talk to Us</span>
      </a>
    </aside>
  );
}
