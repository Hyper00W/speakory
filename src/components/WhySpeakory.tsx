export function WhySpeakory() {
  const principles = [
    {
      num: '01',
      title: 'PRACTICE',
      core: 'Students speak.',
      elaboration:
        'You cannot learn to swim from a textbook, and you cannot learn conviction from a lecture. Students spend the overwhelming majority of every session on their feet talking.',
      bg: 'bg-[#D4F0B0]',
      color: '#65A30D',
    },
    {
      num: '02',
      title: 'FEEDBACK',
      core: 'Students understand what to improve.',
      elaboration:
        'Not vague pats on the back. Concrete, kind, and immediate coaching on pace, body language, argument structure, and eliminating fillers.',
      bg: 'bg-[#C8E5FF]',
      color: '#2563EB',
    },
    {
      num: '03',
      title: 'CONFIDENCE',
      core: 'Students keep showing up.',
      elaboration:
        'When the fear of judgment is replaced with psychological safety and mastery, speaking ceases to be terrifying. It becomes an empowering superpower.',
      bg: 'bg-[#FDC5E3]',
      color: '#DB2777',
    },
  ];

  return (
    <section
      id="why"
      aria-label="Why Speakory"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.1)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="tag-chip bg-[#D4F0B0] text-[#1E3A8A] mb-3">
            #FIRST_PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171717] leading-tight">
            Why Speakory works.
          </h2>
        </div>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 border-t border-[#171717]/10 pt-10">
          {principles.map((p) => (
            <div key={p.num} className="flex flex-col bg-white rounded-3xl p-6 sm:p-8 border border-[#171717]/6 shadow-xs">
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest mb-3"
                style={{ color: p.color }}
              >
                Principle {p.num}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717] mb-1">
                {p.title}
              </h3>
              <div
                className="text-base sm:text-lg font-editorial-italic font-normal mb-4"
                style={{ color: p.color }}
              >
                {p.core}
              </div>
              <p className="text-xs sm:text-sm text-[#6B6964] font-medium leading-relaxed">
                {p.elaboration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
