import { useState } from 'react';
import { COMPARISONS } from '../data/content.ts';
import { MessageSquare, Users, Presentation, CheckCircle2, RotateCcw, X, Check } from 'lucide-react';
import { ASSETS } from '../data/assets.ts';

const EXPERIENCE_STAGES = [
  {
    id: 'speak',
    tag: '01. SPEAK',
    title: 'Spontaneous Speaking',
    desc: 'Zero prep time. Kids respond to unexpected prompts, training their brain to formulate coherent thoughts without freezing.',
    icon: MessageSquare,
    bg: 'bg-[#D4F0B0]',
    textColor: 'text-[#1E3A8A]',
  },
  {
    id: 'discuss',
    tag: '02. DISCUSS',
    title: 'Peer Debate & Discussion',
    desc: '3–4 students debate real-world issues. They learn how to defend their ideas with evidence and disagree politely.',
    icon: Users,
    bg: 'bg-[#C8E5FF]',
    textColor: 'text-[#1E40AF]',
  },
  {
    id: 'present',
    tag: '03. PRESENT',
    title: 'Structured Presentations',
    desc: 'Slide-free, authentic storytelling. Mastering presence, eye contact, and vocal modulation that holds attention.',
    icon: Presentation,
    bg: 'bg-[#FDC5E3]',
    textColor: 'text-[#9D174D]',
  },
  {
    id: 'feedback',
    tag: '04. GET FEEDBACK',
    title: 'Actionable Mentor Coaching',
    desc: 'No vague grades. Concrete feedback on filler words, pausing power, and message clarity given after each turn.',
    icon: CheckCircle2,
    bg: 'bg-[#E5DEFF]',
    textColor: 'text-[#5B21B6]',
  },
  {
    id: 'try-again',
    tag: '05. TRY AGAIN',
    title: 'Immediate Iteration',
    desc: 'Students immediately redo their speech applying the mentor’s advice, permanently cementing the new habit.',
    icon: RotateCcw,
    bg: 'bg-[#D4F0B0]',
    textColor: 'text-[#1E3A8A]',
  },
];

export function ExperienceDoing() {
  const [activeStageId, setActiveStageId] = useState('speak');
  const activeStage = EXPERIENCE_STAGES.find((s) => s.id === activeStageId) || EXPERIENCE_STAGES[0];

  return (
    <section
      id="experience"
      aria-label="The Speakory Experience"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16 space-y-12 sm:space-y-16">
        {/* Dominant Headline */}
        <div className="max-w-3xl">
          <span className="tag-chip bg-[#E5DEFF] text-[#5B21B6] mb-3">
            #THE_EXPERIENCE
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
            Not another <br />
            <span className="text-[#6B6964] line-through decoration-[#FDC5E3] decoration-4">
              English class.
            </span>
          </h2>
          <p className="mt-4 text-2xl sm:text-3xl font-editorial-italic font-normal text-[#171717]">
            A place where students{' '}
            <span className="font-extrabold underline decoration-[#7357FF] decoration-2 underline-offset-8">
              actually speak
            </span>
            .
          </p>
        </div>

        {/* The 5-Step Continuous Action Cycle: SPEAK -> DISCUSS -> PRESENT -> GET FEEDBACK -> TRY AGAIN */}
        <div>
          <div className="text-xs uppercase tracking-widest text-[#6B6964] font-bold mb-4">
            The Studio Loop in Action
          </div>

          {/* Interactive Chips Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {EXPERIENCE_STAGES.map((stage) => {
              const isActive = stage.id === activeStageId;
              const Icon = stage.icon;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] border ${
                    isActive
                      ? 'bg-[#171717] text-white border-[#171717] shadow-md'
                      : 'bg-white hover:bg-[#F8F6FE] text-[#6B6964] border-[#171717]/8'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-[11px] font-mono font-bold ${
                        isActive ? 'text-[#D4F0B0]' : 'text-[#8C8880]'
                      }`}
                    >
                      {stage.tag}
                    </span>
                    <Icon size={14} className={isActive ? 'text-[#D4F0B0]' : 'text-[#8C8880]'} />
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-bold truncate ${
                      isActive ? 'text-white' : 'text-[#171717]'
                    }`}
                  >
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Highlight Box */}
          <div className="mt-5 p-6 sm:p-8 bg-[#F8F6FE] rounded-3xl border border-[#7357FF]/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7357FF] uppercase mb-1">
                <span>Active Cycle</span>
                <span>·</span>
                <span>{activeStage.tag}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#171717]">{activeStage.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#6B6964] leading-relaxed font-medium">
                {activeStage.desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#171717]/8 shrink-0 min-w-[200px] shadow-2xs">
              <span className="text-[10px] font-bold text-[#6B6964] uppercase tracking-wider block">
                Classroom Metric
              </span>
              <span className="text-2xl font-black text-[#171717] block mt-0.5">
                70% Speaking Time
              </span>
              <span className="text-[11px] text-[#6B6964] mt-1 block">
                Never passive listening
              </span>
            </div>
          </div>
        </div>

        {/* Paradigm Comparison: Traditional vs Speakory Studio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4 border-t border-[#171717]/10">
          {/* Traditional Tuition */}
          <div className="border border-[#171717]/10 rounded-3xl p-6 sm:p-8 bg-[#F1EFEA]/40">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider mb-4">
              <X size={15} />
              <span>Traditional Tuition (Passive)</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#6B6964] font-medium">
              {COMPARISONS.slice(0, 4).map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-mono text-xs pt-0.5">✕</span>
                  <span>{c.traditional}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Speakory Studio */}
          <div className="border border-[#7357FF]/30 rounded-3xl p-6 sm:p-8 bg-[#E5DEFF]/40 relative shadow-sm">
            <div className="flex items-center gap-2.5 text-[#7357FF] font-bold text-xs uppercase tracking-wider mb-4">
              <img
                src={ASSETS.officialLogo}
                alt="Speakory"
                className="h-6 w-auto object-contain drop-shadow-xs"
              />
              <span>The Studio Model (Active)</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#171717] font-semibold">
              {COMPARISONS.slice(0, 4).map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#65A30D] font-mono text-xs pt-0.5">✓</span>
                  <span>{c.speakory}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final Punchline */}
        <div className="text-center pt-2">
          <p className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
            Confidence is built by{' '}
            <span className="underline decoration-[#FDC5E3] decoration-4 underline-offset-8">
              DOING
            </span>
            .{' '}
            <span className="font-editorial-italic font-normal text-[#6B6964] block sm:inline mt-1 sm:mt-0">
              Not by memorizing.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
