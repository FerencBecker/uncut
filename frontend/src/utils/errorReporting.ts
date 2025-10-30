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

const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Remove query parameters that might contain sensitive data
    urlObj.search = '';
    urlObj.hash = '';
    return urlObj.toString();
  } catch {
    return '[invalid-url]';
  }
};

const sanitizeMessage = (message: string): string => {
  // In production, remove potential sensitive patterns
  if (import.meta.env.PROD) {
    return message
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email]') // emails
      .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[card]') // credit cards
      .replace(/\b[A-Za-z0-9]{20,}\b/g, '[token]'); // potential tokens/keys
  }
  return message;
};

export const createApplicationError = (error: Error, componentStack?: string): ApplicationError => ({
  correlationId: generateCorrelationId(),
  message: sanitizeMessage(error.message),
  stack: import.meta.env.PROD ? undefined : error.stack,
  severity: determineSeverity(error),
  category: categorizeError(error),
  timestamp: Date.now(),
  componentStack: import.meta.env.PROD ? undefined : componentStack,
  userAgent: navigator.userAgent,
  url: sanitizeUrl(window.location.href),
});

export const reportError = (error: ApplicationError): void =>
  console.error(`[${error.correlationId}] ${error.message}`, {
    severity: error.severity,
    category: error.category,
    timestamp: new Date(error.timestamp).toISOString(),
    url: error.url,
  });
