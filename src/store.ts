import { create } from 'zustand';
import type { Message, Screen, TEvent, User } from './types';
import { currentUser, users } from './data/users';
import { events as seedEvents } from './data/events';
import { liveReplyBank, materializeSeedMessages } from './data/seedMessages';

interface StoreState {
  currentUser: typeof currentUser;
  events: TEvent[];
  deckIndex: number;
  joinedEventIds: string[];
  lastJoinedEventId: string | null;
  activeChatEventId: string | null;
  messages: Record<string, Message[]>;
  screen: Screen;

  setScreen: (s: Screen) => void;
  updateCurrentUser: (patch: Partial<User>) => void;
  openChat: (eventId: string) => void;
  swipeRight: (eventId: string) => void;
  swipeLeft: (eventId: string) => void;
  sendMessage: (eventId: string, text: string) => void;
  resetDeck: () => void;
}

const scheduleLiveReplies = (
  eventId: string,
  append: (m: Message) => void,
) => {
  const bank = liveReplyBank[eventId] ?? [];
  bank.forEach((reply, i) => {
    const delay = 1800 + i * 1900 + Math.random() * 600;
    setTimeout(() => {
      append({
        id: `${eventId}-live-${Date.now()}-${i}`,
        eventId,
        userId: reply.userId,
        text: reply.text,
        timestamp: Date.now(),
      });
    }, delay);
  });
};

export const useStore = create<StoreState>((set, get) => ({
  currentUser,
  events: seedEvents,
  deckIndex: 0,
  joinedEventIds: [],
  lastJoinedEventId: null,
  activeChatEventId: null,
  messages: {},
  screen: 'profile',

  setScreen: (s) => set({ screen: s }),

  updateCurrentUser: (patch) => {
    const nextUser = { ...get().currentUser, ...patch };
    Object.assign(currentUser, nextUser);
    users.me = currentUser;
    set({ currentUser: { ...currentUser } });
  },

  openChat: (eventId) => {
    const state = get();
    // Lazily hydrate seeded messages the first time we open this chat.
    if (!state.messages[eventId]) {
      set({
        messages: {
          ...state.messages,
          [eventId]: materializeSeedMessages(eventId),
        },
      });
    }
    set({ activeChatEventId: eventId, screen: 'chat' });

    scheduleLiveReplies(eventId, (msg) => {
      const s = get();
      const prior = s.messages[eventId] ?? [];
      set({
        messages: { ...s.messages, [eventId]: [...prior, msg] },
      });
    });
  },

  swipeRight: (eventId) => {
    const state = get();
    const events = state.events.map((ev) => {
      if (ev.id !== eventId) return ev;
      if (ev.attendeeIds.includes('me')) return ev;
      return { ...ev, attendeeIds: [...ev.attendeeIds, 'me'] };
    });

    const updated = events.find((ev) => ev.id === eventId)!;
    const joined = updated.attendeeIds.includes('me');
    const isFull = updated.attendeeIds.length >= updated.capacity;

    set({
      events,
      deckIndex: state.deckIndex + 1,
      joinedEventIds: joined
        ? Array.from(new Set([...state.joinedEventIds, eventId]))
        : state.joinedEventIds,
    });

    if (isFull && joined) {
      set({ lastJoinedEventId: eventId, screen: 'match' });
    }
  },

  swipeLeft: (_eventId) => {
    const state = get();
    set({ deckIndex: state.deckIndex + 1 });
  },

  sendMessage: (eventId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const state = get();
    const prior = state.messages[eventId] ?? [];
    const newMsg: Message = {
      id: `${eventId}-me-${Date.now()}`,
      eventId,
      userId: 'me',
      text: trimmed,
      timestamp: Date.now(),
    };
    set({
      messages: { ...state.messages, [eventId]: [...prior, newMsg] },
    });

    // Small chance of a quick reactive follow-up from someone in the group
    const bank = liveReplyBank[eventId];
    if (bank && bank.length > 0 && Math.random() < 0.6) {
      const pick = bank[Math.floor(Math.random() * bank.length)];
      setTimeout(() => {
        const s = get();
        const currentList = s.messages[eventId] ?? [];
        set({
          messages: {
            ...s.messages,
            [eventId]: [
              ...currentList,
              {
                id: `${eventId}-live-${Date.now()}`,
                eventId,
                userId: pick.userId,
                text: pick.text,
                timestamp: Date.now(),
              },
            ],
          },
        });
      }, 1600 + Math.random() * 1200);
    }
  },

  resetDeck: () => set({ deckIndex: 0 }),
}));
