import type { User } from '../types';

const av = (n: number) => `https://i.pravatar.cc/400?img=${n}`;

export const currentUser: User = {
  id: 'me',
  name: 'Riley',
  title: 'CS senior building toward new-grad SWE roles',
  homeBase: 'Boston, MA',
  avatar: av(47),
  background:
    'I do better when prep feels social. Looking for people who want honest feedback, real accountability, and a little momentum every week.',
  interests: ['Backend interviews', 'System design', 'Resume polish', 'Mutual accountability'],
};

export const users: Record<string, User> = {
  me: currentUser,
  u1: {
    id: 'u1',
    name: 'Maya',
    title: 'Product designer recruiting for UX internships',
    homeBase: 'Cambridge, MA',
    avatar: av(5),
    background:
      'Strong on storytelling, weaker on whiteboard nerves. I am good at making practice feel less intimidating.',
    interests: ['Behavioral stories', 'Portfolio walkthroughs', 'Mock interviews'],
  },
  u2: {
    id: 'u2',
    name: 'Jordan',
    title: 'Junior developer targeting mid-size SaaS teams',
    homeBase: 'Remote',
    avatar: av(12),
    background:
      'Big on preparation, spreadsheets, and debriefs that actually help. Happy to trade interviewer duties.',
    interests: ['Algorithms', 'Peer feedback', 'Consistent prep'],
  },
  u3: {
    id: 'u3',
    name: 'Priya',
    title: 'MBA student pivoting into consulting',
    homeBase: 'Boston, MA',
    avatar: av(32),
    background:
      'Case practice is better with people who are kind and direct. I like timing drills and structured feedback.',
    interests: ['Case interviews', 'Networking confidence', 'Coffee chats'],
  },
  u4: {
    id: 'u4',
    name: 'Ben',
    title: 'Software engineer preparing for senior-level loops',
    homeBase: 'Somerville, MA',
    avatar: av(14),
    background:
      'I can run mock interviews, especially technical and system design. Looking for a grounded prep crew, not performative grind.',
    interests: ['System design', 'Leadership stories', 'Technical mocks'],
  },
  u5: {
    id: 'u5',
    name: 'Sana',
    title: 'Data analyst moving into product management',
    homeBase: 'Remote',
    avatar: av(25),
    background:
      'I am translating analytics experience into PM stories and product sense answers. I care a lot about thoughtful feedback.',
    interests: ['Product sense', 'Resume rewrite', 'Behavioral clarity'],
  },
  u6: {
    id: 'u6',
    name: 'Theo',
    title: 'Bootcamp grad on the internship hunt',
    homeBase: 'Brookline, MA',
    avatar: av(33),
    background:
      'Would rather prep with real humans than stare at another problem set alone. Good vibes, serious reps.',
    interests: ['LeetCode reps', 'Confidence', 'Study groups'],
  },
  u7: {
    id: 'u7',
    name: 'Nia',
    title: 'English major recruiting for people ops roles',
    homeBase: 'Boston, MA',
    avatar: av(36),
    background:
      'Behavioral and people-facing interviews are my lane. Happy to help others sharpen stories and presence.',
    interests: ['Behavioral practice', 'Resume review', 'Career pivots'],
  },
  u8: {
    id: 'u8',
    name: 'Arjun',
    title: 'Former founder preparing for PM and strategy roles',
    homeBase: 'Remote',
    avatar: av(51),
    background:
      'I like prep sessions that end with concrete next steps. Looking for consistent people who show up prepared.',
    interests: ['Case practice', 'PM interviews', 'Accountability'],
  },
  u9: {
    id: 'u9',
    name: 'Clara',
    title: 'Computer engineering junior targeting embedded roles',
    homeBase: 'Boston, MA',
    avatar: av(45),
    background:
      'I bring curiosity and a strong note-taking habit. Looking for peers who want calm, repeatable interview practice.',
    interests: ['Technical mocks', 'Resume review', 'New-grad recruiting'],
  },
  u10: {
    id: 'u10',
    name: 'Mateo',
    title: 'Consultant switching into strategy and ops',
    homeBase: 'Cambridge, MA',
    avatar: av(60),
    background:
      'Cases, frameworks, and sanity checks. I like prep groups where everyone leaves more confident than they arrived.',
    interests: ['Case interviews', 'Story bank', 'Networking'],
  },
  u11: {
    id: 'u11',
    name: 'Harper',
    title: 'Recent grad building a stronger job-search routine',
    homeBase: 'Remote',
    avatar: av(48),
    background:
      'Mostly here for community and momentum. I am at my best when someone else is also showing up with goals for the week.',
    interests: ['Accountability', 'Resume refresh', 'Interview rhythm'],
  },
  u12: {
    id: 'u12',
    name: 'Dev',
    title: 'Mechanical engineer moving toward technical program management',
    homeBase: 'Somerville, MA',
    avatar: av(8),
    background:
      'I enjoy cross-functional interview prep and helping people explain complex work simply.',
    interests: ['Program management', 'Behavioral stories', 'Peer coaching'],
  },
};

export const getUser = (id: string): User =>
  users[id] ?? {
    id,
    name: 'Guest',
    title: 'Career prep member',
    homeBase: 'Remote',
    avatar: av(1),
    background: '',
    interests: [],
  };
