import { ArrowLeft, Clock, MapPin, MessageCircle } from 'lucide-react';
import { AttendeeAvatars } from '../components/AttendeeAvatars';
import { useStore } from '../store';

export function MatchesScreen() {
  const joinedIds = useStore((state) => state.joinedEventIds);
  const events = useStore((state) => state.events);
  const setScreen = useStore((state) => state.setScreen);
  const openChat = useStore((state) => state.openChat);

  const joined = joinedIds
    .map((id) => events.find((event) => event.id === id))
    .filter((event): event is NonNullable<typeof event> => Boolean(event));

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-coral-100 bg-cream/90 px-4 pb-3 pt-5 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('deck')}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-coral-50"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5 text-ink/70" />
          </button>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold leading-none text-ink">
              Your circles
            </h2>
            <p className="mt-1 text-[11px] text-ink/60">
              Sessions you joined to practice, prep, and keep each other moving.
            </p>
          </div>
        </div>
      </header>

      <div className="no-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {joined.length === 0 ? (
          <div className="mt-16 px-8 text-center text-ink/60">
            <div className="mb-3 text-5xl">👀</div>
            <h3 className="font-display text-lg font-semibold text-ink">
              No circles yet
            </h3>
            <p className="mt-1 text-sm">
              Swipe right on a session to join it. When the final spot fills, the group chat opens.
            </p>
          </div>
        ) : (
          joined.map((event) => (
            <button
              key={event.id}
              onClick={() => openChat(event.id)}
              className="flex items-center gap-3 rounded-[1.6rem] border border-coral-100 bg-white/80 p-4 text-left shadow-float transition hover:border-coral-200"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${event.coverGradient} text-3xl`}
              >
                {event.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-ink">{event.title}</div>
                <div className="mt-0.5 flex items-center gap-2 truncate text-[11px] text-ink/60">
                  <Clock className="h-3 w-3 shrink-0" />
                  <span>{event.time}</span>
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span>{event.neighborhood}</span>
                </div>
                <div className="mt-1.5">
                  <AttendeeAvatars
                    ids={event.attendeeIds}
                    capacity={event.capacity}
                    size="sm"
                  />
                </div>
              </div>
              <MessageCircle className="h-5 w-5 shrink-0 text-coral-500" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
