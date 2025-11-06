import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/use-scroll-animation';
import { STAGGER, DISTANCE, DURATION } from '../utils/animation-constants';

interface StaggerContainerProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}

// Simplified variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.medium,
      delayChildren: 0.02
    }
  }
};

export function StaggerContainer({ 
  children, 
  delay = 0,
  staggerDelay = STAGGER.medium,
  className = ''
}: StaggerContainerProps) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = motion.div;

// Simplified variants for better performance
export const staggerItemVariants = {
  hidden: { 
    y: DISTANCE.subtle, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATION.fast,
      ease: "easeOut"
    }
  }
};