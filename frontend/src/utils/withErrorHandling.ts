import { createApplicationError, reportError } from './errorReporting';

/**
 * Wraps event handlers with error catching and reporting.
 * ErrorBoundary only catches render errors, not event handler errors.
 * Use this for onClick, onTouch, onSubmit, etc.
 */
export const withErrorHandling = <T extends (...args: any[]) => any>(
  handler: T,
  options?: {
    onError?: (error: Error) => void;
    fallbackValue?: any;
  }
): T => {
  return ((...args: any[]) => {
    try {
      const result = handler(...args);

      // Handle async functions
      if (result instanceof Promise)
        return result.catch(error => {
          const err = error instanceof Error ? error : new Error(String(error));
          const appError = createApplicationError(err);
          reportError(appError);
          options?.onError?.(err);
          return options?.fallbackValue;
        });

      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      const appError = createApplicationError(err);
      reportError(appError);
      options?.onError?.(err);
      return options?.fallbackValue;
    }
  }) as T;
};
