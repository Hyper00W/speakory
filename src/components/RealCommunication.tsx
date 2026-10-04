import { useState } from 'react';
import { REAL_ARENAS } from '../data/content.ts';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function RealCommunication() {
  const [selectedArenaId, setSelectedArenaId] = useState(REAL_ARENAS[0].id);
  const activeArena = REAL_ARENAS.find((a) => a.id === selectedArenaId) || REAL_ARENAS[0];

  return (
    <section
      aria-label="Real Communication Arenas"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="tag-chip bg-[#C8E5FF] text-[#1E40AF] mb-3">
            #REAL_WORLD_SKILLS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171717] leading-tight">
            “Communication isn’t a subject. <br />
            <span className="font-editorial-italic font-normal text-[#7357FF]">
              It’s a skill you use everywhere.”
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B6964] font-medium">
            Life doesn’t ask for multiple-choice answers. It asks you to stand up, look people in the eyes, and speak your mind.
          </p>
        </div>

        {/* 6 Arenas Grid / Interactive Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of 6 Real Arenas */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {REAL_ARENAS.map((arena, index) => {
              const isSelected = arena.id === selectedArenaId;
              return (
                <button
                  key={arena.id}
                  onClick={() => setSelectedArenaId(arena.id)}
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all cursor-pointer flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                      : 'bg-white hover:bg-[#F8F6FE] text-[#171717] border-[#171717]/6'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-[#FDC5E3]' : 'text-[#6B6964]'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="font-bold text-base sm:text-lg tracking-tight">
                      {arena.title}
                    </span>
                  </div>

                  <ArrowRight
                    size={16}
                    className={`transition-transform duration-200 ${
                      isSelected ? 'translate-x-1 text-[#FDC5E3]' : 'opacity-30'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: In-Depth Scenario Contrast in Pastel Card */}
          <div className="lg:col-span-7 bg-[#E5DEFF]/60 rounded-3xl p-6 sm:p-10 border border-[#7357FF]/15 relative shadow-xs">
            <div className="text-xs uppercase tracking-wider font-bold text-[#5B21B6] mb-1.5">
              Everyday Situation
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight mb-1">
              {activeArena.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6964] font-medium mb-6">
              {activeArena.context}
            </p>

            <div className="space-y-4">
              {/* Hesitant before */}
              <div className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-black/5">
                <div className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                  Before Speakory (Internal Monologue)
                </div>
                <div className="text-sm sm:text-base text-[#6B6964] font-editorial-italic">
                  {activeArena.beforeThought}
                </div>
              </div>

              {/* Confident After */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#7357FF]/20 shadow-xs">
                <div className="text-xs font-bold text-[#65A30D] uppercase tracking-wider mb-1">
                  After Speakory (Spoken with Conviction)
                </div>
                <div className="text-sm sm:text-base text-[#171717] font-bold">
                  {activeArena.afterTransformation}
                </div>
              </div>

              {/* The Technique */}
              <div className="pt-3 border-t border-[#7357FF]/15 flex items-start gap-2.5 text-xs text-[#6B6964]">
                <ShieldCheck size={16} className="text-[#7357FF] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717]">Speakory Technique: </strong>
                  {activeArena.technique}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
