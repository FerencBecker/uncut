import { useRef, useState } from 'react';
import type { Performance, PerformanceSnapshot } from '@/types/performance';
import { createPerformance, PERFORMANCE_CONFIG } from '@/utils/performanceTracking';
import useFPSMonitoring from './useFPSMonitoring';
import useMemoryMonitoring from './useMemoryMonitoring';
import useTouchResponseTracking from './useTouchResponseTracking';

const usePerformanceMonitoring = () => {
  const [snapshot, setSnapshot] = useState<PerformanceSnapshot | null>(null);
  const [alerts, setAlerts] = useState<Performance[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const fps = useFPSMonitoring();
  const memory = useMemoryMonitoring();
  const touch = useTouchResponseTracking();

  const updateIntervalRef = useRef<number | undefined>(undefined);

  const updateSnapshot = () => {
    const fpsMetrics = fps.update();
    const memoryMetrics = memory.update();
    const newSnapshot: PerformanceSnapshot = {
      fps: fpsMetrics,
      memory: memoryMetrics,
      touchResponses: touch.responses,
      timestamp: Date.now(),
    };

    setSnapshot(newSnapshot);
    const fpsPerformance = createPerformance(PERFORMANCE_CONFIG.fps, fpsMetrics.current);
    if (fpsPerformance.severity !== 'ok') setAlerts(a => [fpsPerformance, ...a]);

    if (memoryMetrics) {
      const memoryPerformance = createPerformance(PERFORMANCE_CONFIG.memory, memoryMetrics.percentUsed);
      if (memoryPerformance.severity !== 'ok') setAlerts(a => [memoryPerformance, ...a]);
    }
  };

  const start = () => {
    window.clearInterval(updateIntervalRef.current);
    setIsMonitoring(true);
    fps.start();
    updateIntervalRef.current = window.setInterval(() => updateSnapshot(), 1000);
  };

  const stop = () => {
    setIsMonitoring(false);
    fps.stop();
    window.clearInterval(updateIntervalRef.current);
    updateIntervalRef.current = undefined;
  };

  const recordTouchResponse = (startTime: number, target?: string) => {
    const metric = touch.record(startTime, target);

    const performance = createPerformance(PERFORMANCE_CONFIG.touch_response, metric.responseTime);
    if (performance.severity !== 'ok') setAlerts(a => [performance, ...a]);

    const fpsMetrics = fps.update();
    const memoryMetrics = memory.update();
    const newSnapshot: PerformanceSnapshot = {
      fps: fpsMetrics,
      memory: memoryMetrics,
      touchResponses: [metric, ...touch.responses].slice(0, 10),
      timestamp: Date.now(),
    };

    setSnapshot(newSnapshot);
  };

  return {
    snapshot,
    alerts: alerts.slice(0, 5),
    isMonitoring,
    start,
    stop,
    recordTouchResponse,
    clearAlerts: () => setAlerts([]),
  };
};
export default usePerformanceMonitoring;
