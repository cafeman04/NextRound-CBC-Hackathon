import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { Clock, MapPin, Users } from 'lucide-react';
import type { TEvent } from '../types';
import { getUser } from '../data/users';
import { AttendeeAvatars } from './AttendeeAvatars';
import { SwipeStamps } from './SwipeStamps';

interface Props {
  event: TEvent;
  isTop: boolean;
  stackOffset: number;
  onSwipe: (dir: 'left' | 'right') => void;
}

const SWIPE_THRESHOLD = 120;
const SWIPE_VELOCITY = 500;

export function EventCard({ event, isTop, stackOffset, onSwipe }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const host = getUser(event.hostId);
  const spotsLeft = event.capacity - event.attendeeIds.length;
  const baseScale = 1 - stackOffset * 0.04;
  const baseY = stackOffset * 10;

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY) {
      onSwipe('right');
    } else if (offset < -SWIPE_THRESHOLD || velocity < -SWIPE_VELOCITY) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute inset-0 no-select"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 100 - stackOffset,
      }}
      initial={{ scale: baseScale, y: baseY + 10, opacity: 0 }}
      animate={{ scale: baseScale, y: baseY, opacity: 1 }}
      exit={{
        x: x.get() > 0 ? 600 : -600,
        rotate: x.get() > 0 ? 24 : -24,
        opacity: 0,
        transition: { duration: 0.25 },
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: 'grabbing' } : undefined}
    >
      <div
        className={`
          relative h-full w-full flex flex-col
          bg-cream rounded-card overflow-hidden shadow-card border border-white/70
          ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}
        `}
      >
        <div className={`relative h-60 bg-gradient-to-br ${event.coverGradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(43,36,32,0.18),transparent_36%)]" />
          <div className="absolute left-5 right-5 top-4 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <span className="bg-cream/90 backdrop-blur px-3 py-1 rounded-full text-[11px] font-semibold text-ink/85">
                {event.categoryLabel}
              </span>
              <span className="bg-white/20 text-cream px-3 py-1 rounded-full text-[11px] font-semibold border border-white/30">
                {event.format}
              </span>
            </div>
            <span className="bg-ink/65 text-cream px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur">
              {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[72px] leading-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.18)]">
                  {event.emoji}
                </div>
                <p className="mt-3 max-w-[240px] text-sm text-cream/90 leading-relaxed">
                  {event.goal}
                </p>
              </div>
            </div>
          </div>

          {isTop && <SwipeStamps x={x} />}
        </div>

        <div className="flex-1 flex flex-col gap-4 px-5 py-5 overflow-hidden">
          <div>
            <h2 className="font-display text-[25px] leading-tight text-ink font-semibold">
              {event.title}
            </h2>
            <p className="mt-2 text-sm text-ink/75 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-white/80 border border-coral-100 px-3.5 py-3">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-cream shadow-sm"
            />
            <div className="min-w-0">
              <p className="text-sm text-ink/70">
                Hosted by <span className="font-semibold text-ink">{host.name}</span>
              </p>
              <p className="text-[12px] text-ink/60 leading-relaxed">
                {host.title}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-ink/72">
            <div className="rounded-2xl bg-coral-50/80 px-3.5 py-3 border border-coral-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-coral-500 shrink-0" />
                <span className="font-medium">{event.time}</span>
              </div>
              <p className="mt-1 text-[12px] text-ink/60">{event.durationHint}</p>
            </div>
            <div className="rounded-2xl bg-sage-50/80 px-3.5 py-3 border border-sage-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage-600 shrink-0" />
                <span className="font-medium">{event.neighborhood}</span>
              </div>
              <p className="mt-1 text-[12px] text-ink/60">{event.location}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-ink/[0.03] px-4 py-3 border border-ink/5">
            <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/45">
              <Users className="w-3.5 h-3.5" />
              Prep commitment
            </div>
            <p className="mt-2 text-sm text-ink/75 leading-relaxed">{event.commitment}</p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3">
            <AttendeeAvatars
              ids={event.attendeeIds}
              capacity={event.capacity}
              size="sm"
            />
            <div className="flex flex-wrap justify-end gap-1.5">
              {event.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-sage-100 text-sage-700 px-2.5 py-1 rounded-full text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
