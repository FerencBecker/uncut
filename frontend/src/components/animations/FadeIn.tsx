import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { AnimationSpeed } from '@/types/animations';
import { fadeVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type FadeInProps = {
  children: ReactNode;
  speed?: AnimationSpeed;
  delay?: number;
  className?: string;
};

export const FadeIn = ({ children, speed = 'base', delay = 0, className }: FadeInProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = fadeVariants(speed);

  return (
    <motion.div
      className={className}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{ ...variants.transition, delay }}
    >
      {children}
    </motion.div>
  );
};
