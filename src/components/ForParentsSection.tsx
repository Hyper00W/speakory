import { useState } from 'react';
import { FAQS, COHORTS } from '../data/content.ts';
import { ArrowRight, ChevronDown, Users, Mic, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';

const TRANSFORMATION_CARDS = [
  {
    from: '“Umm... I don’t know.”',
    to: '“Here’s what I think.”',
    context: 'When asked their viewpoint in a room',
  },
  {
    from: '“Can I go last?”',
    to: '“I’ll go first.”',
    context: 'Volunteering for presentations & tasks',
  },
  {
    from: '“What if they judge me?”',
    to: '“My ideas deserve to be heard.”',
    context: 'Overcoming stage fright & hesitation',
  },
];

const PARENT_BENEFITS = [
  {
    title: 'Small-Group Practice',
    desc: '3 to 4 peers per mentor. Never an intimidating 30-student classroom.',
    icon: Users,
    bg: 'bg-[#D4F0B0]',
    textColor: 'text-[#1E3A8A]',
  },
  {
    title: 'Speaking Activities',
    desc: 'Weekly 60-min live studio rhythm building subconscious conversational muscle.',
    icon: Mic,
    bg: 'bg-[#C8E5FF]',
    textColor: 'text-[#1E40AF]',
  },
  {
    title: 'Individual Feedback',
    desc: 'Constructive mentor coaching and notes after every session.',
    icon: Award,
    bg: 'bg-[#FDC5E3]',
    textColor: 'text-[#9D174D]',
  },
  {
    title: 'Psychological Safety',
    desc: 'A judgment-free space where making mistakes is celebrated as practice.',
    icon: HeartHandshake,
    bg: 'bg-[#E5DEFF]',
    textColor: 'text-[#5B21B6]',
  },
];

export function ForParentsSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedCohort, setSelectedCohort] = useState<number>(0);
  const [activeTransform, setActiveTransform] = useState<number>(0);

  return (
    <section
      id="parents"
      aria-label="For Parents"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16 space-y-12 sm:space-y-16">
        {/* Dominant Headline */}
        <div className="max-w-3xl">
          <span className="tag-chip bg-[#D4F0B0] text-[#1E3A8A] mb-3">
            #FOR_PARENTS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171717] leading-tight">
            “Your child already has a voice.”
          </h2>
          <p className="mt-3 text-2xl sm:text-3xl font-editorial-italic font-normal text-[#7357FF]">
            We help them become confident enough to use it.
          </p>
        </div>

        {/* Compact Visual Transformation Sequence: FROM -> TO */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest text-[#6B6964] font-bold">
              The Visible Shift
            </span>
            <div className="flex gap-1.5">
              {TRANSFORMATION_CARDS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTransform(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeTransform === idx ? 'bg-[#7357FF] w-6' : 'bg-[#171717]/20 hover:bg-[#171717]/40'
                  }`}
                  aria-label={`View shift ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
            {/* FROM */}
            <div className="md:col-span-5 bg-[#F1EFEA]/70 border border-[#171717]/8 rounded-2xl p-5 sm:p-7">
              <span className="text-[11px] font-mono uppercase font-bold text-[#8C8880] block mb-2">
                FROM — The Hesitant Reflex
              </span>
              <p className="text-xl sm:text-2xl font-editorial-italic text-[#6B6964] leading-snug">
                {TRANSFORMATION_CARDS[activeTransform].from}
              </p>
              <span className="text-[11px] text-[#8C8880] mt-3 block pt-2 border-t border-[#171717]/8">
                {TRANSFORMATION_CARDS[activeTransform].context}
              </span>
            </div>

            {/* Central Arrow */}
            <div className="md:col-span-2 flex justify-center py-1">
              <div className="w-10 h-10 rounded-full bg-[#D4F0B0] border border-[#A8DE67] flex items-center justify-center text-[#171717] shadow-2xs">
                <ArrowRight size={18} />
              </div>
            </div>

            {/* TO */}
            <div className="md:col-span-5 bg-[#E5DEFF] border border-[#7357FF]/30 rounded-2xl p-5 sm:p-7 shadow-xs">
              <span className="text-[11px] font-mono uppercase font-bold text-[#5B21B6] block mb-2">
                TO — The Speakory Stance
              </span>
              <p className="text-xl sm:text-2xl font-black text-[#171717] leading-snug">
                {TRANSFORMATION_CARDS[activeTransform].to}
              </p>
              <span className="text-[11px] text-[#7357FF] font-semibold mt-3 block pt-2 border-t border-[#7357FF]/20">
                Poise, conviction, and structured delivery
              </span>
            </div>
          </div>
        </div>

        {/* 4 Core Parent Benefits List */}
        <div>
          <div className="text-xs uppercase tracking-widest text-[#6B6964] font-bold mb-4">
            How Speakory Delivers Steady Growth
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARENT_BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 border border-[#171717]/8 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-8 h-8 rounded-full ${item.bg} ${item.textColor} flex items-center justify-center font-bold text-xs mb-3`}
                    >
                      <Icon size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-[#171717]">{item.title}</h3>
                    <p className="text-xs text-[#6B6964] mt-1.5 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Age Cohorts */}
        <div className="pt-4 border-t border-[#171717]/10">
          <div className="text-xs uppercase tracking-widest text-[#6B6964] font-bold mb-3">
            Age-Group Cohorts (Tailored Pedagogy)
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 max-w-md">
            {COHORTS.map((c, idx) => (
              <button
                key={c.range}
                type="button"
                onClick={() => setSelectedCohort(idx)}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  selectedCohort === idx
                    ? 'bg-[#171717] text-white border-[#171717] shadow-xs'
                    : 'bg-white text-[#6B6964] border-[#171717]/10 hover:border-[#171717]/30'
                }`}
              >
                Ages {c.range}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-6 bg-[#F8F6FE] rounded-2xl border border-[#7357FF]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-[#7357FF] font-bold uppercase">
                {COHORTS[selectedCohort].name} Cohort (Ages {COHORTS[selectedCohort].range})
              </span>
              <h4 className="text-base sm:text-lg font-bold text-[#171717] mt-0.5">
                {COHORTS[selectedCohort].headline}
              </h4>
              <p className="text-xs text-[#6B6964] mt-1 max-w-xl leading-relaxed">
                {COHORTS[selectedCohort].description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 shrink-0 self-start sm:self-auto">
              {COHORTS[selectedCohort].focusAreas.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="px-2.5 py-1 bg-white rounded-lg text-[11px] font-semibold text-[#171717] border border-[#171717]/8"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Compact FAQ Accordion */}
        <div className="pt-4 border-t border-[#171717]/10">
          <div className="text-xs uppercase tracking-widest text-[#6B6964] font-bold mb-4">
            Frequently Asked Questions
          </div>
          <div className="space-y-2.5">
            {FAQS.slice(0, 3).map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#171717]/8 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#171717] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#6B6964] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#7357FF]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#6B6964] leading-relaxed border-t border-[#171717]/6 pt-3">
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
