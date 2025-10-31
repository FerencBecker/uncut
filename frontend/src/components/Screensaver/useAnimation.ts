import { useEffect, useState } from 'react';

const BATCH_SIZE = 5;
const BATCH_DELAY = 0.5; // seconds between batches
const ANIMATION_DURATION = 6; // seconds for each marker animation
const LOOP_PAUSE = 2; // seconds pause before restarting

type ScreensaverAnimationConfig = {
  studioCount: number;
  enabled: boolean;
};

type AnimationState = {
  animationKey: number;
};

/**
 * Hook to manage continuous loop animation for screensaver mode.
 * Calculates total animation duration based on studio count and batching,
 * then restarts animations with a pause between loops.
 */
export const useAnimation = ({ studioCount, enabled }: ScreensaverAnimationConfig): AnimationState => {
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
