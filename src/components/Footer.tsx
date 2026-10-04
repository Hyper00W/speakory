import { ArrowUp, PhoneCall } from 'lucide-react';
import { ASSETS } from '../data/assets.ts';
import { getWhatsAppUrl } from '../config/whatsapp.ts';

interface FooterProps {
  onOpenTrial?: () => void;
  onOpenTalk: () => void;
}

export function Footer({ onOpenTalk }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Footer"
      className="relative w-full bg-[#EBE8FA] text-[#171717] pt-12 pb-16 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-8 sm:p-14">
        {/* Giant Speakory Official Brand Wordmark & Logo */}
        <div className="border-b border-[#171717]/10 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <img
                src={ASSETS.officialLogo}
                alt="Speakory"
                className="h-20 sm:h-28 md:h-32 w-auto max-w-[340px] sm:max-w-[460px] object-contain drop-shadow-sm"
              />
              <p className="text-xl sm:text-2xl text-[#7357FF] font-editorial-italic mt-3">
                Speak. Express. Stand Out.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 text-xs sm:text-sm text-[#6B6964]">
              <span className="font-medium">Communication skills for the next generation.</span>
              <button
                onClick={scrollToTop}
                className="mt-2 inline-flex items-center gap-2 text-[#171717] hover:text-[#7357FF] transition-colors cursor-pointer font-bold"
                aria-label="Scroll to top"
              >
                <span>Back to top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Semantic Navigation Mirror */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs sm:text-sm border-b border-[#171717]/10">
          <div>
            <div className="font-bold text-[#171717] uppercase tracking-wider text-xs mb-3">
              Programs
            </div>
            <ul className="space-y-2 text-[#6B6964] font-medium">
              <li>
                <a href="#parents" className="hover:text-[#171717] transition-colors">
                  Ages 10–12: Voice & Expression
                </a>
              </li>
              <li>
                <a href="#parents" className="hover:text-[#171717] transition-colors">
                  Ages 13–15: Debate & Discussion
                </a>
              </li>
              <li>
                <a href="#parents" className="hover:text-[#171717] transition-colors">
                  Ages 16–18: Stage & Leadership
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#171717] uppercase tracking-wider text-xs mb-3">
              The Method
            </div>
            <ul className="space-y-2 text-[#6B6964] font-medium">
              <li>
                <a href="#method" className="hover:text-[#171717] transition-colors">
                  The 4 Pillars
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#171717] transition-colors">
                  6-Step Doing Cycle
                </a>
              </li>
              <li>
                <a href="#problem" className="hover:text-[#171717] transition-colors">
                  The Real Dilemma
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#171717] uppercase tracking-wider text-xs mb-3">
              For Parents
            </div>
            <ul className="space-y-2 text-[#6B6964] font-medium">
              <li>
                <a href="#parents" className="hover:text-[#171717] transition-colors">
                  Pedagogy & Safety
                </a>
              </li>
              <li>
                <a href="#parents" className="hover:text-[#171717] transition-colors">
                  Progress Tracking
                </a>
              </li>
              <li>
                <a href="#parents" className="hover:text-[#171717] transition-colors">
                  Parent FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#171717] uppercase tracking-wider text-xs mb-3">
              Connect
            </div>
            <ul className="space-y-2 text-[#6B6964] font-medium">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7357FF] transition-colors text-left cursor-pointer flex items-center gap-1.5 font-bold text-[#171717]"
                >
                  <PhoneCall size={14} className="text-[#7357FF]" />
                  <span>Call / Chat: +91 88476 93947</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTalk}
                  className="hover:text-[#171717] transition-colors text-left cursor-pointer"
                >
                  Schedule Parent Q&A
                </button>
              </li>
              <li>
                <span className="text-[#6B6964]">hello@speakory.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6964] font-medium">
          <div>
            © {new Date().getFullYear()} Speakory Academy. Speak + Story. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <span>WCAG 2.1 AA</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
