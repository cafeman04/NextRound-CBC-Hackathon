import { motion } from 'framer-motion';
import { useMemo } from 'react';

const COLORS = ['#FF7A5C', '#FFB4A2', '#9CB380', '#6F8A5B', '#FFFBF5', '#E85D3E'];

interface Particle {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
  drift: number;
  rotate: number;
}

export function Confetti({ count = 42 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.4,
        size: 6 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 120,
        rotate: (Math.random() - 0.5) * 720,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '105vh',
            x: p.drift,
            opacity: [0, 1, 1, 0.8, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: 2.8 + Math.random() * 1.2,
            delay: p.delay,
            ease: 'easeIn',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            backgroundColor: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
