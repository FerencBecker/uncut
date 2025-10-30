import { useState } from 'react';
import type { TouchResponseMetrics } from '@/types/performance';

const useTouchResponseTracking = () => {
  const [responses, setResponses] = useState<TouchResponseMetrics[]>([]);

  const record = (startTime: number, target?: string): TouchResponseMetrics => {
    const metric: TouchResponseMetrics = {
      responseTime: window.performance.now() - startTime,
      timestamp: Date.now(),
      target,
    };
    setResponses(prev => [metric, ...prev].slice(0, 10));
    return metric;
  };

  return {
    responses,
    record,
    reset: () => setResponses([]),
  };
};

export default useTouchResponseTracking;
