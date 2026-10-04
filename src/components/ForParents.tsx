import { useState } from 'react';
import { COHORTS, FAQS } from '../data/content.ts';
import { ChevronDown, Users, Calendar, Award, BarChart3, HeartHandshake, Mic } from 'lucide-react';

const PARENT_PILLARS = [
  {
    num: '01',
    title: 'Small-Group Speaking',
    desc: '4 to 6 peers maximum per mentor. Never an intimidating 30-child classroom.',
    icon: Users,
    bg: 'bg-[#D4F0B0]',
    textColor: 'text-[#1E3A8A]',
  },
  {
    num: '02',
    title: 'Regular Practice',
    desc: 'Weekly 60–75 minute studio rhythm that builds subconscious conversational muscle memory.',
    icon: Calendar,
    bg: 'bg-[#C8E5FF]',
    textColor: 'text-[#1E40AF]',
  },
  {
    num: '03',
    title: 'Presentation Activities',
    desc: 'Practical, slide-free storytelling, lightning pitches, and structured debates.',
    icon: Mic,
    bg: 'bg-[#FDC5E3]',
    textColor: 'text-[#9D174D]',
  },
  {
    num: '04',
    title: 'Individual Feedback',
    desc: 'Recorded video breakdowns with personalized mentor notes after every single class.',
    icon: Award,
    bg: 'bg-[#E5DEFF]',
    textColor: 'text-[#5B21B6]',
  },
  {
    num: '05',
    title: 'Progress Tracking',
    desc: 'Transparent growth metrics every 4 weeks across the 4 Pillars of Communication.',
    icon: BarChart3,
    bg: 'bg-[#D4F0B0]',
    textColor: 'text-[#1E3A8A]',
  },
  {
    num: '06',
    title: 'Psychological Safety',
    desc: 'A judgment-free space where making mistakes is celebrated as essential data.',
    icon: HeartHandshake,
    bg: 'bg-[#C8E5FF]',
    textColor: 'text-[#1E40AF]',
  },
];

export function ForParents() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedCohort, setSelectedCohort] = useState<number>(0);

  return (
    <section
      id="parents"
      aria-label="Information For Parents"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16">
        {/* Grounded, High-Trust Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <span className="tag-chip bg-[#E5DEFF] text-[#5B21B6] mb-3">
            #FOR_PARENTS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171717] leading-tight">
            “Because confidence doesn’t appear overnight.”
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#6B6964] font-medium leading-relaxed">
            Consistent practice, meaningful feedback and real opportunities to speak. No overnight miracles, no superficial scripts—just steady, compound growth in a structured environment.
          </p>
        </div>

        {/* The 6 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 border-y border-[#171717]/10">
          {PARENT_PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="flex flex-col bg-white rounded-2xl p-5 border border-[#171717]/6 shadow-xs">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className={`w-8 h-8 rounded-full ${item.bg} ${item.textColor} flex items-center justify-center font-bold text-xs`}>
                    <Icon size={16} />
                  </div>
                  <h3 className="text-base font-bold text-[#171717] tracking-tight">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#6B6964] leading-relaxed font-medium">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Age-Group Cohorts Breakdown */}
        <div className="mt-16 sm:mt-20">
          <div className="text-xs uppercase tracking-wider text-[#6B6964] font-bold mb-2">
            Curriculum by Age Group
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mb-8">
            Tailored for cognitive maturity.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COHORTS.map((cohort, idx) => {
              const isSelected = idx === selectedCohort;
              const cardColors = ['bg-[#D4F0B0]', 'bg-[#C8E5FF]', 'bg-[#FDC5E3]'];
              return (
                <div
                  key={cohort.range}
                  onClick={() => setSelectedCohort(idx)}
                  className={`rounded-3xl p-6 sm:p-8 transition-all border cursor-pointer ${
                    isSelected
                      ? `${cardColors[idx]} text-[#171717] border-black/10 shadow-md scale-[1.02]`
                      : 'bg-white text-[#171717] border-[#171717]/8 hover:border-[#171717]/20 shadow-xs'
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase tracking-wider mb-1 text-[#171717]/70">
                    {cohort.range}
                  </div>
                  <h4 className="text-xl font-black tracking-tight mb-1">{cohort.name}</h4>
                  <div className="text-xs font-editorial-italic font-normal mb-3 text-[#171717]/80">
                    {cohort.headline}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed mb-5 text-[#171717]/80 font-medium">
                    {cohort.description}
                  </p>

                  <div className="space-y-1.5 border-t pt-3.5 border-black/10">
                    <div className="text-[11px] uppercase tracking-wider font-bold opacity-70">
                      Core Focus
                    </div>
                    {cohort.focusAreas.map((fa, i) => (
                      <div key={i} className="text-xs flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                        <span>{fa}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/10 text-xs font-bold">
                    {cohort.sessionSize}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Parent FAQs Accordion */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-[#6B6964] font-bold mb-2">
            Common Questions
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight mb-6">
            Answers for thoughtful parents.
          </h3>

          <div className="divide-y divide-[#171717]/10 border-y border-[#171717]/10">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-base font-bold text-[#171717] group-hover:text-[#7357FF] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 shrink-0 text-[#6B6964] ${
                        isOpen ? 'rotate-180 text-[#7357FF]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-2.5 pb-1 text-sm text-[#6B6964] font-medium leading-relaxed animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
