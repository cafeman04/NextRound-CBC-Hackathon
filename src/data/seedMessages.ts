import type { Message } from '../types';

interface SeedMessage {
  userId: string;
  text: string;
  minutesAgo: number;
}

const seed: Record<string, SeedMessage[]> = {
  e1: [
    { userId: 'u4', text: 'I can interview first if that helps. Thinking arrays or graphs tonight.', minutesAgo: 42 },
    { userId: 'u2', text: 'graphs would be great. i need reps talking through tradeoffs out loud', minutesAgo: 31 },
    { userId: 'u9', text: 'same. i made a shared doc for feedback so we can keep notes after', minutesAgo: 24 },
  ],
  e2: [
    { userId: 'u7', text: 'bring your messiest story, we can shape it together', minutesAgo: 88 },
    { userId: 'u1', text: 'perfect. i have a teamwork example that still sounds too rehearsed', minutesAgo: 39 },
  ],
  e3: [
    { userId: 'u8', text: 'can someone pick the prompt? i vote notification system or rate limiter', minutesAgo: 70 },
    { userId: 'u12', text: 'rate limiter would be great. i want to practice tradeoffs, not just boxes', minutesAgo: 47 },
    { userId: 'u4', text: 'love that. we can do 10 min solo, then each person presents', minutesAgo: 35 },
  ],
  e4: [
    { userId: 'u11', text: 'dropping a folder for resumes here. no pressure to be polished.', minutesAgo: 120 },
    { userId: 'u5', text: 'thank you. i need help making analytics work sound more product-y', minutesAgo: 77 },
  ],
  e5: [
    { userId: 'u3', text: 'happy to case either way, just want a clean debrief after', minutesAgo: 52 },
    { userId: 'u10', text: 'same. i can interview first if someone wants to drive the case', minutesAgo: 34 },
    { userId: 'u8', text: 'i am down to drive. mostly need help on synthesis', minutesAgo: 19 },
  ],
  e6: [
    { userId: 'u1', text: 'thinking we each do a 90-second intro, then feedback on follow-up questions', minutesAgo: 61 },
    { userId: 'u7', text: 'yes please. i want to sound curious instead of scripted', minutesAgo: 27 },
  ],
  e7: [
    { userId: 'u6', text: 'i can screen-share timers if helpful. goal is reps, not perfection', minutesAgo: 46 },
    { userId: 'u11', text: 'love that. i need accountability more than difficulty right now', minutesAgo: 30 },
  ],
  e8: [
    { userId: 'u5', text: 'let us keep this practical. fewer buzzwords, more clear product reasoning', minutesAgo: 55 },
    { userId: 'u8', text: 'amen. i have a prompt around onboarding for a budgeting app', minutesAgo: 28 },
  ],
  e9: [
    { userId: 'u11', text: 'sharing the tracker template before we meet so nobody has to build one from scratch', minutesAgo: 90 },
    { userId: 'u6', text: 'you are a hero. mine has been a notes app graveyard', minutesAgo: 62 },
  ],
  e10: [
    { userId: 'u12', text: 'this is a safe place to practice sounding confident, not aggressive', minutesAgo: 73 },
    { userId: 'u7', text: 'needed that reminder honestly', minutesAgo: 43 },
    { userId: 'u4', text: 'i can share the script i used for a level conversation last quarter', minutesAgo: 26 },
  ],
};

export const liveReplyBank: Record<string, { userId: string; text: string }[]> = {
  e1: [
    { userId: 'u4', text: 'glad you joined. want to interview first or second?' },
    { userId: 'u2', text: 'welcome! if you have a favorite topic, drop it here and we can work it in' },
  ],
  e2: [
    { userId: 'u7', text: 'happy you are in. we keep this gentle but honest.' },
    { userId: 'u1', text: 'if you want, post the role you are prepping for and we can tailor the prompts' },
  ],
  e3: [
    { userId: 'u8', text: 'nice, that fills the group. i can take notes while you whiteboard if helpful' },
  ],
  e4: [
    { userId: 'u11', text: 'welcome. drop your resume whenever you are ready and tell us what kind of feedback you want most' },
  ],
  e5: [
    { userId: 'u3', text: 'amazing, perfect timing. do you want to drive the case or interview first?' },
    { userId: 'u10', text: 'good to have another person here. more debrief angles always help' },
  ],
  e6: [
    { userId: 'u1', text: 'yay, glad you joined. i can help workshop your intro if you want' },
  ],
  e7: [
    { userId: 'u6', text: 'welcome. bring your honest energy, not your perfect energy' },
    { userId: 'u9', text: 'if you have a weak pattern right now, we can choose a problem around it' },
  ],
  e8: [
    { userId: 'u5', text: 'welcome! if there is a company or product type you want to practice, send it here' },
  ],
  e9: [
    { userId: 'u11', text: 'glad you are here. this group is mostly about staying in motion together' },
  ],
  e10: [
    { userId: 'u12', text: 'welcome. bring any awkward salary script and we can sand it down together' },
    { userId: 'u4', text: 'happy to share examples if you need a starting point' },
  ],
};

export function materializeSeedMessages(eventId: string): Message[] {
  const now = Date.now();
  const raw = seed[eventId] ?? [];

  return raw.map((message, index) => ({
    id: `${eventId}-seed-${index}`,
    eventId,
    userId: message.userId,
    text: message.text,
    timestamp: now - message.minutesAgo * 60_000,
  }));
}
