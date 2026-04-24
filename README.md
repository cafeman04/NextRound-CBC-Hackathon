# NextRound

Swipe into your next prep circle.

## Overview

NextRound is a mobile-first social app prototype for students, new grads, and career changers who want to build real relationships through interview preparation and career growth.

Instead of swiping on people, users swipe on small prep sessions:

- Mock technical interviews
- Behavioral interview practice
- System design groups
- Resume review circles
- Case interview partners
- Accountability pods

When a session fills, the group chat opens so participants can coordinate, practice together, and keep momentum going.

## Why It Exists

Most interview prep tools optimize for solo grinding. NextRound is built around the idea that career preparation is easier, warmer, and more sustainable when it feels social.

The product borrows the interaction language of dating apps, but the emotional center is different:

- The unit of matching is the session, not the person
- The tone is communal, not romantic
- The outcome is progress, accountability, and trust

## Current Features

- Swipeable mobile-style deck of prep sessions
- Editable personal account page for your own name, background, location, avatar, and interests
- Seeded session data with realistic attendee groups
- Match celebration when a session reaches capacity
- Group chat per session
- Seeded chat history that hydrates on first open
- Scripted live replies to make chats feel active
- Joined circles screen for quick re-entry into chats

## Tech Stack

- React 18
- TypeScript
- Vite 7
- Tailwind CSS
- Zustand
- Framer Motion
- Lucide React

There is currently no backend or database. All data is client-side seed data stored in app state.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```text
src/
  App.tsx            Screen router
  main.tsx           Vite entry
  store.ts           Zustand store and app actions
  types.ts           Shared types
  data/
    users.ts         Seed users and current user
    events.ts        Seed prep sessions
    seedMessages.ts  Seeded group chat data and live replies
  screens/
    ProfileScreen    Editable account/profile screen
    DeckScreen       Swipe deck of prep sessions
    MatchScreen      Celebration when a session fills
    MatchesScreen    Joined circles list
    ChatScreen       Group chat for a session
  components/
    AppShell.tsx
    EventCard.tsx
    SwipeStamps.tsx
    MessageBubble.tsx
    AttendeeAvatars.tsx
    Confetti.tsx
```

## Product Notes

- The current user always uses the id `'me'`
- Navigation is handled by Zustand screen state, not a router
- Most sessions are intentionally seeded close to full so a right swipe often triggers the match state
- Chat reactions use `setTimeout`-based simulated replies with light randomness

## Limitations

- No authentication
- No persistence across refreshes
- No real-time backend
- No actual event creation flow yet
- No moderation, trust, or safety systems yet
- No scheduling or calendar integrations yet

## What To Build Next

- Real account creation and persistence
- User-created sessions
- Smarter matching by goals, timing, and location
- Better trust and safety tooling
- Scheduling and calendar integration
- Post-session follow-through features for recurring prep circles

## Design Direction

The interface intentionally feels familiar to swipe-based social products, but with softer copy and a more grounded purpose. It should feel like:

- A little playful
- Warm and human
- Clear about expectations
- Focused on shared effort instead of performance

## Status

This is a hackathon prototype built to demonstrate the concept and interaction model, not a production-ready platform.
