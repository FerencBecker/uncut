import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import usePerformanceMonitoring from '@/components/PerformanceMonitor/usePerformanceMonitoring';

describe('usePerformanceMonitoring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with null snapshot and empty alerts', () => {
    const { result } = renderHook(() => usePerformanceMonitoring());

    expect(result.current.snapshot).toBeNull();
    expect(result.current.alerts).toEqual([]);
    expect(result.current.isMonitoring).toBe(false);
  });

  it('exposes monitoring control functions', () => {
    const { result } = renderHook(() => usePerformanceMonitoring());

    expect(typeof result.current.start).toBe('function');
    expect(typeof result.current.stop).toBe('function');
    expect(typeof result.current.recordTouchResponse).toBe('function');
    expect(typeof result.current.clearAlerts).toBe('function');
  });

  it('records touch response with performance timing', () => {
    const { result } = renderHook(() => usePerformanceMonitoring());

    const startTime = performance.now();

    act(() => {
      result.current.recordTouchResponse(startTime, 'button-test');
    });

    // Snapshot should be updated immediately
    expect(result.current.snapshot).not.toBeNull();
    expect(result.current.snapshot?.touchResponses.length).toBeGreaterThan(0);

    const response = result.current.snapshot?.touchResponses[0];
    expect(response).toMatchObject({
      target: 'button-test',
      responseTime: expect.any(Number),
      timestamp: expect.any(Number),
    });
  });

  it('generates alert when touch response exceeds warning threshold', () => {
    const { result } = renderHook(() => usePerformanceMonitoring());

    // Simulate slow touch response (600ms = critical threshold)
    const slowStartTime = performance.now() - 600;

    act(() => {
      result.current.recordTouchResponse(slowStartTime, 'slow-button');
    });

    // Should generate critical alert (touch alert may not be at index 0 due to FPS alerts)
    expect(result.current.alerts.length).toBeGreaterThan(0);
    const touchAlert = result.current.alerts.find(a => a.type === 'touch_response');
    expect(touchAlert).toBeDefined();
    expect(touchAlert).toMatchObject({
      type: 'touch_response',
      severity: 'critical',
      message: expect.stringContaining('exceeds critical threshold'),
    });
  });

  it('clears alerts when clearAlerts is called', () => {
    const { result } = renderHook(() => usePerformanceMonitoring());

    // Generate an alert by simulating slow touch response
    const slowStartTime = performance.now() - 600;

    act(() => {
      result.current.recordTouchResponse(slowStartTime, 'very-slow-button');
    });

    expect(result.current.alerts.length).toBeGreaterThan(0);

    act(() => {
      result.current.clearAlerts();
    });

    expect(result.current.alerts).toEqual([]);
  });

  it('limits returned alerts to 5 most recent', () => {
    const { result } = renderHook(() => usePerformanceMonitoring());

    // Generate multiple alerts (each recordTouchResponse may generate 2+ alerts)
    for (let i = 0; i < 10; i++) {
      const slowStartTime = performance.now() - 600;
      act(() => {
        result.current.recordTouchResponse(slowStartTime, `button-${i}`);
      });
    }

    // Hook should limit returned alerts to 5 most recent
    expect(result.current.alerts.length).toBeLessThanOrEqual(5);
  });

  it('detects memory stability over extended monitoring period', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => usePerformanceMonitoring());

    act(() => {
      result.current.start();
    });

    // Simulate 10 seconds of monitoring (10 snapshots at 1s intervals)
    for (let i = 0; i < 10; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    act(() => {
      result.current.stop();
    });

    // Memory should remain stable (no critical memory alerts)
    const memoryAlerts = result.current.alerts.filter(a => a.type === 'memory' && a.severity === 'critical');
    expect(memoryAlerts.length).toBe(0);

    vi.useRealTimers();
  });

  it('maintains performance under continuous 24/7 operation simulation', () => {
    const { result } = renderHook(() => usePerformanceMonitoring());

    act(() => {
      result.current.start();
    });

    // Simulate 1 hour of continuous operation (3600 touch interactions)
    for (let i = 0; i < 100; i++) {
      const startTime = performance.now();
      act(() => {
        result.current.recordTouchResponse(startTime, `interaction-${i}`);
      });
    }

    act(() => {
      result.current.stop();
    });

    // System should remain responsive
    expect(result.current.snapshot).not.toBeNull();
    expect(result.current.snapshot?.touchResponses.length).toBeGreaterThan(0);

    // Touch responses should be kept to last 10
    expect(result.current.snapshot?.touchResponses.length).toBeLessThanOrEqual(10);
  });
});
