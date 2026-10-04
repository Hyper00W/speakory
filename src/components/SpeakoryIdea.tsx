import { useState } from 'react';
import { PILLARS } from '../data/content.ts';

const PASTEL_PILLARS = [
  { bg: 'bg-[#D4F0B0]', text: 'text-[#1E3A8A]', border: 'border-[#A8DE67]', badge: '#A8DE67', color: '#65A30D' },
  { bg: 'bg-[#C8E5FF]', text: 'text-[#1E40AF]', border: 'border-[#8EC4FA]', badge: '#8EC4FA', color: '#2563EB' },
  { bg: 'bg-[#FDC5E3]', text: 'text-[#9D174D]', border: 'border-[#FA95C6]', badge: '#FA95C6', color: '#DB2777' },
  { bg: 'bg-[#E5DEFF]', text: 'text-[#5B21B6]', border: 'border-[#C4B4F8]', badge: '#C4B4F8', color: '#7C3AED' },
];

export function SpeakoryIdea() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = PILLARS[activePillarIndex];
  const activeTheme = PASTEL_PILLARS[activePillarIndex];

  return (
    <section
      id="method"
      aria-label="The Speakory Method"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <span className="tag-chip bg-[#D4F0B0] text-[#1E3A8A] mb-3">
            #THE_4_PILLARS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171717] leading-tight">
            “Your child already has a voice.”
          </h2>
          <p className="mt-3 text-2xl sm:text-3xl font-editorial-italic font-normal text-[#7357FF]">
            We help them become confident enough to use it.
          </p>
        </div>

        {/* 4 Pillars Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#171717]/10 pb-4 gap-3 sm:gap-4">
          {PILLARS.map((pillar, idx) => {
            const isCurrent = idx === activePillarIndex;
            const theme = PASTEL_PILLARS[idx];
            return (
              <button
                key={pillar.number}
                onClick={() => setActivePillarIndex(idx)}
                className={`text-left transition-all pb-2 relative cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: isCurrent ? theme.color : '#6B6964' }}
                  >
                    {pillar.number}
                  </span>
                  <span
                    className={`text-base sm:text-lg tracking-tight ${
                      isCurrent ? 'font-extrabold text-[#171717]' : 'font-semibold text-[#6B6964] hover:text-[#171717]'
                    }`}
                  >
                    {pillar.title}
                  </span>
                </div>
                <div className="text-xs text-[#6B6964] mt-0.5 truncate hidden sm:block">
                  {pillar.subtitle}
                </div>

                {isCurrent && (
                  <div
                    className="absolute -bottom-4 left-0 right-0 h-[3px] rounded-full transition-all"
                    style={{ backgroundColor: theme.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <span
              className="text-7xl sm:text-9xl font-black tracking-tighter opacity-20 select-none block"
              style={{ color: activeTheme.color }}
            >
              {activePillar.number}
            </span>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#171717] -mt-6 sm:-mt-10 mb-2">
              {activePillar.title}
            </h3>
            <div
              className="text-xl sm:text-2xl font-editorial-italic font-normal mb-5"
              style={{ color: activeTheme.color }}
            >
              “{activePillar.subtitle}”
            </div>
            <p className="text-sm sm:text-base text-[#6B6964] leading-relaxed font-medium">
              {activePillar.description}
            </p>
          </div>

          <div className={`lg:col-span-7 ${activeTheme.bg} rounded-3xl p-6 sm:p-10 border ${activeTheme.border} relative shadow-sm`}>
            <div className="text-xs uppercase tracking-wider font-bold text-[#171717]/70 mb-2">
              Sample Studio Prompt
            </div>
            <div className="text-lg sm:text-xl font-bold text-[#171717] leading-relaxed mb-6">
              {activePillar.promptExample}
            </div>

            <div className="pt-5 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#171717]/60 font-semibold">
                  Direct Student Outcome
                </div>
                <div className="text-sm font-bold text-[#171717] mt-1">
                  {activePillar.studentOutcome}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#171717] bg-white/70 px-3 py-1 rounded-full border border-black/5 shrink-0">
                <span>Pillar {activePillar.number} Mastery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
