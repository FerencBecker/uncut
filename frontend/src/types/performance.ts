// Performance monitoring types
export type PerformanceMetricType = 'fps' | 'touch_response' | 'memory';

export type Severity = 'ok' | 'warning' | 'critical';

export type PerformanceMetric = {
  type: PerformanceMetricType;
  value: number;
  timestamp: number;
  label?: string;
};

export type FPSMetrics = {
  current: number;
  average: number;
  min: number;
  max: number;
  samples: number[];
};

export const emptyFPSMetrics: FPSMetrics = {
  current: 0,
  average: 0,
  min: 0,
  max: 0,
  samples: [],
};

export type MemoryMetrics = {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  percentUsed: number;
};

export type TouchResponseMetrics = {
  responseTime: number;
  timestamp: number;
  target?: string;
};

export type Threshold = {
  target: number;
  warning: number;
  critical: number;
};

export type PerformanceThresholds = {
  fps: Threshold;
  touchResponse: Threshold;
  memory: Threshold;
};

export type PerformanceSnapshot = {
  fps: FPSMetrics;
  memory: MemoryMetrics | null;
  touchResponses: TouchResponseMetrics[];
  timestamp: number;
};

export type Performance = {
  type: PerformanceMetricType;
  severity: Severity;
  message?: string;
  value: number;
  timestamp: number;
};
