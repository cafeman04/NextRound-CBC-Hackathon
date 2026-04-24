import { ArrowLeft, Clock, MapPin, Send, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AttendeeAvatars } from '../components/AttendeeAvatars';
import { MessageBubble } from '../components/MessageBubble';
import { getUser } from '../data/users';
import { useStore } from '../store';

export function ChatScreen() {
  const eventId = useStore((state) => state.activeChatEventId);
  const event = useStore((state) => state.events.find((item) => item.id === eventId) ?? null);
  const messages = useStore((state) => (eventId ? state.messages[eventId] ?? [] : []));
  const sendMessage = useStore((state) => state.sendMessage);
  const setScreen = useStore((state) => state.setScreen);

  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages.length]);

  if (!event || !eventId) return null;

  const sorted = [...messages].sort((a, b) => a.timestamp - b.timestamp);
  const host = getUser(event.hostId);

  const handleSend = () => {
    if (!draft.trim()) return;
    sendMessage(eventId, draft);
    setDraft('');
  };

  return (
    <div className="flex h-full flex-col bg-coral-50/35">
      <header className="border-b border-coral-100 bg-cream/95 px-4 pb-3 pt-4 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('matches')}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-coral-50"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5 text-ink/70" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">{event.emoji}</span>
              <h2 className="truncate font-display font-semibold text-ink">
                {event.title}
              </h2>
            </div>
            <div className="mt-0.5 flex items-center gap-3 text-[11px] text-ink/60">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.neighborhood}
              </span>
            </div>
          </div>

          <AttendeeAvatars
            ids={event.attendeeIds}
            size="md"
            showCount={false}
            max={3}
          />
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-xl bg-sage-100 px-3 py-2 text-[12px] text-sage-700">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Share context, availability, and prep materials. Give direct feedback, keep it kind, and coordinate with <strong>{host.name}</strong> when you are ready to meet.
          </span>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="no-scrollbar flex flex-1 flex-col gap-2.5 overflow-y-auto px-3 py-4"
      >
        {sorted.length === 0 ? (
          <div className="mt-8 text-center text-sm text-ink/50">
            No messages yet. You could start with your role target, availability, or what you want to practice.
          </div>
        ) : (
          sorted.map((message, index) => {
            const previous = sorted[index - 1];
            const sameSenderAsPrev = previous && previous.userId === message.userId;

            return (
              <MessageBubble
                key={message.id}
                message={message}
                showAvatar={!sorted[index + 1] || sorted[index + 1].userId !== message.userId}
                showName={!sameSenderAsPrev && message.userId !== 'me'}
              />
            );
          })
        )}
      </div>

      <div className="border-t border-coral-100 bg-cream px-3 py-3">
        <div className="flex items-center gap-2 rounded-full bg-coral-50 pl-4 pr-1 py-1">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSend();
            }}
            placeholder="Drop an intro, availability, or a prep goal..."
            className="flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-ink/40"
          />
          <button
            onClick={handleSend}
            disabled={!draft.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-coral-400 to-coral-600 text-cream transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
