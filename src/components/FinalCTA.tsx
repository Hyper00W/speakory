import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp.ts';

interface FinalCTAProps {
  onOpenTrial?: () => void;
  onOpenTalk?: () => void;
}

export function FinalCTA({ onOpenTrial, onOpenTalk }: FinalCTAProps) {
  return (
    <section
      aria-label="Final Call to Action"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10 text-center"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_25px_70px_-15px_rgba(115,87,255,0.14)] border border-[#171717]/6 p-8 sm:p-14 lg:p-16 flex flex-col items-center">
        <span className="tag-chip bg-[#FDC5E3] text-[#9D174D] mb-4">
          #TAKE_THE_FIRST_STEP
        </span>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#171717] leading-[0.95] max-w-3xl">
          Ready <br />
          <span className="font-editorial-italic font-normal text-[#7357FF]">
            to be heard?
          </span>
        </h2>

        <p className="mt-5 text-base sm:text-xl text-[#6B6964] max-w-lg mx-auto font-medium leading-relaxed">
          Start with a free Speakory trial session. A 45-minute zero-pressure live speaking diagnostic with 3–4 peers.
        </p>

        {/* Action Pair */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={onOpenTrial}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-[#7357FF] hover:bg-[#5B3EE6] rounded-full transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(115,87,255,0.45)] hover:shadow-[0_14px_35px_-5px_rgba(115,87,255,0.6)] hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar size={17} className="text-[#D4F0B0]" />
            <span>Book a Free Trial</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#171717] hover:text-[#7357FF] bg-white hover:bg-[#F8F6FE] border border-[#171717]/10 rounded-full transition-all cursor-pointer shadow-xs"
          >
            <MessageSquare size={15} className="text-[#7357FF]" />
            <span>Ask a Question</span>
          </a>
        </div>

        {/* Quiet Reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-[#8C8880] font-medium">
          <span>3–4 peers cohort</span>
          <span aria-hidden="true">·</span>
          <span>Zero pressure</span>
          <span aria-hidden="true">·</span>
          <span>Pick your 6–9 PM slot</span>
        </div>
      </div>
    </section>
  );
}
