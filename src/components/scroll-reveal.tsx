import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/use-scroll-animation';
import { EASING, DISTANCE, DURATION, getDuration, getDelay } from '../utils/animation-constants';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  className?: string;
  // Custom scroll animation options
  scrollOptions?: {
    once?: boolean;
    margin?: string;
    amount?: number | "some" | "all";
  };
}

// Predefined variants to avoid object recreation
const variants = {
  up: {
    hidden: (distance: number) => ({ y: distance, opacity: 0 }),
    visible: { y: 0, opacity: 1 }
  },
  down: {
    hidden: (distance: number) => ({ y: -distance, opacity: 0 }),
    visible: { y: 0, opacity: 1 }
  },
  left: {
    hidden: (distance: number) => ({ x: distance, opacity: 0 }),
    visible: { x: 0, opacity: 1 }
  },
  right: {
    hidden: (distance: number) => ({ x: -distance, opacity: 0 }),
    visible: { x: 0, opacity: 1 }
  },
  fade: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
};

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = DURATION.normal,
  direction = 'up',
  distance = DISTANCE.standard,
  className = '',
  scrollOptions
}: ScrollRevealProps) {
  const { ref, isInView } = useScrollAnimation(scrollOptions);

  const variant = variants[direction];

  return (
    <motion.div
      ref={ref}
      custom={distance}
      variants={variant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: getDuration(duration),
        delay: getDelay(delay),
        ease: EASING.standard as any
      }}
      className={className}
      style={{ 
        willChange: isInView ? 'auto' : 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </motion.div>
  );
}