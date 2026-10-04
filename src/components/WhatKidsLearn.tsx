import { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  PhoneCall, 
  Trophy, 
  Mic2, 
  Lightbulb, 
  ShieldCheck, 
  Smile, 
  Zap, 
  Compass, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp.ts';

interface MissionModule {
  id: string;
  tag: string;
  badgeColor: string;
  badgeTextColor: string;
  title: string;
  tagline: string;
  icon: typeof Mic2;
  realLifeWhy: string;
  activities: {
    name: string;
    description: string;
    xp: string;
    outcome: string;
  }[];
}

const MISSIONS: MissionModule[] = [
  {
    id: 'spontaneous',
    tag: 'MODULE 01 · INSTANT THINKING',
    badgeColor: 'bg-[#D4F0B0]',
    badgeTextColor: 'text-[#1E3A8A]',
    title: 'The Spontaneous Brain',
    tagline: 'Thinking on your feet with zero fear and zero "umm / uhh".',
    icon: Zap,
    realLifeWhy: 'Kids learn to respond instantly in viva exams, social circles, and classroom questions without going blank.',
    activities: [
      {
        name: 'The 60-Second Thunderbolts',
        description: 'A mystery word or funny topic drops on screen. Kids speak for 60 seconds without filler words, creating an instant opening, middle, and punchline.',
        xp: '+150 Quick Thinking XP',
        outcome: 'Kills the habit of saying "uhmm, like, you know" forever.'
      },
      {
        name: 'The Crisis Newsroom Anchor',
        description: 'Breaking news simulation! You are live on camera reporting an unexpected event (e.g. aliens landed on school ground). Kids deliver facts with calm authority.',
        xp: '+200 Composure XP',
        outcome: 'Teaches panic management and maintaining a confident voice under sudden pressure.'
      },
      {
        name: 'The Impromptu Object Story',
        description: 'Pick any everyday object (a broken pencil, a coffee mug) and pitch why it has the power to change the world.',
        xp: '+120 Creative Hook XP',
        outcome: 'Sharpens lateral creativity and associative speaking in seconds.'
      }
    ]
  },
  {
    id: 'persuasion',
    tag: 'MODULE 02 · REAL PERSUASION',
    badgeColor: 'bg-[#C8E5FF]',
    badgeTextColor: 'text-[#1E40AF]',
    title: 'Debate, Logic & The Shark Tank',
    tagline: 'Not shouting or arguing — persuading with structure, logic, and warmth.',
    icon: Flame,
    realLifeWhy: 'Helps your child stand their ground respectfully, handle disagreements with peers, and convince any listener.',
    activities: [
      {
        name: 'The Junior Shark Tank Arena',
        description: 'Kids invent a crazy invention (e.g. self-writing homework pen or solar shoe) and pitch it to mentor "investors" using pricing, problem, and solution logic.',
        xp: '+250 Persuasion XP',
        outcome: 'Builds business-grade structured thinking and conviction.'
      },
      {
        name: 'The Fairytale Courtroom Trial',
        description: 'Put classic storybook characters on trial! Defend the Big Bad Wolf or prosecute Goldilocks using evidence-based arguments and cross-examination.',
        xp: '+220 Critical Logic XP',
        outcome: 'Distinguishes emotional outburst from fact-backed logical rebuttal.'
      },
      {
        name: 'The Respectful Disagreement Ring',
        description: 'Two students take opposite sides on kid-relatable topics (homework bans, gaming hours). The rule: You must validate the other side before countering.',
        xp: '+180 Diplomacy XP',
        outcome: 'Prepares kids for healthy conflicts without tears or defensiveness.'
      }
    ]
  },
  {
    id: 'presence',
    tag: 'MODULE 03 · BODY LANGUAGE & STAGE GRAVITY',
    badgeColor: 'bg-[#FDC5E3]',
    badgeTextColor: 'text-[#9D174D]',
    title: 'Stage Gravity & Unshakable Presence',
    tagline: 'Commanding a room before you even utter your first sentence.',
    icon: Trophy,
    realLifeWhy: 'Stops slouching, nervous hand fidgeting, and eye contact avoidance. Commands instant natural respect.',
    activities: [
      {
        name: 'The 3-Point Audience Eye Radar',
        description: 'Kids practice scanning the room using our 3-point visual radar technique so every listener feels personally spoken to.',
        xp: '+160 Eye Contact XP',
        outcome: 'Removes the awkward habit of staring at the floor or ceiling while talking.'
      },
      {
        name: 'Voice Modulation & The Power Pause',
        description: 'Mastering the 4 levers of speech: pitch, pace, volume, and the suspenseful 2-second silence that makes everyone lean in.',
        xp: '+190 Vocal Dynamics XP',
        outcome: 'Transforms monotone, robotic school recitation into dynamic, cinematic speech.'
      },
      {
        name: 'The Stage Faux-Pas Flip',
        description: 'Accidentally dropped your cue card? Froze on stage? Kids practice 3 secret recovery formulas using humor and grace.',
        xp: '+200 Resilience XP',
        outcome: 'De-stigmatizes mistakes and eliminates stage fright at its root.'
      }
    ]
  },
  {
    id: 'social',
    tag: 'MODULE 04 · EVERYDAY SOCIAL MASTERY',
    badgeColor: 'bg-[#E5DEFF]',
    badgeTextColor: 'text-[#5B21B6]',
    title: 'Social Charisma & Life EQ',
    tagline: 'Because communication starts at the dinner table, school corridors, and friendships.',
    icon: Smile,
    realLifeWhy: 'Builds social confidence, effortless small talk with guests, and the courage to make friends anywhere.',
    activities: [
      {
        name: 'The Guest & Family Host Challenge',
        description: 'How to welcome house guests, initiate engaging adult conversations, and introduce oneself with warm pride and poise.',
        xp: '+140 Social Grace XP',
        outcome: 'No more hiding behind parents when relatives or guests visit home.'
      },
      {
        name: 'The Podcast Host Interview Quest',
        description: 'Kids take turns being the show host and the celebrity guest, learning the golden art of asking curious, intelligent follow-up questions.',
        xp: '+175 Deep Listening XP',
        outcome: 'Develops genuine empathy, active listening, and social magnetism.'
      },
      {
        name: 'The Polite "NO" Protocol',
        description: 'Role-playing boundary setting: how to say "No" to peer pressure firmly without being rude or feeling guilty.',
        xp: '+210 Boundary Setting XP',
        outcome: 'Protects emotional safety and instills unshakeable self-worth.'
      }
    ]
  }
];

export function WhatKidsLearn() {
  const [activeTab, setActiveTab] = useState<string>(MISSIONS[0].id);
  const currentMission = MISSIONS.find((m) => m.id === activeTab) || MISSIONS[0];

  return (
    <section
      id="curriculum"
      aria-label="What Your Child Will Learn"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1240px] mx-auto bg-[#FCFAF6] rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(115,87,255,0.12)] border border-[#171717]/6 p-6 sm:p-12 lg:p-16 overflow-hidden">
        
        {/* ========================================================
            HERO PHILOSOPHY CALLOUT (EXACT USER REQUIREMENT)
        ======================================================== */}
        <div className="border-b border-[#171717]/10 pb-10 sm:pb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5DEFF] text-[#5B21B6] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            <span>The Speakory Foundation Principle</span>
          </div>

          {/* Giant Eye-Catching Statement */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#171717] leading-[1.08] max-w-5xl">
            Communication सिर्फ Job Interview के लिए Important नहीं है —{' '}
            <span className="font-editorial-italic font-normal text-[#7357FF] block sm:inline">
              The building of a strong foundation starts early.
            </span>
          </h2>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <p className="md:col-span-8 text-base sm:text-xl text-[#6B6964] font-medium leading-relaxed">
              Most people wait until age 22, standing outside an interview hall, to realize they get nervous talking to people. At Speakory, we believe a child’s voice, courage, and self-worth shouldn’t wait. We train children early through electrifying live simulations, gamified challenges, and unshakeable daily confidence.
            </p>

            <div className="md:col-span-4 bg-[#EBE8FA]/60 rounded-2xl p-4 sm:p-5 border border-[#7357FF]/15">
              <div className="flex items-center gap-2 text-[#7357FF] font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck size={16} />
                <span>Zero Boring Lectures</span>
              </div>
              <p className="text-xs sm:text-sm text-[#171717] font-semibold leading-snug">
                100% active role-plays, impromptu arenas, and mock stages. Kids learn by speaking, not listening silently to theory.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            SECTION TITLE: WHAT YOUR KID WILL BE LEARNING
        ======================================================== */}
        <div className="mt-10 sm:mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="tag-chip bg-[#D4F0B0] text-[#1E3A8A] mb-2">
                #EXCITING_SYLLABUS_&_TASKS
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
                What Will Your Kid Be Learning?
              </h3>
              <p className="text-sm sm:text-base text-[#6B6964] mt-1 font-medium">
                Step inside our 4 core adventure modules — hands-on missions crafted to make every child excited to speak up.
              </p>
            </div>

            {/* Direct WhatsApp Action Link */}
            <a
              href={getWhatsAppUrl("Hi Speakory team, I saw the curriculum modules and tasks for kids. Could we please discuss which module fits my child on a quick call?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7357FF] hover:text-[#5b3ee6] transition-colors py-2 group shrink-0"
            >
              <span>Ask mentor about age cohorts</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Module Selection Pills (Mobile-responsive horizontal scrolling on tiny screens) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 sm:pb-0 scrollbar-none -mx-2 px-2">
            {MISSIONS.map((m) => {
              const isActive = m.id === activeTab;
              const IconComp = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#171717] text-white shadow-md scale-[1.02]'
                      : 'bg-white text-[#6B6964] hover:text-[#171717] hover:bg-[#F8F6FE] border border-[#171717]/8'
                  }`}
                >
                  <IconComp size={16} className={isActive ? 'text-[#D4F0B0]' : 'text-[#7357FF]'} />
                  <span>{m.title}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE MISSION CARD SHOWCASE */}
          <div className="mt-6 sm:mt-8 rounded-3xl bg-gradient-to-b from-[#FAF8F5] to-white border border-[#171717]/8 p-5 sm:p-8 lg:p-10 shadow-xs">
            {/* Mission Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#171717]/8">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase mb-2 ${currentMission.badgeColor} ${currentMission.badgeTextColor}`}>
                  {currentMission.tag}
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                  {currentMission.title}
                </h4>
                <p className="text-sm sm:text-base text-[#7357FF] font-medium mt-1">
                  {currentMission.tagline}
                </p>
              </div>

              {/* Real life why pill */}
              <div className="md:max-w-xs bg-white p-3.5 sm:p-4 rounded-2xl border border-[#171717]/6 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#171717] mb-1">
                  <Compass size={14} className="text-[#7357FF]" />
                  <span>Real-Life Impact:</span>
                </div>
                <p className="text-xs text-[#6B6964] leading-relaxed font-medium">
                  {currentMission.realLifeWhy}
                </p>
              </div>
            </div>

            {/* Exciting Tasks & Activities Grid */}
            <div className="mt-6 sm:mt-8">
              <div className="text-xs font-bold text-[#6B6964] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Lightbulb size={14} className="text-[#F59E0B]" />
                <span>Hands-On Missions & Simulation Tasks</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {currentMission.activities.map((act, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-[#171717]/8 shadow-xs hover:shadow-md hover:border-[#7357FF]/30 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Gamified XP Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#D4F0B0]/70 text-[#1E3A8A]">
                          Task 0{index + 1}
                        </span>
                        <span className="text-[11px] font-bold text-[#7357FF] bg-[#E5DEFF]/50 px-2 py-0.5 rounded-full">
                          {act.xp}
                        </span>
                      </div>

                      <h5 className="text-base sm:text-lg font-bold text-[#171717] tracking-tight group-hover:text-[#7357FF] transition-colors">
                        {act.name}
                      </h5>

                      <p className="mt-2 text-xs sm:text-sm text-[#6B6964] leading-relaxed font-medium">
                        {act.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#171717]/6 flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-[#65A30D] shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-[#171717]/90 leading-tight">
                        <span className="text-[#65A30D] font-bold">Key Takeaway:</span> {act.outcome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Interactive Reassurance Callout */}
            <div className="mt-8 pt-6 border-t border-[#171717]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FCFAF6] p-4 sm:p-6 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E5DEFF] flex items-center justify-center text-[#7357FF] shrink-0">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h6 className="text-sm font-bold text-[#171717]">
                    Want to see your child do these tasks live?
                  </h6>
                  <p className="text-xs text-[#6B6964] font-medium">
                    Connect directly with a Speakory academic mentor (+91 88476 93947).
                  </p>
                </div>
              </div>

              <a
                href={getWhatsAppUrl(`Hi Speakory team, I am exploring the "${currentMission.title}" module for my child. Could we please connect on a quick call to discuss batch timings?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#171717] hover:bg-[#7357FF] transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
              >
                <PhoneCall size={14} className="text-[#D4F0B0]" />
                <span>Ask About This Module</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
