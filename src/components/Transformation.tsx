import { useState } from 'react';
import { TRANSFORMATION_ITEMS } from '../data/content.ts';
import { ArrowRight } from 'lucide-react';

export function Transformation() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section
      aria-label="Student Transformation"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="tag-chip bg-[#FDC5E3] text-[#9D174D] mb-3">
            #INTERNAL_EVOLUTION
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171717] leading-tight">
            The shift from hesitation to{' '}
            <span className="font-editorial-italic font-normal text-[#7357FF]">
              conviction
            </span>
            .
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B6964] font-medium">
            Confidence isn’t a loud personality trait. It’s the quiet certainty that your ideas are worth expressing.
          </p>
        </div>

        {/* Carousel / Switcher */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-[#171717]/10 pb-4">
          {TRANSFORMATION_ITEMS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveItem(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
                activeItem === idx
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-white text-[#6B6964] hover:bg-[#F8F6FE] border border-[#171717]/6'
              }`}
            >
              Phase 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Cinematic Dual Typography View: FROM -> TO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* FROM: Shy, small, hesitant */}
          <div className="lg:col-span-5 bg-[#F1EFEA]/70 border border-[#171717]/8 rounded-3xl p-6 sm:p-10 transition-all">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6964] font-bold mb-3 block">
              BEFORE — The Hesitant Reflex
            </span>
            <div className="text-2xl sm:text-3xl font-normal text-[#6B6964] font-editorial-italic leading-snug">
              {TRANSFORMATION_ITEMS[activeItem].before}
            </div>
            <div className="mt-5 text-xs text-[#6B6964] pt-3.5 border-t border-[#171717]/10">
              {TRANSFORMATION_ITEMS[activeItem].context}
            </div>
          </div>

          {/* Central arrow */}
          <div className="lg:col-span-2 flex justify-center py-2">
            <div className="w-12 h-12 rounded-full bg-[#D4F0B0] border border-[#A8DE67] flex items-center justify-center text-[#171717] shadow-sm">
              <ArrowRight size={20} />
            </div>
          </div>

          {/* TO: Bold, radiant, clear */}
          <div className="lg:col-span-5 bg-[#E5DEFF] border border-[#7357FF]/30 rounded-3xl p-6 sm:p-10 shadow-xs relative">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B21B6] font-extrabold mb-3 block">
              AFTER — The Speakory Stance
            </span>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight leading-tight">
              {TRANSFORMATION_ITEMS[activeItem].after}
            </div>
            <div className="mt-5 text-xs text-[#7357FF] pt-3.5 border-t border-[#7357FF]/20 font-bold">
              Structured thoughts delivered with poise and authentic conviction.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
