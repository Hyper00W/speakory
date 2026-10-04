import { useState, useEffect, useRef } from 'react';
import { PILLARS } from '../data/content.ts';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const PILLAR_CONFIG = [
  {
    step: '01',
    verb: 'THINK',
    action: 'Organize the idea.',
    bg: 'bg-[#D4F0B0]',
    cardBorder: 'border-[#A8DE67]',
    badgeBg: 'bg-[#D4F0B0]',
    badgeText: 'text-[#1E3A8A]',
    accentColor: '#4D7C0F',
    glowColor: 'rgba(168, 222, 103, 0.25)',
  },
  {
    step: '02',
    verb: 'SPEAK',
    action: 'Find the words.',
    bg: 'bg-[#C8E5FF]',
    cardBorder: 'border-[#8EC4FA]',
    badgeBg: 'bg-[#C8E5FF]',
    badgeText: 'text-[#1E40AF]',
    accentColor: '#1D4ED8',
    glowColor: 'rgba(142, 196, 250, 0.25)',
  },
  {
    step: '03',
    verb: 'EXPRESS',
    action: 'Make it clear.',
    bg: 'bg-[#FDC5E3]',
    cardBorder: 'border-[#FA95C6]',
    badgeBg: 'bg-[#FDC5E3]',
    badgeText: 'text-[#9D174D]',
    accentColor: '#BE185D',
    glowColor: 'rgba(250, 149, 198, 0.25)',
  },
  {
    step: '04',
    verb: 'CONNECT',
    action: 'Make it matter.',
    bg: 'bg-[#E5DEFF]',
    cardBorder: 'border-[#C4B4F8]',
    badgeBg: 'bg-[#E5DEFF]',
    badgeText: 'text-[#5B21B6]',
    accentColor: '#6D28D9',
    glowColor: 'rgba(196, 180, 248, 0.25)',
  },
];

export function MethodPillars() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll listener for desktop pinned experience
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Current progress through the pinned section: 0 to 1
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 0.999);
      const newIndex = Math.min(Math.floor(progress * 4), 3);
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPillar = PILLARS[activeIndex];
  const currentConfig = PILLAR_CONFIG[activeIndex];

  return (
    <section
      id="method"
      ref={containerRef}
      aria-label="The Speakory Method"
      className="relative w-full lg:h-[180vh] px-3 sm:px-6 lg:px-10 py-12 lg:py-0"
    >
      {/* Pinned Sticky Viewport on Desktop */}
      <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex items-center justify-center">
        <div
          className="w-full max-w-[1240px] bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-10 lg:p-14 transition-colors duration-500 relative overflow-hidden"
          style={{
            boxShadow: `0 25px 70px -15px ${currentConfig.glowColor}`,
          }}
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-[#171717]/10">
            <div>
              <span className="tag-chip bg-[#E5DEFF] text-[#5B21B6] mb-2.5">
                #THE_SPEAKORY_METHOD
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#171717] leading-tight">
                One Method.{' '}
                <span className="font-editorial-italic font-normal text-[#7357FF]">
                  Four Milestones.
                </span>
              </h2>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white/80 border border-[#171717]/10 p-1.5 rounded-full">
              {PILLAR_CONFIG.map((cfg, idx) => (
                <button
                  key={cfg.step}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    idx === activeIndex
                      ? `${cfg.badgeBg} ${cfg.badgeText} shadow-2xs`
                      : 'text-[#6B6964] hover:text-[#171717]'
                  }`}
                >
                  <span>{cfg.verb}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Scene Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Verb & Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-5xl sm:text-7xl font-black tracking-tighter opacity-30 select-none"
                  style={{ color: currentConfig.accentColor }}
                >
                  {currentConfig.step}
                </span>
                <div>
                  <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#171717]">
                    {currentConfig.verb}
                  </h3>
                  <div
                    className="text-lg sm:text-xl font-editorial-italic font-normal mt-0.5"
                    style={{ color: currentConfig.accentColor }}
                  >
                    “{currentConfig.action}”
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#6B6964] leading-relaxed font-medium pt-2">
                {currentPillar.description}
              </p>

              {/* Progress Flow Micro-indicator */}
              <div className="pt-3 hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-[#8C8880]">
                <span>Phase {activeIndex + 1} of 4</span>
                <span className="w-12 h-1 bg-[#171717]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7357FF] transition-all duration-300"
                    style={{ width: `${((activeIndex + 1) / 4) * 100}%` }}
                  />
                </span>
                <span className="text-[#7357FF]">
                  {activeIndex === 3 ? 'Mastery' : 'Scroll to advance'}
                </span>
              </div>
            </div>

            {/* Right: Studio Prompt & Real Outcome Card */}
            <div
              className={`lg:col-span-7 ${currentConfig.bg} rounded-3xl p-6 sm:p-8 border ${currentConfig.cardBorder} shadow-sm transition-all duration-500`}
            >
              <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-[#171717]/70">
                <span>Sample Studio Arena</span>
                <span className="text-[11px] font-mono bg-white/60 px-2.5 py-0.5 rounded-full">
                  Pillar {currentConfig.step}
                </span>
              </div>

              <div className="text-base sm:text-xl font-bold text-[#171717] leading-relaxed mb-6">
                “{currentPillar.promptExample}”
              </div>

              <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#171717]/60 font-semibold">
                    Direct Student Transformation
                  </div>
                  <div className="text-sm font-bold text-[#171717] mt-0.5 flex items-center gap-1.5">
                    <CheckCircle2 size={15} style={{ color: currentConfig.accentColor }} />
                    <span>{currentPillar.studentOutcome}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#171717] bg-white/70 px-3 py-1.5 rounded-full border border-black/5 shrink-0 self-start sm:self-auto">
                  <span>Next: {PILLAR_CONFIG[(activeIndex + 1) % 4].verb}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
