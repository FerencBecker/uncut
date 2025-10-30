import { beforeEach, describe, expect, it, vi } from 'vitest';
import { withErrorHandling } from '@/utils/withErrorHandling';
import * as errorReporting from '@/utils/errorReporting';

describe('withErrorHandling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(errorReporting, 'reportError').mockImplementation(() => {});
  });

  it('executes handler normally when no error occurs', () => {
    const handler = vi.fn(() => 'success');
    const wrapped = withErrorHandling(handler);

    const result = wrapped();

    expect(handler).toHaveBeenCalled();
    expect(result).toBe('success');
    expect(errorReporting.reportError).not.toHaveBeenCalled();
  });

  it('catches synchronous errors in event handlers', () => {
    const handler = vi.fn(() => {
      throw new Error('Sync error');
    });
    const wrapped = withErrorHandling(handler);

    const result = wrapped();

    expect(errorReporting.reportError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Sync error',
        severity: expect.any(String),
      })
    );
    expect(result).toBeUndefined();
  });

  it('catches asynchronous errors in event handlers', async () => {
    const handler = vi.fn(async () => {
      throw new Error('Async error');
    });
    const wrapped = withErrorHandling(handler);

    await wrapped();

    expect(errorReporting.reportError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Async error',
      })
    );
  });

  it('calls custom onError callback when provided', () => {
    const onError = vi.fn();
    const handler = vi.fn(() => {
      throw new Error('Test error');
    });
    const wrapped = withErrorHandling(handler, { onError });

    wrapped();

    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('returns fallback value on error', () => {
    const handler = vi.fn(() => {
      throw new Error('Test error');
    });
    const wrapped = withErrorHandling(handler, { fallbackValue: 'fallback' });

    const result = wrapped();

    expect(result).toBe('fallback');
  });

  it('returns fallback value on async error', async () => {
    const handler = vi.fn(async () => {
      throw new Error('Async error');
    });
    const wrapped = withErrorHandling(handler, { fallbackValue: 'async-fallback' });

    const result = await wrapped();

    expect(result).toBe('async-fallback');
  });

  it('preserves handler arguments', () => {
    const handler = vi.fn((a: number, b: string) => `${a}-${b}`);
    const wrapped = withErrorHandling(handler);

    wrapped(42, 'test');

    expect(handler).toHaveBeenCalledWith(42, 'test');
  });

  it('handles non-Error objects thrown', () => {
    const handler = vi.fn(() => {
      throw 'string error';
    });
    const wrapped = withErrorHandling(handler);

    wrapped();

    expect(errorReporting.reportError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'string error',
      })
    );
  });

  it('works with async handlers that succeed', async () => {
    const handler = vi.fn(async () => 'async-success');
    const wrapped = withErrorHandling(handler);

    const result = await wrapped();

    expect(result).toBe('async-success');
    expect(errorReporting.reportError).not.toHaveBeenCalled();
  });
});
