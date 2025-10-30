import { useState } from 'react';
import type { MemoryMetrics } from '@/types/performance';
import { getMemoryMetrics } from '@/utils/performanceTracking';

const useMemoryMonitoring = () => {
  const [metrics, setMetrics] = useState<MemoryMetrics | null>(null);

  const update = (): MemoryMetrics | null => {
    const newMetrics = getMemoryMetrics();
    setMetrics(newMetrics);
    return newMetrics;
  };

  return {
    metrics,
    update,
  };
};

export default useMemoryMonitoring;
