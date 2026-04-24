import { AnimatePresence } from 'framer-motion';
import { Check, MessageCircle, User as UserIcon, X } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { useStore } from '../store';

export function DeckScreen() {
  const currentUser = useStore((state) => state.currentUser);
  const events = useStore((state) => state.events);
  const deckIndex = useStore((state) => state.deckIndex);
  const swipeRight = useStore((state) => state.swipeRight);
  const swipeLeft = useStore((state) => state.swipeLeft);
  const setScreen = useStore((state) => state.setScreen);
  const joinedCount = useStore((state) => state.joinedEventIds.length);
  const resetDeck = useStore((state) => state.resetDeck);

  const topThree = events.slice(deckIndex, deckIndex + 3);
  const done = topThree.length === 0;

  return (
    <div className="flex h-full flex-col">
      <header className="px-5 pb-3 pt-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setScreen('profile')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-float transition hover:bg-coral-50"
            aria-label="Profile"
          >
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <UserIcon className="h-5 w-5 text-ink/70" />
            )}
          </button>

          <div className="text-center">
            <div className="font-display text-lg font-semibold leading-none text-ink">
              NextRound
            </div>
            <div className="mt-0.5 text-[11px] text-ink/60">
              swipe into your prep circle
            </div>
          </div>

          <button
            onClick={() => setScreen('matches')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-float transition hover:bg-coral-50"
            aria-label="Your circles"
          >
            <MessageCircle className="h-5 w-5 text-ink/70" />
            {joinedCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral-500 text-[10px] font-bold text-cream shadow">
                {joinedCount}
              </span>
            )}
          </button>
        </div>

        <div className="mt-4 rounded-[1.75rem] border border-coral-100 bg-white/70 px-4 py-3 backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coral-600/90">
            This week
          </p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-[23px] leading-tight text-ink">
                Small sessions for interview prep and career momentum
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink/68">
                Swipe right to join the circles that feel useful. Most groups unlock chat as soon as the last spot fills.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative mx-5 mb-4 flex-1">
        {done ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 text-5xl">🌿</div>
            <h3 className="mb-2 font-display text-2xl font-semibold text-ink">
              You have seen every prep session nearby
            </h3>
            <p className="mb-6 text-ink/70">
              New circles roll in through the week. You can revisit these, or come back when more students and job seekers post sessions.
            </p>
            <button
              onClick={resetDeck}
              className="rounded-full bg-sage-500 px-5 py-2.5 font-semibold text-cream shadow-float transition hover:bg-sage-600"
            >
              See them again
            </button>
          </div>
        ) : (
          <AnimatePresence>
            {topThree
              .slice()
              .reverse()
              .map((event, index) => {
                const actualOffset = topThree.length - 1 - index;

                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    isTop={actualOffset === 0}
                    stackOffset={actualOffset}
                    onSwipe={(direction) =>
                      direction === 'right' ? swipeRight(event.id) : swipeLeft(event.id)
                    }
                  />
                );
              })}
          </AnimatePresence>
        )}
      </div>

      {!done && topThree[0] && (
        <div className="pb-6">
          <div className="mb-2 flex items-center justify-center gap-14 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/45">
            <span>Later</span>
            <span>Join</span>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => swipeLeft(topThree[0].id)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-float text-ink/70 transition hover:bg-coral-50 active:scale-95"
              aria-label="Maybe later"
            >
              <X className="h-7 w-7" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => swipeRight(topThree[0].id)}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-coral-400 to-coral-600 text-cream shadow-card transition hover:scale-105 active:scale-95"
              aria-label="Join session"
            >
              <Check className="h-9 w-9" strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
