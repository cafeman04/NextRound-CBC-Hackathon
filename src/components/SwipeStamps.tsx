import { motion, type MotionValue, useTransform } from 'framer-motion';

interface Props {
  x: MotionValue<number>;
}

export function SwipeStamps({ x }: Props) {
  const joinOpacity = useTransform(x, [40, 120], [0, 1]);
  const joinRotate = useTransform(x, [40, 160], [-20, -12]);
  const laterOpacity = useTransform(x, [-120, -40], [1, 0]);
  const laterRotate = useTransform(x, [-160, -40], [12, 20]);

  return (
    <>
      <motion.div
        style={{ opacity: joinOpacity, rotate: joinRotate }}
        className="absolute top-6 left-6 pointer-events-none select-none"
      >
        <div className="border-[3px] border-sage-600 text-sage-700 font-display font-bold tracking-[0.18em] px-4 py-1.5 rounded-xl text-xl bg-cream/85 backdrop-blur-sm">
          JOIN
        </div>
      </motion.div>
      <motion.div
        style={{ opacity: laterOpacity, rotate: laterRotate }}
        className="absolute top-6 right-6 pointer-events-none select-none"
      >
        <div className="border-[3px] border-ink/50 text-ink/70 font-display font-bold tracking-[0.14em] px-4 py-1.5 rounded-xl text-xl bg-cream/85 backdrop-blur-sm">
          LATER
        </div>
      </motion.div>
    </>
  );
}
