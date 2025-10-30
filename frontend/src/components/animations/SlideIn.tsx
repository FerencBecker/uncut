import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { AnimationSpeed, AnimationDirection } from '@/types/animations';
import { slideVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type SlideInProps = {
  children: ReactNode;
  direction?: AnimationDirection;
  speed?: AnimationSpeed;
  distance?: number;
  delay?: number;
  className?: string;
  key?: number | string;
};

export const SlideIn = ({
  children,
  direction = 'right',
  speed = 'base',
  distance = 50,
  delay = 0,
  className,
  key,
}: SlideInProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = slideVariants(direction, speed, distance);

  return (
    <motion.div
      key={key}
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
