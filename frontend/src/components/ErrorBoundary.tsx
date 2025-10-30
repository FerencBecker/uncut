import { Component, type ErrorInfo, type ReactNode } from 'react';
import type { ErrorBoundaryState } from '@/types/errors';
import { createApplicationError, reportError } from '@/utils/errorReporting';
import './ErrorBoundary.css';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

// Error Boundary component for catching and handling React component errors
// Requires manual intervention (no automatic recovery) for kiosk stability
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Create structured error object
    const appError = createApplicationError(error, errorInfo.componentStack ?? undefined);

    // Report the error
    reportError(appError);

    // Update state with error info
    this.setState({
      errorInfo: appError,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback && errorInfo) {
        return fallback(error, { componentStack: errorInfo.componentStack || '' }, this.handleRetry);
      }

      // Default fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon" role="img" aria-label="Error">
              ⚠️
            </div>
            <h1 className="error-boundary__title">Hiba történt</h1>
            <p className="error-boundary__message">Az alkalmazás egy váratlan hibába ütközött.</p>
            {errorInfo && (
              <p className="error-boundary__correlation">
                Hibaazonosító: <code>{errorInfo.correlationId}</code>
              </p>
            )}
            <div className="error-boundary__actions">
              <button className="error-boundary__button" onClick={this.handleRetry} type="button">
                Újrapróbálás
              </button>
              <button
                className="error-boundary__button error-boundary__button--secondary"
                onClick={() => window.location.reload()}
                type="button"
              >
                Alkalmazás újratöltése
              </button>
            </div>
            {import.meta.env.DEV && error && (
              <details className="error-boundary__details">
                <summary>Fejlesztői információk</summary>
                <pre className="error-boundary__stack">
                  {error.message}
                  {'\n\n'}
                  {error.stack}
                  {errorInfo?.componentStack && (
                    <>
                      {'\n\nComponent Stack:\n'}
                      {errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}
