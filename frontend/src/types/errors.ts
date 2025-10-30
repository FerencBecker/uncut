// Error types for error boundary and error reporting
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export type ErrorCategory = 'render' | 'network' | 'state' | 'animation' | 'performance' | 'unknown';

export type ApplicationError = {
  correlationId: string;
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: number;
  componentStack?: string;
  userAgent?: string;
  url?: string;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ApplicationError | null;
};
