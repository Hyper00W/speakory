import { COMPARISONS } from '../data/content.ts';
import { Check, X } from 'lucide-react';
import { ASSETS } from '../data/assets.ts';

const KINETIC_ITEMS = [
  { text: 'Conversation', bg: 'bg-[#C8E5FF]', textCol: 'text-[#1E40AF]' },
  { text: 'Storytelling', bg: 'bg-[#FDC5E3]', textCol: 'text-[#9D174D]' },
  { text: 'Presentations', bg: 'bg-[#D4F0B0]', textCol: 'text-[#1E3A8A]' },
  { text: 'Public Speaking', bg: 'bg-[#E5DEFF]', textCol: 'text-[#5B21B6]' },
  { text: 'Group Discussions', bg: 'bg-[#C8E5FF]', textCol: 'text-[#1E40AF]' },
  { text: 'Real-world Communication', bg: 'bg-[#FDC5E3]', textCol: 'text-[#9D174D]' },
];

export function NotEnglishClass() {
  return (
    <section
      aria-label="Not Another English Class"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16">
        {/* Kinetic Title Composition */}
        <div className="max-w-4xl">
          <span className="tag-chip bg-[#E5DEFF] text-[#5B21B6] mb-3">
            #A_NEW_CATEGORY
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

        {/* Kinetic Flowing Typography Ticker with Pastel Badges */}
        <div className="my-10 sm:my-16 py-6 border-y border-[#171717]/10 flex flex-wrap gap-3 sm:gap-4 items-center">
          {KINETIC_ITEMS.map((item, idx) => (
            <div
              key={item.text}
              className={`tag-chip ${item.bg} ${item.textCol} text-sm sm:text-base font-extrabold px-4 py-2 cursor-default select-none shadow-xs`}
            >
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* The Direct Paradigm Comparison: Traditional vs Speakory */}
        <div className="mt-8">
          <div className="text-xs uppercase tracking-widest text-[#6B6964] font-bold mb-6">
            The Paradigm Shift
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Traditional Grammar Classes */}
            <div className="border border-[#171717]/10 rounded-3xl p-6 sm:p-8 bg-[#F1EFEA]/50">
              <div className="flex items-center gap-2 text-rose-500 font-bold text-sm mb-5 uppercase tracking-wider">
                <X size={16} />
                <span>Traditional Grammar Tuition</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-[#6B6964] font-medium">
                {COMPARISONS.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-mono text-xs pt-0.5">✕</span>
                    <span>{c.traditional}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Speakory Studio Model */}
            <div className="border border-[#7357FF]/30 rounded-3xl p-6 sm:p-8 bg-[#E5DEFF]/40 relative shadow-sm">
              <div className="flex items-center gap-3 text-[#7357FF] font-bold text-sm mb-5 uppercase tracking-wider">
                <img
                  src={ASSETS.officialLogo}
                  alt="Speakory"
                  className="h-8 sm:h-9 w-auto max-w-[150px] object-contain drop-shadow-xs"
                />
                <span>The Studio Model</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-[#171717] font-semibold">
                {COMPARISONS.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#65A30D] font-mono text-xs pt-0.5">✓</span>
                    <span>{c.speakory}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
