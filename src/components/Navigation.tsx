import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Search, Sparkles, PhoneCall } from 'lucide-react';
import { ASSETS } from '../data/assets.ts';
import { getWhatsAppUrl } from '../config/whatsapp.ts';

interface NavigationProps {
  onOpenTrial?: () => void;
}

export function Navigation({ onOpenTrial }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FCFAF6]/90 backdrop-blur-md py-3 border-b border-[#171717]/8 shadow-xs'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-3 sm:px-8 lg:px-10 flex items-center justify-between gap-2">
          {/* Zone 1: Official Speakory Logo (Transparent & Prominent) */}
          <a
            href="#"
            className="inline-flex items-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7357FF] group py-1 shrink-0"
            aria-label="Speakory Home"
          >
            <img
              src={ASSETS.officialLogo}
              alt="Speakory"
              className="h-9 sm:h-12 md:h-14 w-auto max-w-[145px] sm:max-w-[220px] md:max-w-[270px] object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
            />
          </a>

          {/* Zone 2: Rounded pill navigation buttons */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-2 text-[13px] font-semibold text-[#171717]"
          >
            <a
              href="#main-content"
              className="px-4 py-1.5 rounded-full border border-transparent hover:border-[#171717]/10 hover:bg-white transition-all text-[#6B6964] hover:text-[#171717]"
            >
              Home
            </a>
            <a
              href="#why-communication"
              className="px-4 py-1.5 rounded-full border border-[#171717]/10 bg-white hover:border-[#171717]/30 hover:bg-[#F8F6FE] transition-all shadow-xs"
            >
              Why Speakory
            </a>
            <a
              href="#method"
              className="px-4 py-1.5 rounded-full border border-transparent hover:border-[#171717]/10 hover:bg-white transition-all text-[#6B6964] hover:text-[#171717]"
            >
              Method
            </a>
            <a
              href="#experience"
              className="px-4 py-1.5 rounded-full border border-transparent hover:border-[#171717]/10 hover:bg-white transition-all text-[#6B6964] hover:text-[#171717]"
            >
              Experience
            </a>
            <a
              href="#parents"
              className="px-4 py-1.5 rounded-full border border-transparent hover:border-[#171717]/10 hover:bg-white transition-all text-[#6B6964] hover:text-[#171717]"
            >
              Parents
            </a>
          </nav>

          {/* Zone 3: Search + Student Avatar + Trial CTA matching reference */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTrial}
              className="p-2 rounded-full hover:bg-white border border-[#171717]/8 text-[#171717] transition-colors cursor-pointer hidden sm:flex items-center justify-center shadow-xs"
              aria-label="Search"
            >
              <Search size={16} />
            </button>

            {/* Profile Avatar Pill matching reference */}
            <div className="hidden sm:flex items-center p-0.5 rounded-full bg-white border border-[#171717]/8 shadow-xs">
              <img
                src={ASSETS.studentYoungGirl}
                alt="Student profile"
                className="w-7 h-7 rounded-full object-cover"
              />
            </div>

            <button
              onClick={onOpenTrial}
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-[13px] font-bold text-white bg-[#171717] hover:bg-[#7357FF] rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer shrink-0"
              aria-label="Book a Call with Us"
            >
              <PhoneCall size={14} className="text-[#D4F0B0]" />
              <span>Book a Call</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#171717] hover:bg-white rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FCFAF6]/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <div className="pb-6 border-b border-[#171717]/8">
            <img
              src={ASSETS.officialLogo}
              alt="Speakory"
              className="h-12 sm:h-14 w-auto max-w-[240px] object-contain drop-shadow-xs"
            />
            <p className="text-xs text-[#7357FF] font-semibold mt-2">Speak. Express. Stand Out.</p>
          </div>

          <div className="flex flex-col gap-4 text-base font-bold text-[#171717]">
            <a
              href="#main-content"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#171717]/8 pb-2.5 hover:text-[#7357FF]"
            >
              Home
            </a>
            <a
              href="#why-communication"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#171717]/8 pb-2.5 hover:text-[#7357FF]"
            >
              Why Speakory
            </a>
            <a
              href="#method"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#171717]/8 pb-2.5 hover:text-[#7357FF]"
            >
              Method
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#171717]/8 pb-2.5 hover:text-[#7357FF]"
            >
              Experience
            </a>
            <a
              href="#parents"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#171717]/8 pb-2.5 hover:text-[#7357FF]"
            >
              Parents
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#171717]/8">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial?.();
              }}
              className="w-full py-3.5 text-center text-sm font-bold text-white bg-[#7357FF] hover:bg-[#5B3EE6] rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <PhoneCall size={16} className="text-[#D4F0B0]" />
              <span>Book a Free Trial</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
