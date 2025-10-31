import { useEffect, useState } from 'react';
import { ANIMATION_DURATION, BATCH_DELAY, BATCH_SIZE, LOOP_PAUSE } from '@/config/animation';

type AnimationConfig = {
  studioCount: number;
  enabled: boolean;
};

type AnimationState = {
  animationKey: number;
};

/**
 * Screensaver-specific hook to manage infinite continuous loop animations.
 * Calculates total animation duration based on studio count and batching strategy,
 * then automatically restarts animations with a pause between cycles.
 */
export const useAnimation = ({ studioCount, enabled }: AnimationConfig): AnimationState => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (!enabled || studioCount === 0) return;

    const totalDuration = calculateTotalDuration(studioCount);

    // Set up continuous loop
    const timer = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
    }, totalDuration * 1000);

    return () => clearTimeout(timer);
  }, [animationKey, studioCount, enabled]);

  return { animationKey };
};

const calculateTotalDuration = (studioCount: number): number =>
  Math.floor((studioCount - 1) / BATCH_SIZE) * BATCH_DELAY + ANIMATION_DURATION + LOOP_PAUSE;
