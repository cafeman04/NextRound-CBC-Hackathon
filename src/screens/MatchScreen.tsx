import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { Confetti } from '../components/Confetti';
import { getUser } from '../data/users';
import { useStore } from '../store';

export function MatchScreen() {
  const eventId = useStore((state) => state.lastJoinedEventId);
  const event = useStore((state) => state.events.find((item) => item.id === eventId) ?? null);
  const setScreen = useStore((state) => state.setScreen);
  const openChat = useStore((state) => state.openChat);

  if (!event) return null;

  const others = event.attendeeIds.filter((id) => id !== 'me');
  const otherUsers = others.map(getUser);
  const names =
    otherUsers.length <= 2
      ? otherUsers.map((user) => user.name).join(' and ')
      : `${otherUsers[0].name}, ${otherUsers[1].name}, and ${otherUsers.length - 2} more`;

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-coral-400 via-coral-500 to-coral-600 text-cream">
      <Confetti />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(43,36,32,0.18),transparent_40%)]" />

      <div className="relative z-10 flex h-full flex-col items-center px-6 py-10 text-center">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
          className="mt-4"
        >
          <div className="mb-2 text-6xl">{event.emoji}</div>
          <h1 className="font-display text-[42px] font-bold leading-none tracking-tight">
            Your prep circle is ready
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-4 max-w-[300px] text-lg font-medium text-cream/95"
        >
          You joined <span className="font-bold">{event.title}</span> with {names}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mt-8 flex items-center justify-center"
        >
          {otherUsers.slice(0, 5).map((user, index) => (
            <img
              key={user.id}
              src={user.avatar}
              alt={user.name}
              className="first:ml-0 -ml-3 h-16 w-16 rounded-full object-cover ring-4 ring-cream shadow-lg"
              style={{ zIndex: 10 - index }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex w-full max-w-[320px] flex-col gap-3 rounded-[1.75rem] bg-cream/14 px-5 py-4 text-left backdrop-blur-sm"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/80">
            Shared goal
          </p>
          <p className="text-sm leading-relaxed text-cream/96">{event.goal}</p>
          <div className="grid grid-cols-1 gap-2 pt-1 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2 text-cream/92">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-cream/92">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{event.time}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="mt-auto flex w-full flex-col gap-3"
        >
          <button
            onClick={() => openChat(event.id)}
            className="w-full rounded-full bg-cream py-4 text-lg font-semibold text-coral-600 shadow-float transition hover:scale-[1.02] active:scale-95"
          >
            Open group chat
          </button>
          <button
            onClick={() => setScreen('deck')}
            className="w-full rounded-full border-2 border-cream/40 bg-transparent py-3 font-medium text-cream/90 transition hover:bg-cream/10"
          >
            Keep exploring
          </button>
        </motion.div>
      </div>
    </div>
  );
}
