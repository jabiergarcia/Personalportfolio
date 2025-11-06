import { useInView } from 'motion/react';
import { useRef } from 'react';

interface UseScrollAnimationOptions {
  once?: boolean;
  margin?: string;
  amount?: number | "some" | "all";
}

// Simplified options for better performance
const defaultOptions = {
  once: true,
  margin: "0px 0px -100px 0px", // Trigger animation when element is 100px before entering viewport
  amount: 0.1 // Require 10% visibility to trigger
} as const;

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef(null);
  
  // Merge custom options with defaults
  const mergedOptions = {
    ...defaultOptions,
    ...options
  };
  
  const isInView = useInView(ref, mergedOptions);

  return { ref, isInView };
}