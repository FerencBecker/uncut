import {
  emptyFPSMetrics,
  FPSMetrics,
  MemoryMetrics,
  Performance,
  PerformanceMetricType,
  PerformanceThresholds,
  Severity,
  Threshold,
} from '@/types/performance';

const calculateMinimumSeverity = (value: number, threshold: Threshold): Severity =>
  value <= threshold.critical ? 'critical' : value <= threshold.warning ? 'warning' : 'ok';

const calculateMaximumSeverity = (value: number, threshold: Threshold): Severity =>
  value >= threshold.critical ? 'critical' : value >= threshold.warning ? 'warning' : 'ok';

const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  fps: {
    target: 60,
    warning: 50,
    critical: 30,
  },
  touchResponse: {
    target: 200,
    warning: 300,
    critical: 500,
  },
  memory: {
    target: 0.7, // 70% of heap limit
    warning: 0.8, // 80% of heap limit
    critical: 0.9, // 90% of heap limit
  },
};

// FPS calculation from frame samples
export const calculateFPSMetrics = (frames: number[]): FPSMetrics =>
  frames.length === 0
    ? emptyFPSMetrics
    : {
        current: Math.round(frames[frames.length - 1] || 0),
        average: Math.round(frames.reduce((sum, fps) => sum + fps, 0) / frames.length),
        min: Math.round(Math.min(...frames)),
        max: Math.round(Math.max(...frames)),
        samples: [...frames],
      };

type PerformanceConfig = {
  type: PerformanceMetricType;
  calculateSeverity: (v: number, t: Threshold) => Severity;
  formatMessage: (v: number, s: Severity) => string;
  threshold: Threshold;
};

export const PERFORMANCE_CONFIG: Record<PerformanceMetricType, PerformanceConfig> = {
  fps: {
    type: 'fps',
    calculateSeverity: calculateMinimumSeverity,
    formatMessage: (v: number, s: Severity) => `FPS at ${v} is below ${s} threshold`,
    threshold: DEFAULT_THRESHOLDS.fps,
  },
  memory: {
    type: 'memory',
    calculateSeverity: calculateMaximumSeverity,
    formatMessage: (v: number, _: Severity) => `Memory usage at ${Math.round(v * 100)}% of heap limit`,
    threshold: DEFAULT_THRESHOLDS.memory,
  },
  touch_response: {
    type: 'touch_response',
    calculateSeverity: calculateMaximumSeverity,
    formatMessage: (v: number, s: Severity) => `Touch response time ${Math.round(v)}ms exceeds ${s} threshold`,
    threshold: DEFAULT_THRESHOLDS.touchResponse,
  },
};

export const createPerformance = (config: PerformanceConfig, value: number): Performance => {
  const severity = config.calculateSeverity(value, config.threshold);
  return {
    type: config.type,
    severity,
    message: severity !== 'ok' ? config.formatMessage(value, severity) : '',
    value,
    timestamp: Date.now(),
  };
};

// Memory monitoring using performance.memory API (Chrome only)
export const getMemoryMetrics = (): MemoryMetrics | null => {
  if (typeof performance === 'undefined' || !(performance as any).memory) return null;

  const memory = (performance as any).memory;
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    percentUsed: memory.usedJSHeapSize / memory.jsHeapSizeLimit,
  };
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatMs = (ms: number): string => `${Math.round(ms)}ms`;
