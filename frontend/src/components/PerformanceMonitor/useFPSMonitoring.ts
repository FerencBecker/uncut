import { useRef, useState } from 'react';
import type { FPSMetrics } from '@/types/performance';
import { calculateFPSMetrics } from '@/utils/performanceTracking';

const MAX_FPS_SAMPLES = 60;

const useFPSMonitoring = () => {
  const [metrics, setMetrics] = useState<FPSMetrics>({
    current: 0,
    average: 0,
    min: 0,
    max: 0,
    samples: [],
  });

  const framesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  const measureFrame = () => {
    const currentTime = window.performance.now();
    const fps = 1000 / (currentTime - lastFrameTimeRef.current);
    framesRef.current.push(fps);
    if (framesRef.current.length > MAX_FPS_SAMPLES) framesRef.current.shift();

    lastFrameTimeRef.current = currentTime;
    animationIdRef.current = requestAnimationFrame(measureFrame);
  };

  const start = () => {
    if (animationIdRef.current !== null) return;
    lastFrameTimeRef.current = window.performance.now();
    animationIdRef.current = requestAnimationFrame(measureFrame);
  };

  const stop = () => {
    if (animationIdRef.current === null) return;
    cancelAnimationFrame(animationIdRef.current);
    animationIdRef.current = null;
  };

  const reset = () => {
    framesRef.current = [];
    lastFrameTimeRef.current = 0;
    setMetrics({
      current: 0,
      average: 0,
      min: 0,
      max: 0,
      samples: [],
    });
  };

  const update = (): FPSMetrics => {
    const newMetrics = calculateFPSMetrics(framesRef.current);
    setMetrics(newMetrics);
    return newMetrics;
  };

  return {
    metrics,
    start,
    stop,
    update,
    reset,
  };
};

export default useFPSMonitoring;
