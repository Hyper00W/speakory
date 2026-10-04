export interface CommunicationFragment {
  id: string;
  text: string;
  top: string;
  left: string;
  layer: 'foreground' | 'midground' | 'background';
  delay: number;
}

export interface PillarItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  promptExample: string;
  studentOutcome: string;
  accentColor: string;
}

export interface ProblemQuestion {
  id: string;
  question: string;
  studentDilemma: string;
  speakorySolution: string;
  statContext: string;
}

export interface ScenarioItem {
  id: string;
  title: string;
  context: string;
  beforeThought: string;
  afterTransformation: string;
  technique: string;
}

export interface CohortTier {
  range: string;
  name: string;
  headline: string;
  description: string;
  focusAreas: string[];
  sessionSize: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'method' | 'schedule' | 'outcomes';
}
