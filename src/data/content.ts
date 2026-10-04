import { PillarItem, ProblemQuestion, ScenarioItem, CohortTier, FaqItem } from '../types/index.ts';

export const HERO_FRAGMENTS = [
  { id: '1', text: '“hello”', top: '18%', left: '16%', layer: 'background' as const, delay: 0.8 },
  { id: '2', text: '“I think...”', top: '26%', left: '80%', layer: 'midground' as const, delay: 0.9 },
  { id: '3', text: '“let me explain”', top: '68%', left: '12%', layer: 'foreground' as const, delay: 1.0 },
  { id: '4', text: '“my idea is...”', top: '78%', left: '76%', layer: 'midground' as const, delay: 1.1 },
  { id: '5', text: '“actually...”', top: '15%', left: '68%', layer: 'background' as const, delay: 1.15 },
  { id: '6', text: '“can I add something?”', top: '84%', left: '26%', layer: 'midground' as const, delay: 1.2 },
  { id: '7', text: '“here’s what I mean”', top: '35%', left: '8%', layer: 'foreground' as const, delay: 1.25 },
  { id: '8', text: '“why?”', top: '60%', left: '88%', layer: 'background' as const, delay: 1.3 },
  { id: '9', text: '“wait, hear me out.”', top: '44%', left: '84%', layer: 'foreground' as const, delay: 1.35 },
];

export const PROBLEM_QUESTIONS: ProblemQuestion[] = [
  {
    id: 'intro',
    question: 'Can they introduce themselves confidently?',
    studentDilemma: '“When the teacher says ‘go around the room and say two things about yourself’, my chest tightens and I just say my name as fast as possible.”',
    speakorySolution: 'We train opening presence: pacing, eye contact, and sharing a genuine hook in 20 seconds without rushing or stammering.',
    statContext: '84% of teenagers report feeling physical anxiety during open-room introductions.'
  },
  {
    id: 'present',
    question: 'Can they present an idea?',
    studentDilemma: '“I do all the research for the group slide deck, but I always volunteer to just click next on the laptop so I don’t have to speak.”',
    speakorySolution: 'We demystify slide-free storytelling: holding an audience’s curiosity by framing a core thesis and sticking the landing.',
    statContext: 'Most school curricula grade slide design; Speakory trains the speaker behind the idea.'
  },
  {
    id: 'watching',
    question: 'Can they speak when everyone is watching?',
    studentDilemma: '“The moment thirty pairs of eyes turn to me, whatever I planned to say completely evaporates from my head.”',
    speakorySolution: 'Psychological desensitization in cohorts of 4–6. When speaking becomes a weekly muscle memory, the spotlight stops feeling like a spotlight.',
    statContext: 'Confidence isn’t the absence of butterflies; it’s knowing how to organize your words while they flutter.'
  },
  {
    id: 'express',
    question: 'Can they express what they actually think?',
    studentDilemma: '“I often agree with the loudest kid in the discussion just because I don’t know how to defend my own point smoothly.”',
    speakorySolution: 'Debate mechanics and polite counter-argument frameworks: “I see why that works, but have you considered...”',
    statContext: 'Thinking clearly is half the battle. Structuring thoughts in real time is the other half.'
  },
  {
    id: 'matters',
    question: 'Can they communicate when it matters?',
    studentDilemma: '“In student council elections, club captaincy trials, or internship chats, I feel like other kids just know how to talk effortlessly.”',
    speakorySolution: 'High-stakes impromptu frameworks: the PREP method (Point, Reason, Example, Point) applied to real life interviews and pitches.',
    statContext: 'Communication is the single most predictive leverage skill across higher education and future careers.'
  }
];

export const PILLARS: PillarItem[] = [
  {
    number: '01',
    title: 'THINK',
    subtitle: 'Organize the idea.',
    description: 'Before a single word leaves the lips, confident speakers construct an internal mental outline. We teach fast synthesis: structuring raw thoughts into a beginning, a pivot, and a punchline in five seconds.',
    promptExample: '“You have 30 seconds to explain why school hours should start at 10 AM. Use 1 central metaphor.”',
    studentOutcome: 'Eliminates aimless rambling and the fear of blanking out midway through a sentence.',
    accentColor: '#7357FF'
  },
  {
    number: '02',
    title: 'SPEAK',
    subtitle: 'Find the words.',
    description: 'Vocabulary without delivery is like a book kept in a drawer. We focus on articulation, vocal cadence, strategic pauses, and eliminating filler sounds without turning students into robotic public speakers.',
    promptExample: '“Deliver your argument using deliberate pauses instead of saying ‘like’, ‘umm’, or ‘you know’.”',
    studentOutcome: 'Students speak with measured weight and an authentic, natural cadence.',
    accentColor: '#ED4FA3'
  },
  {
    number: '03',
    title: 'EXPRESS',
    subtitle: 'Make it clear.',
    description: 'Tone, gesture, facial alignment, and energy. Great communicators don’t just convey information—they project conviction and connect with the listener’s empathy.',
    promptExample: '“Describe your favorite book twice: first as a movie trailer narrator, then as a friend whispering a secret.”',
    studentOutcome: 'Brings energy and personality into every presentation, discussion, and social introduction.',
    accentColor: '#FF876F'
  },
  {
    number: '04',
    title: 'CONNECT',
    subtitle: 'Make it matter.',
    description: 'True communication is a two-way current. We teach active listening, reading audience cues, responding with grace to disagreement, and creating conversations where others feel heard.',
    promptExample: '“Respond to a peer’s opposing viewpoint by summarizing their strongest point before stating your counter.”',
    studentOutcome: 'Builds social maturity, leadership presence, and empathetic group leadership.',
    accentColor: '#75A7FF'
  }
];

export const COMPARISONS = [
  {
    traditional: 'Grammar worksheets and multiple-choice punctuation tests',
    speakory: 'Live verbal practice where students speak 70% of every session',
    contrast: 'Practice vs Theory'
  },
  {
    traditional: 'Memorizing scripted speeches for an annual school competition',
    speakory: 'Impromptu thinking and on-the-spot conversational agility',
    contrast: 'Agility vs Scripts'
  },
  {
    traditional: 'Passive listening while a tutor lectures through slides',
    speakory: 'Intimate studio cohorts (4–6 peers) debating real-world dilemmas',
    contrast: 'Dialogue vs Monologue'
  },
  {
    traditional: 'Correcting every accent or grammar slip until the child goes quiet',
    speakory: 'Psychological safety first: empowering conviction before polishing nuance',
    contrast: 'Confidence vs Inhibition'
  },
  {
    traditional: 'Vague end-of-term comments like “participated well”',
    speakory: 'Actionable video breakdown feedback on pacing, structure, and presence',
    contrast: 'Precision vs Generic Praise'
  }
];

export const CLASS_CYCLE = [
  {
    step: '01',
    name: 'SPEAK',
    tagline: 'Warm-up voice & presence',
    detail: 'Low-stakes 60-second micro-prompts get vocal cords active immediately, removing initial hesitation.'
  },
  {
    step: '02',
    name: 'DISCUSS',
    tagline: 'Peer exchange on active topics',
    detail: 'Moderated small-group exchanges on real issues: technology ethics, music, community decisions.'
  },
  {
    step: '03',
    name: 'PRESENT',
    tagline: 'Step up to the virtual floor',
    detail: 'Each student delivers a focused 2-to-3 minute mini-talk using that week’s rhetorical framework.'
  },
  {
    step: '04',
    name: 'GET FEEDBACK',
    tagline: 'Specific, immediate coaching',
    detail: 'Mentors highlight 1 superpower demonstrated and 1 precise adjustment to test immediately.'
  },
  {
    step: '05',
    name: 'TRY AGAIN',
    tagline: 'Live iteration without delay',
    detail: 'Re-delivering the key 30-second climax with feedback applied while the memory is fresh.'
  },
  {
    step: '06',
    name: 'GET BETTER',
    tagline: 'Compound week after week',
    detail: 'Measurable progress archived in the student’s personal speaking journal and parent report.'
  }
];

export const REAL_ARENAS: ScenarioItem[] = [
  {
    id: 'intro',
    title: 'Introducing Yourself',
    context: 'First day at school, summer camp, sports club, or meeting new peers.',
    beforeThought: '“I hope they don’t notice me. I’ll just mumble my name and look at my shoes.”',
    afterTransformation: '“Hi, I’m Leo. I’m into robotics and competitive chess, but this year I’m trying out cross-country.”',
    technique: 'The Anchor & Curiosity hook: Name + 1 anchor passion + 1 conversational hook.'
  },
  {
    id: 'present',
    title: 'Presenting an Idea',
    context: 'Science fair, classroom presentation, or school club proposal.',
    beforeThought: '“I’ll read every single word straight off the PowerPoint slides so I don’t mess up.”',
    afterTransformation: '“Instead of walking you through twenty bullet points, let me show you why this problem caught my attention.”',
    technique: 'The Slide-Free Hook: Making eye contact first, letting visuals support rather than replace speech.'
  },
  {
    id: 'join',
    title: 'Joining a Conversation',
    context: 'At the lunch table, break times, or online team channels.',
    beforeThought: '“They already have an inside joke going. If I say something it’ll be awkward.”',
    afterTransformation: '“Wait, hear me out—I actually saw that documentary yesterday too, did you get to the twist at the end?”',
    technique: 'The Bridge Entry: Acknowledging the existing topic before offering a fresh angle.'
  },
  {
    id: 'answer',
    title: 'Answering Confidently',
    context: 'Cold-called by a teacher or answering questions under pressure.',
    beforeThought: '“I’m pretty sure I know the answer, but what if I look foolish in front of everyone?”',
    afterTransformation: '“My reasoning is that oxygen levels dropped first, which caused the chain reaction. Here’s why...”',
    technique: 'The Stance of Conviction: Starting with the conclusion, followed by the supporting evidence.'
  },
  {
    id: 'group',
    title: 'Speaking in a Group',
    context: 'Group project meetings, student councils, and team collaborations.',
    beforeThought: '“Two loud kids are arguing over everything. I’ll just stay silent and do the write-up.”',
    afterTransformation: '“We have two good ideas here. What if we test Sarah’s intro with Marcus’s conclusion?”',
    technique: 'The Synthesizer Role: Elevating the discussion by finding common ground.'
  },
  {
    id: 'opinion',
    title: 'Giving Your Opinion',
    context: 'Family dinners, social issues, or creative critiques with friends.',
    beforeThought: '“If I disagree with them, they might think I’m attacking them personally.”',
    afterTransformation: '“I respect that perspective, but here is what makes me look at it differently...”',
    technique: 'The Respectful Counter: Validating before diverging.'
  }
];

export const TRANSFORMATION_ITEMS = [
  {
    before: '“Umm... I don’t know.”',
    after: '“Here’s what I think.”',
    context: 'When asked for an opinion in front of thirty people.'
  },
  {
    before: '“Can I go last?”',
    after: '“I’ll go first.”',
    context: 'When the teacher asks for presentation volunteers.'
  },
  {
    before: '“I don’t know how to explain it.”',
    after: '“Let me explain.”',
    context: 'When breaking down a complex project or feeling.'
  },
  {
    before: '“What if I get it wrong?”',
    after: '“Here is my hypothesis.”',
    context: 'When venturing an idea during open discussions.'
  }
];

export const COHORTS: CohortTier[] = [
  {
    range: 'Ages 10–12',
    name: 'Young Communicators',
    headline: 'Foundations of Expression',
    description: 'Transforming natural childhood curiosity into structured expression. Focuses on expressive storytelling, voice projection, overcoming stage fright, and listening actively.',
    focusAreas: ['Expressive Storytelling', 'Voice Cadence & Body Language', 'Self-Introductions', 'Active Listening Games'],
    sessionSize: '4–5 students per mentor'
  },
  {
    range: 'Ages 13–15',
    name: 'Emerging Voices',
    headline: 'Debate, Persuasion & On-the-Spot Agility',
    description: 'Helping middle schoolers navigate social vulnerability and academic presentations. Focuses on impromptu thinking, structuring arguments, debate etiquette, and slide-free presenting.',
    focusAreas: ['Impromptu Speaking (PREP method)', 'Constructive Debate', 'Presentation Storytelling', 'Handling Nervous Energy'],
    sessionSize: '4–6 students per mentor'
  },
  {
    range: 'Ages 16–18',
    name: 'Next-Gen Leaders',
    headline: 'Public Presence & Interview Mastery',
    description: 'Preparing high schoolers for university interviews, student government, scholarship pitches, and adult social situations. Focuses on gravitas, executive presence, and persuasive leadership.',
    focusAreas: ['University & Internship Interview Mastery', 'Keynote & Public Speaking', 'Negotiation & Group Moderation', 'Executive Presence'],
    sessionSize: '5–6 students per mentor'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'method',
    question: 'How is Speakory different from traditional English coaching or tuition?',
    answer: 'Traditional coaching focuses on grammar rules, punctuation drills, and written essays. Speakory is an active communication studio: students spend 70% of every session speaking out loud, presenting ideas, debating, and receiving live constructive feedback on voice, presence, and structure.'
  },
  {
    category: 'method',
    question: 'My child is extremely shy and hates speaking. Will this be too intimidating?',
    answer: 'Not at all. We specifically designed Speakory for quiet and hesitant students. Sessions take place in micro-cohorts of just 4 to 6 peers, led by mentors trained in psychological safety. We never throw a child on the spot cold—we start with warm, low-stakes micro prompts where everyone speaks in safe, supportive turns.'
  },
  {
    category: 'schedule',
    question: 'What is the weekly schedule and format?',
    answer: 'Students meet once a week for 60 to 75 minutes in a live, interactive small-group studio. In between sessions, they receive one 3-minute async speaking challenge that takes five minutes to complete via video or audio.'
  },
  {
    category: 'outcomes',
    question: 'How do parents track their child’s progress?',
    answer: 'Every 4 weeks, parents receive a comprehensive Growth Report detailing improvements across the 4 Pillars (Think, Speak, Express, Connect), along with curated before-and-after video recordings showcasing their child’s evolution in pacing, eye contact, and clarity.'
  },
  {
    category: 'outcomes',
    question: 'What happens in the Free Trial session?',
    answer: 'The trial is a zero-pressure, 45-minute interactive diagnostic workshop. Your child will participate in fun, engaging speaking exercises with 3–4 peers. Afterwards, our mentor provides parents with an honest, personalized assessment of their child’s communication strengths and growth areas.'
  }
];
