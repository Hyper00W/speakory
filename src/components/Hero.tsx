import { useState, useEffect } from 'react';
import { Play, Sparkles, MapPin, ArrowRight, PhoneCall, Calendar } from 'lucide-react';
import { ASSETS } from '../data/assets.ts';
import { getWhatsAppUrl } from '../config/whatsapp.ts';

interface HeroProps {
  onOpenTrial?: () => void;
}

interface ThoughtBubble {
  id: string;
  text: string;
  position: string;
  tailDirection: 'left' | 'right';
  speed: number;
}

const THOUGHT_BUBBLES: ThoughtBubble[] = [
  {
    id: 'hello',
    text: '“hello”',
    position: 'top-[8%] left-[10%] sm:left-[16%]',
    tailDirection: 'left',
    speed: 0.9,
  },
  {
    id: 'i-think',
    text: '“I think...”',
    position: 'top-[10%] right-[12%] sm:right-[18%]',
    tailDirection: 'right',
    speed: 1.1,
  },
  {
    id: 'explain',
    text: '“let me explain”',
    position: 'top-[36%] left-[4%] sm:left-[6%]',
    tailDirection: 'left',
    speed: 1.2,
  },
  {
    id: 'my-idea',
    text: '“my idea is...”',
    position: 'top-[38%] right-[4%] sm:right-[6%]',
    tailDirection: 'right',
    speed: 1.0,
  },
  {
    id: 'hear-me-out',
    text: '“wait, hear me out.”',
    position: 'top-[52%] right-[10%] sm:right-[14%]',
    tailDirection: 'right',
    speed: 1.25,
  },
];

export function Hero({ onOpenTrial }: HeroProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      setMouseOffset({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      aria-label="Hero Introduction"
      className="relative w-full min-h-screen bg-[#EBE8FA] pt-24 sm:pt-28 pb-16 px-3 sm:px-6 lg:px-10 flex flex-col justify-center items-center overflow-hidden select-none"
    >
      {/* ========================================================
          WAVY PASTEL LAVENDER RIBBONS BACKGROUND (MATCHING REFERENCE)
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover opacity-60"
        >
          {/* Top gentle wavy ribbon */}
          <path
            d="M-100 120 C 300 40, 700 180, 1100 80 C 1300 40, 1500 100, 1600 120"
            stroke="#D6CBFA"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M-100 120 C 300 40, 700 180, 1100 80 C 1300 40, 1500 100, 1600 120"
            stroke="#C4B4F8"
            strokeWidth="4"
            strokeDasharray="12 12"
            strokeLinecap="round"
          />

          {/* Middle crossing ribbon */}
          <path
            d="M-100 420 C 250 520, 600 320, 950 480 C 1200 580, 1450 420, 1600 460"
            stroke="#D6CBFA"
            strokeWidth="42"
            strokeLinecap="round"
          />
          <path
            d="M-100 420 C 250 520, 600 320, 950 480 C 1200 580, 1450 420, 1600 460"
            stroke="#C4B4F8"
            strokeWidth="5"
            strokeDasharray="14 14"
            strokeLinecap="round"
          />

          {/* Bottom gentle ribbon */}
          <path
            d="M-100 780 C 300 700, 800 860, 1200 740 C 1400 680, 1550 720, 1650 750"
            stroke="#D6CBFA"
            strokeWidth="36"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ========================================================
          CENTRAL FLOATING STUDIO CARD CANVAS (MATCHING REFERENCE)
      ======================================================== */}
      <div className="relative z-10 w-full max-w-[1240px] bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_25px_70px_-15px_rgba(115,87,255,0.14)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* ========================================================
            DOODLE TAG CHIPS AROUND HEADLINE (MATCHING REFERENCE)
        ======================================================== */}

        {/* Tag 1: Upper-left #ARTWORK / #CONFIDENCE with dashed curl loop */}
        <div className="absolute top-10 sm:top-14 left-6 sm:left-12 z-20 hidden md:block">
          {/* Dashed loop doodle SVG */}
          <svg
            className="w-16 h-16 text-[#B8AAFA] mb-1 -ml-3"
            viewBox="0 0 80 80"
            fill="none"
          >
            <path
              d="M20 70 C 10 30, 40 10, 60 30 C 70 45, 50 65, 35 55 C 20 45, 30 20, 50 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
          <span className="tag-chip bg-[#C8E5FF] text-[#1E40AF] -rotate-6 shadow-sm">
            #CONFIDENCE
          </span>
        </div>

        {/* Tag 2: Upper-right #WRITING with dashed curl loop */}
        <div className="absolute top-8 sm:top-12 right-12 sm:right-24 z-20 hidden md:block">
          <svg
            className="w-16 h-16 text-[#B8AAFA] mb-1 ml-6"
            viewBox="0 0 80 80"
            fill="none"
          >
            <path
              d="M60 70 C 70 30, 40 10, 20 30 C 10 45, 30 65, 45 55 C 60 45, 50 20, 30 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
          <span className="tag-chip bg-[#E5DEFF] text-[#5B21B6] rotate-3 shadow-sm">
            #SPEECH
          </span>
        </div>

        {/* Tag 3: Mid-right #DRAWING */}
        <div className="absolute top-36 sm:top-48 right-6 sm:right-14 z-20 hidden lg:block">
          <span className="tag-chip bg-[#FDC5E3] text-[#9D174D] rotate-6 shadow-sm">
            #DEBATE
          </span>
        </div>

        {/* ========================================================
            THOUGHT DIALOGUE BOXES FLOATING WITH MOUSE MOVEMENT
        ======================================================== */}
        {THOUGHT_BUBBLES.map((bubble) => {
          const shiftX = mouseOffset.x * bubble.speed * 14;
          const shiftY = mouseOffset.y * bubble.speed * 14;

          return (
            <div
              key={bubble.id}
              className={`absolute pointer-events-auto transition-transform duration-300 ease-out hidden sm:block z-20 ${bubble.position}`}
              style={{
                transform: `translate3d(${shiftX}px, ${shiftY}px, 0)`,
              }}
            >
              <div
                className={`dialogue-bubble-light ${
                  bubble.tailDirection === 'left'
                    ? 'bubble-tail-light-left'
                    : 'bubble-tail-light-right'
                } px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 cursor-pointer shadow-xs`}
              >
                <span className="w-2 h-2 rounded-full bg-[#7357FF] animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#171717]">
                  {bubble.text}
                </span>
              </div>
            </div>
          );
        })}

        {/* ========================================================
            HERO MAIN HEADLINE (EXACT STRUCTURE FROM REFERENCE)
        ======================================================== */}
        <div className="text-center my-6 sm:my-12 relative z-30">
          {/* Official Brand Badge with Logo (Prominent & Obvious) */}
          <div className="inline-flex items-center gap-2.5 sm:gap-4 px-3.5 sm:px-7 py-2 sm:py-3.5 max-w-[95vw] rounded-full bg-white/95 border border-[#171717]/10 shadow-md mb-6 sm:mb-8 hover:shadow-lg transition-all duration-300">
            <img
              src={ASSETS.officialLogo}
              alt="Speakory"
              className="h-7 sm:h-10 w-auto object-contain drop-shadow-xs"
            />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7357FF] shrink-0" />
            <span className="text-[11px] sm:text-sm text-[#7357FF] font-bold tracking-tight whitespace-nowrap">
              Speak. Express. Stand Out.
            </span>
          </div>

          {/* Top Line: Bold Modern Sans "Unique" / "Speak" + Inline Video Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-[#171717] leading-none">
              Speak
            </h1>

            {/* Inline Capsule Pill matching reference (Lime green capsule with student photos & WhatsApp play button) */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 pr-2 sm:pr-3 bg-[#D4F0B0] hover:bg-[#c6e99c] rounded-full transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
              title="Chat with Speakory on WhatsApp"
            >
              {/* Stacked student circular avatars */}
              <div className="flex -space-x-2 overflow-hidden items-center pl-1">
                <img
                  src={ASSETS.studentYoungGirl}
                  alt="Student avatar"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-[#D4F0B0]"
                />
                <img
                  src={ASSETS.studentTeenBoy}
                  alt="Student avatar"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-[#D4F0B0]"
                />
                <img
                  src={ASSETS.studentTeenGirl}
                  alt="Student avatar"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-[#D4F0B0]"
                />
              </div>

              {/* Call / Connect icon button */}
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#171717] text-white flex items-center justify-center transition-colors shadow-xs">
                <PhoneCall size={12} className="text-[#D4F0B0]" />
              </div>
            </a>
          </div>

          {/* Bottom Line: 3D Map Pin + Serif Italic "with Confidence" (matching reference "Kids Academy") */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-1 sm:mt-2">
            {/* 3D Map Pin Icon matching reference */}
            <div className="relative group shrink-0 hidden sm:block">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FDC5E3] flex items-center justify-center shadow-md text-[#7357FF] transform -rotate-12 transition-transform duration-300 group-hover:scale-110">
                <MapPin size={22} fill="currentColor" />
              </div>
              <div className="w-8 h-2 rounded-full bg-[#D4F0B0] mx-auto mt-1 blur-[1px]" />
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial-italic font-normal tracking-tight text-[#171717]">
              with Confidence
            </h2>
          </div>
        </div>

        {/* ========================================================
            SUB-DESCRIPTION WITH SPARKLE DOODLES (LOWER-LEFT)
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-6 relative">
            {/* Sparkle rays doodle */}
            <div className="flex items-center gap-1 text-[#FDC5E3] mb-2">
              <span className="w-3 h-0.5 bg-[#FDC5E3] rotate-45 rounded-full" />
              <span className="w-4 h-0.5 bg-[#FDC5E3] rounded-full" />
              <span className="w-3 h-0.5 bg-[#FDC5E3] -rotate-45 rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-[#6B6964] leading-relaxed max-w-md font-medium">
              Speakory is a communication academy where kids and teenagers master spontaneous conversation, debate, presentations, and social presence through active practice.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-wrap lg:justify-end items-center gap-3.5">
            <button
              type="button"
              onClick={onOpenTrial}
              className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#7357FF] hover:bg-[#5B3EE6] text-white font-extrabold shadow-[0_12px_32px_-4px_rgba(115,87,255,0.42)] hover:shadow-[0_16px_36px_-4px_rgba(115,87,255,0.58)] transition-all duration-300 cursor-pointer hover:-translate-y-1 active:translate-y-0"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <Calendar size={17} className="text-[#D4F0B0]" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold tracking-tight leading-tight">
                  <span>Book a Call with Us</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[11px] font-medium text-white/85 block leading-tight mt-0.5">
                  Pick your preferred 6–9 PM slot
                </span>
              </div>
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-full bg-white hover:bg-[#171717] text-[#171717] hover:text-white border border-[#171717]/10 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
            >
              <PhoneCall size={14} className="text-[#7357FF]" />
              <span>Instant Chat</span>
            </a>
          </div>
        </div>

        {/* ========================================================
            THE 3 PASTEL PROGRAM CARDS (EXACT MATCH TO REFERENCE IMAGE)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {/* CARD 1: Lime Green Pastel ("Visual Arts" in ref -> "Foundations of Voice") */}
          <div className="relative bg-[#D4F0B0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[400px] overflow-hidden group shadow-xs hover:shadow-md transition-shadow">
            {/* Wavy line doodle vector in background */}
            <svg
              className="absolute inset-0 w-full h-full text-[#A8DE67] opacity-60 pointer-events-none"
              viewBox="0 0 300 400"
              fill="none"
            >
              <path
                d="M40 0 C 100 120, 20 220, 140 280 C 220 320, 280 260, 260 400"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>

            {/* Top header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <img
                  src={ASSETS.officialLogo}
                  alt="Speakory"
                  className="h-9 sm:h-11 w-auto max-w-[160px] sm:max-w-[190px] object-contain drop-shadow-xs"
                />
                <span className="px-2.5 py-0.5 rounded-full bg-white/70 text-[11px] font-bold text-[#171717] border border-black/5">
                  10–12 years
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
                Expressive Voice
              </h3>
            </div>

            {/* Bottom student photo in rounded capsule */}
            <div className="relative z-10 mt-auto pt-6 flex justify-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white/80 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src={ASSETS.studentYoungGirl}
                  alt="Young student smiling"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* CARD 2: Sky Blue Pastel ("Physical activities" in ref -> "Discussion & Debate") */}
          <div className="relative bg-[#C8E5FF] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[400px] overflow-hidden group shadow-xs hover:shadow-md transition-shadow">
            {/* Ocean wave doodles in background */}
            <svg
              className="absolute bottom-12 left-0 right-0 w-full text-[#8EC4FA] opacity-70 pointer-events-none"
              viewBox="0 0 300 80"
              fill="none"
            >
              <path
                d="M0 20 C 40 5, 80 35, 120 20 C 160 5, 200 35, 240 20 C 270 10, 290 25, 300 20"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                d="M0 45 C 40 30, 80 60, 120 45 C 160 30, 200 60, 240 45 C 270 35, 290 50, 300 45"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                d="M0 70 C 40 55, 80 85, 120 70 C 160 55, 200 85, 240 70 C 270 60, 290 75, 300 70"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>

            {/* Top header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <img
                  src={ASSETS.officialLogo}
                  alt="Speakory"
                  className="h-9 sm:h-11 w-auto max-w-[160px] sm:max-w-[190px] object-contain drop-shadow-xs"
                />
                <span className="px-2.5 py-0.5 rounded-full bg-white/70 text-[11px] font-bold text-[#171717] border border-black/5">
                  13–15 years
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
                Debate & Persuasion
              </h3>
            </div>

            {/* Student photo with star accents */}
            <div className="relative z-10 mt-auto pt-6 flex justify-center items-center">
              <span className="text-amber-400 text-xl animate-pulse mr-2">★</span>
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white/80 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src={ASSETS.studentTeenBoy}
                  alt="Teen boy student smiling"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-amber-400 text-xl animate-pulse ml-2">★</span>
            </div>
          </div>

          {/* CARD 3: Baby Pink Pastel ("School preparation" in ref -> "Stage & Leadership") */}
          <div className="relative bg-[#FDC5E3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[400px] overflow-hidden group shadow-xs hover:shadow-md transition-shadow">
            {/* Star watermark shapes in background */}
            <div className="absolute inset-0 pointer-events-none opacity-30 text-[#FA95C6] flex flex-wrap gap-8 p-4">
              <span className="text-7xl font-black">★</span>
              <span className="text-9xl font-black ml-auto">★</span>
              <span className="text-8xl font-black mt-auto">★</span>
            </div>

            {/* Top header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <img
                  src={ASSETS.officialLogo}
                  alt="Speakory"
                  className="h-9 sm:h-11 w-auto max-w-[160px] sm:max-w-[190px] object-contain drop-shadow-xs"
                />
                <span className="px-2.5 py-0.5 rounded-full bg-white/70 text-[11px] font-bold text-[#171717] border border-black/5">
                  16–18 years
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
                Stage & Leadership
              </h3>
            </div>

            {/* Student photo in rounded capsule */}
            <div className="relative z-10 mt-auto pt-6 flex justify-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white/80 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src={ASSETS.studentTeenGirl}
                  alt="High school girl student expressive"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
