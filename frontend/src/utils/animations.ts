import type { AnimationDirection, AnimationSpeed, AnimationVariant } from '@/types/animations';

// Animation timing presets (per technical notes: fast 0.15s, base 0.2s, slow 0.3s)
export const ANIMATION_DURATIONS: Record<AnimationSpeed, number> = {
  fast: 0.15,
  base: 0.2,
  slow: 0.3,
};

// Easing functions optimized for perceived smoothness
export const ANIMATION_EASING = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  spring: { type: 'spring', stiffness: 300, damping: 30 },
} as const;

// Fade animation variants
export const fadeVariants = (speed: AnimationSpeed = 'base'): AnimationVariant => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: ANIMATION_DURATIONS[speed],
    ease: ANIMATION_EASING.easeOut,
  },
});

// Slide animation variants
export const slideVariants = (
  direction: AnimationDirection = 'right',
  speed: AnimationSpeed = 'base',
  distance: number = 50
): AnimationVariant => {
  const offsets: Record<AnimationDirection, { x?: number; y?: number }> = {
    left: { x: distance }, // Starts right, slides leftward (← motion)
    right: { x: -distance }, // Starts left, slides rightward (→ motion)
    up: { y: distance }, // Starts below, slides upward (↑ motion)
    down: { y: -distance }, // Starts above, slides downward (↓ motion)
  };

  return {
    initial: { opacity: 0, ...offsets[direction] },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...offsets[direction] },
    transition: {
      duration: ANIMATION_DURATIONS[speed],
      ease: ANIMATION_EASING.easeOut,
    },
  };
};

// Scale animation variants
export const scaleVariants = (speed: AnimationSpeed = 'base', initialScale: number = 0.95): AnimationVariant => ({
  initial: { opacity: 0, scale: initialScale },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: initialScale },
  transition: {
    duration: ANIMATION_DURATIONS[speed],
    ease: ANIMATION_EASING.easeOut,
  },
});

// Page transition variants for kiosk navigation
export const pageTransitionVariants = (direction: 'forward' | 'backward' = 'forward'): AnimationVariant => {
  const offset = direction === 'forward' ? -100 : 100;

  return {
    initial: { opacity: 0, x: offset },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -offset },
    transition: {
      duration: ANIMATION_DURATIONS.base,
      ease: ANIMATION_EASING.easeInOut,
    },
  };
};
