## Concept - NextRound

A mobile-first, swipe-based social app for students and prospective employees to build real relationships through shared interview preparation and career growth. The user (Riley, `id: 'me'`) swipes through a deck of small prep sessions - mock technical interviews, behavioral practice, system design groups, resume circles, case partners, and accountability pods. Swiping right joins a session; when the group's `attendeeIds.length` hits `capacity`, the celebration screen fires and a group chat opens.

The interaction model still borrows from dating apps, but the tone should feel warm, communal, and grounded in shared goals rather than romance. The point is not profile chemistry. It is authentic connection through doing meaningful preparation together.

Key product beats:
- Most seed events are tuned to `capacity - 1` attendees so one right-swipe fills the group and triggers the match screen. A couple have extra open spots so the deck keeps some variation.
- Once in a group chat, seeded messages hydrate lazily the first time the chat opens, and scripted live replies arrive on `setTimeout` delays to simulate a real prep circle reacting. User sends also have a ~60% chance of triggering a reactive follow-up.
- No backend - everything is client-side state plus seed data. This is a hackathon prototype.

## Stack

- **React 18 + TypeScript** via **Vite 7** (`npm run dev` / `build` / `preview`)
- **Zustand** for state (single store in `src/store.ts`)
- **Tailwind** with a custom palette (`coral`, `sage`, `cream`, `ink`) and fonts (`Fraunces` display, `DM Sans` body) - see `tailwind.config.ts`
- **framer-motion** for screen transitions, swipe gestures, and card stack animation
- **lucide-react** for icons

## Structure

```text
src/
  App.tsx            screen router (renders one of 5 screens based on store.screen)
  main.tsx           Vite entry
  store.ts           Zustand store - events, deck index, messages, screen, actions
  types.ts           User, TEvent, Message, Screen, ActivityCategory
  data/
    users.ts         currentUser ('me' = Riley) + users map + getUser(id)
    events.ts        seed prep-session deck
    seedMessages.ts  per-session seeded chat history + liveReplyBank
  screens/
    ProfileScreen    landing / onboarding profile
    DeckScreen       swipeable prep-session card stack
    MatchScreen      celebration when a session fills
    MatchesScreen    list of joined circles -> chats
    ChatScreen       group chat for a session
  components/
    AppShell         mobile-first phone-frame wrapper
    EventCard        swipeable session card
    SwipeStamps      JOIN / LATER overlays during drag
    MessageBubble    chat bubble
    AttendeeAvatars  stacked avatars
    Confetti         celebration effect
```

## Conventions

- The current user's `id` is the literal string `'me'` everywhere - chat bubbles, attendee checks, and message authorship all branch on `userId === 'me'`.
- Screen navigation is via `useStore().setScreen(...)`, not a router. `App.tsx` switches on `store.screen`.
- Keep copy aligned with career prep, interview practice, and community-building. Avoid slipping back into romantic or generic hangout language.
- Tailwind classes should stay inside the existing design system (`coral-*`, `sage-*`, `cream`, `ink`, `shadow-card`, `shadow-float`) unless there is a strong reason to expand it.
- Timing for live replies and reactive follow-ups uses `setTimeout` with small randomized jitter - preserve that feel when extending chat behavior.

---

### Subagent Usage Policy

You must minimize the use of subagents.

Do NOT spawn subagents unless absolutely necessary.
Always prefer solving tasks directly within a single agent.
Only use subagents if the task is clearly parallelizable or requires independent repeated operations over multiple items.

The following tasks MUST NOT use subagents:

Writing or editing a single piece of content
Coding a single feature or debugging
Answering questions or explaining concepts
Any task that produces a single output

Before spawning a subagent, you must internally justify:

Why the task cannot be completed by a single agent
Why parallelization provides clear efficiency gains

If these conditions are not met, you MUST proceed without subagents.

When subagents are used:

Use at most one subagent unless explicitly required
Prefer the cheapest available model for subagents
Do not recursively spawn subagents
