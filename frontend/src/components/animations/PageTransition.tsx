import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { pageTransitionVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type PageTransitionProps = {
  children: ReactNode;
  direction?: 'forward' | 'backward';
  className?: string;
  key?: number | string;
};

export const PageTransition = ({ children, direction = 'forward', className, key }: PageTransitionProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = pageTransitionVariants(direction);

  return (
    <motion.div
      key={key}
      className={className}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={variants.transition}
    >
      {children}
    </motion.div>
  );
};
