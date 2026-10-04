import { useState } from 'react';
import { PROBLEM_QUESTIONS } from '../data/content.ts';
import { ArrowUpRight } from 'lucide-react';

export function CoreProblem() {
  const [activeQuestionId, setActiveQuestionId] = useState<string>(PROBLEM_QUESTIONS[0].id);

  const activeQuestion =
    PROBLEM_QUESTIONS.find((q) => q.id === activeQuestionId) || PROBLEM_QUESTIONS[0];

  return (
    <section
      id="problem"
      aria-label="The Real Communication Dilemma"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16">
        {/* Headline */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="tag-chip bg-[#C8E5FF] text-[#1E40AF]">
              #THE_DILEMMA
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
            Knowing English <br />
            <span className="font-editorial-italic font-normal text-[#7357FF]">
              isn’t enough.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#6B6964] font-medium max-w-2xl leading-relaxed">
            Grammar worksheets don’t teach courage. Scoring 98% on a written exam doesn’t stop a child’s voice from trembling when twenty eyes turn to them in a classroom.
          </p>
        </div>

        {/* 5 Real Questions */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#171717]/10">
            {PROBLEM_QUESTIONS.map((item, index) => {
              const isActive = item.id === activeQuestionId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveQuestionId(item.id)}
                  onMouseEnter={() => setActiveQuestionId(item.id)}
                  className={`group text-left py-5 sm:py-6 transition-all duration-200 cursor-pointer flex items-baseline justify-between gap-4`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold transition-colors ${
                        isActive ? 'text-[#7357FF]' : 'text-[#6B6964]/60'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <h3
                      className={`text-lg sm:text-2xl font-bold tracking-tight transition-all ${
                        isActive
                          ? 'text-[#171717] translate-x-1.5'
                          : 'text-[#6B6964] group-hover:text-[#171717]'
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className={`transition-all duration-200 shrink-0 ${
                      isActive
                        ? 'text-[#7357FF] opacity-100 translate-x-1 -translate-y-1'
                        : 'opacity-0 group-hover:opacity-40 text-[#6B6964]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Student Dilemma in Pastel Card */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-[#E5DEFF] rounded-3xl p-6 sm:p-8 border border-[#7357FF]/15 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-[#5B21B6] font-bold mb-3">
                What Students Secretly Experience
              </div>
              <blockquote className="text-base sm:text-lg text-[#171717] font-editorial-italic leading-relaxed">
                {activeQuestion.studentDilemma}
              </blockquote>

              <div className="mt-6 pt-5 border-t border-[#7357FF]/20">
                <div className="text-xs uppercase tracking-wider text-[#7357FF] font-bold mb-1.5">
                  How Speakory Changes It
                </div>
                <p className="text-xs sm:text-sm text-[#171717] font-medium leading-relaxed">
                  {activeQuestion.speakorySolution}
                </p>
              </div>

              <div className="mt-5 text-xs text-[#6B6964] bg-white/70 p-3.5 rounded-xl border border-[#7357FF]/10">
                <span className="font-bold text-[#171717]">Reality check: </span>
                {activeQuestion.statContext}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
