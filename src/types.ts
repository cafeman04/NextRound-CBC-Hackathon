export interface User {
  id: string;
  name: string;
  title: string;
  homeBase: string;
  avatar: string;
  background: string;
  interests: string[];
}

export type ActivityCategory =
  | 'technical'
  | 'behavioral'
  | 'system-design'
  | 'resume'
  | 'case'
  | 'portfolio'
  | 'accountability';

export interface TEvent {
  id: string;
  title: string;
  emoji: string;
  category: ActivityCategory;
  categoryLabel: string;
  format: 'Virtual' | 'In person' | 'Hybrid';
  location: string;
  neighborhood: string;
  time: string;
  durationHint: string;
  hostId: string;
  attendeeIds: string[];
  capacity: number;
  description: string;
  goal: string;
  commitment: string;
  coverGradient: string;
  tags: string[];
}

export interface Message {
  id: string;
  eventId: string;
  userId: string;
  timestamp: number;
  text: string;
}

export type Screen = 'profile' | 'deck' | 'match' | 'chat' | 'matches';
