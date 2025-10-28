import type { Target, Transition } from 'framer-motion';

export type AnimationSpeed = 'fast' | 'base' | 'slow';

export type AnimationDirection = 'left' | 'right' | 'up' | 'down';

export type AnimationVariant = {
  initial: Target;
  animate: Target;
  exit?: Target;
  transition?: Transition;
};
