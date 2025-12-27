
export enum AppStep {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  ONBOARDING = 'ONBOARDING',
  ANALYSIS = 'ANALYSIS',
  DASHBOARD = 'DASHBOARD',
  SCHEDULE = 'SCHEDULE',
  ADVANTAGES = 'ADVANTAGES',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  PRICING = 'PRICING',
  FINISH_REGISTRATION = 'FINISH_REGISTRATION'
}

export interface UserProfile {
  name: string;
  target: string;
  dailyHours: number;
  expertiseLevel: 'beginner' | 'intermediate' | 'advanced';
  focusDays: string[];
  cpf?: string;
  email?: string;
  cep?: string;
}

export interface StudyTopic {
  id: string;
  title: string;
  subject: string;
  weight: number;
  status: 'pending' | 'in_progress' | 'completed';
  relevance: string;
}

export interface StudySession {
  day: string;
  topics: StudyTopic[];
}

export interface MentorshipPlan {
  title: string;
  extractedSubjects: string[];
  recommendations: string[];
  weeklySchedule: StudySession[];
}
