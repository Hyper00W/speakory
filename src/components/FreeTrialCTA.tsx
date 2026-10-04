import { ArrowRight, PhoneCall } from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp.ts';

interface FreeTrialCTAProps {
  onOpenTrial?: () => void;
  onOpenTalk: () => void;
}

export function FreeTrialCTA({ onOpenTalk }: FreeTrialCTAProps) {
  return (
    <section
      aria-label="Call to Action"
      className="relative w-full py-20 sm:py-28 px-3 sm:px-6 lg:px-10 text-center"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_25px_70px_-15px_rgba(115,87,255,0.14)] border border-[#171717]/6 p-8 sm:p-16 lg:p-20 flex flex-col items-center">
        <span className="tag-chip bg-[#FDC5E3] text-[#9D174D] mb-4">
          #TAKE_THE_FIRST_STEP
        </span>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#171717] leading-[0.95] max-w-3xl">
          Ready to <br />
          <span className="font-editorial-italic font-normal text-[#7357FF]">
            be heard?
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-xl text-[#6B6964] max-w-lg mx-auto font-medium leading-relaxed">
          Connect directly with our academic mentors (+91 88476 93947). Ask any questions, explore the programs, and talk with us on call.
        </p>

        {/* Action Pair */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-[#171717] hover:bg-[#7357FF] rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <PhoneCall size={17} className="text-[#D4F0B0]" />
            <span>Connect with Admissions</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>

          <button
            onClick={onOpenTalk}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-[#171717] hover:text-[#7357FF] bg-white hover:bg-[#F8F6FE] border border-[#171717]/10 rounded-full transition-all cursor-pointer shadow-xs"
          >
            <span>Schedule Callback</span>
          </button>
        </div>

        {/* Quiet Reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-[#6B6964] font-medium">
          <span>Instant WhatsApp support</span>
          <span aria-hidden="true">·</span>
          <span>Direct 1-on-1 discussion</span>
          <span aria-hidden="true">·</span>
          <span>Zero pressure guidance</span>
        </div>
      </div>
    </section>
  );
}
