import { useState } from 'react';
import { CLASS_CYCLE } from '../data/content.ts';
import { ArrowRight } from 'lucide-react';

export function ClassExperience() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="experience"
      aria-label="The Class Experience"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16">
        {/* Dominant Headline */}
        <div className="max-w-4xl">
          <span className="tag-chip bg-[#D4F0B0] text-[#1E3A8A] mb-3">
            #ACTIVE_LEARNING
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171717] leading-tight">
            Confidence is built by{' '}
            <span className="underline decoration-[#FDC5E3] decoration-4 underline-offset-8">
              DOING
            </span>
            .
          </h2>
          <p className="mt-3 text-2xl sm:text-3xl font-editorial-italic font-normal text-[#6B6964]">
            Not by memorizing.
          </p>
        </div>

        {/* The 6-Step Visual Cycle */}
        <div className="mt-12 sm:mt-16">
          {/* Horizontal Step Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 border-b border-[#171717]/10 pb-5">
            {CLASS_CYCLE.map((cycle, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={cycle.step}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-3.5 rounded-2xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#171717] text-white shadow-md'
                      : 'bg-white hover:bg-[#F8F6FE] text-[#6B6964] border border-[#171717]/6'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-[#FDC5E3]' : 'text-[#6B6964]/60'
                      }`}
                    >
                      {cycle.step}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D4F0B0]" />}
                  </div>
                  <div
                    className={`text-sm sm:text-base font-bold tracking-tight ${
                      isActive ? 'text-white' : 'text-[#171717]'
                    }`}
                  >
                    {cycle.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive */}
          <div className="mt-8 bg-[#F8F6FE] rounded-3xl p-6 sm:p-12 border border-[#7357FF]/15 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xs">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#7357FF] font-bold uppercase tracking-wider mb-2">
                <span>Phase {CLASS_CYCLE[activeStep].step} of 06</span>
                <span aria-hidden="true">·</span>
                <span>Active Classroom Phase</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#171717] mb-2">
                {CLASS_CYCLE[activeStep].name}
              </h3>
              <div className="text-base sm:text-lg font-editorial-italic font-normal text-[#7357FF] mb-4">
                {CLASS_CYCLE[activeStep].tagline}
              </div>
              <p className="text-sm sm:text-base text-[#6B6964] font-medium leading-relaxed max-w-2xl">
                {CLASS_CYCLE[activeStep].detail}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
              <div className="bg-white rounded-2xl p-5 border border-[#171717]/8 w-full max-w-xs shadow-xs">
                <div className="text-xs font-bold text-[#6B6964] uppercase tracking-wider mb-1">
                  Session Metric
                </div>
                <div className="text-2xl font-black text-[#171717]">70% Speaking Time</div>
                <p className="text-xs text-[#6B6964] mt-1.5 leading-relaxed font-medium">
                  Every student commands the virtual floor instead of passively listening to lectures.
                </p>
                <div className="mt-4 pt-3 border-t border-[#171717]/8 flex items-center justify-between text-xs text-[#171717] font-semibold">
                  <span className="text-[#6B6964]">Next Step:</span>
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % CLASS_CYCLE.length)}
                    className="flex items-center gap-1 text-[#7357FF] hover:underline cursor-pointer"
                  >
                    <span>
                      {CLASS_CYCLE[(activeStep + 1) % CLASS_CYCLE.length].name}
                    </span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
