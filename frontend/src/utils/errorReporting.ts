import type { ApplicationError, ErrorCategory, ErrorSeverity } from '@/types/errors';

export const generateCorrelationId = (): string =>
  `err-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;

const errorCategories: Array<[ErrorCategory, RegExp]> = [
  ['network', /network|fetch/],
  ['state', /state|store/],
  ['animation', /animation|motion/],
  ['performance', /performance|timeout/],
  ['render', /render|component/],
];

export const categorizeError = (error: Error): ErrorCategory => {
  const result = errorCategories.find(([, pattern]) => pattern.test(error.message.toLowerCase()));
  return result ? result[0] : 'unknown';
};

const errorSeverities: Array<[ErrorSeverity, RegExp]> = [
  ['critical', /critical|fatal|memory/],
  ['high', /network|state|render/],
  ['medium', /animation|performance/],
];

export const determineSeverity = (error: Error): ErrorSeverity => {
  const result = errorSeverities.find(([, pattern]) => pattern.test(error.message.toLowerCase()));
  return result ? result[0] : 'low';
};

export const createApplicationError = (error: Error, componentStack?: string): ApplicationError => ({
  correlationId: generateCorrelationId(),
  message: error.message,
  stack: error.stack,
  severity: determineSeverity(error),
  category: categorizeError(error),
  timestamp: Date.now(),
  componentStack,
  userAgent: navigator.userAgent,
  url: window.location.href,
});

export const reportError = (error: ApplicationError): void =>
  console.error(`[${error.correlationId}] ${error.message}`, {
    severity: error.severity,
    category: error.category,
    timestamp: new Date(error.timestamp).toISOString(),
    url: error.url,
  });
