import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { AnimationSpeed } from '@/types/animations';
import { scaleVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type ScaleInProps = {
  children: ReactNode;
  speed?: AnimationSpeed;
  initialScale?: number;
  delay?: number;
  className?: string;
};

export const ScaleIn = ({ children, speed = 'base', initialScale = 0.95, delay = 0, className }: ScaleInProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = scaleVariants(speed, initialScale);

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
