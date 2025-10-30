import type usePerformanceMonitoring from './usePerformanceMonitoring';
import { formatBytes, formatMs } from '@/utils/performanceTracking';
import './PerformanceMonitor.css';

type PerformanceMonitorProps = {
  visible?: boolean;
  onClose?: () => void;
  monitoring: ReturnType<typeof usePerformanceMonitoring>;
};

// Development dashboard for monitoring performance metrics
// Only visible in development mode
export const PerformanceMonitor = ({ visible = false, onClose, monitoring }: PerformanceMonitorProps) => {
  const { snapshot, alerts, isMonitoring, start, stop, clearAlerts } = monitoring;

  if (!visible || !import.meta.env.DEV) return null;

  return (
    <div className="performance-monitor">
      <div className="performance-monitor__header">
        <h3 className="performance-monitor__title">Performance Monitor</h3>
        <div className="performance-monitor__controls">
          {isMonitoring ? (
            <button className="performance-monitor__button" onClick={stop} type="button">
              Pause
            </button>
          ) : (
            <button className="performance-monitor__button" onClick={start} type="button">
              Start
            </button>
          )}
          {onClose && (
            <button className="performance-monitor__button" onClick={onClose} type="button">
              ×
            </button>
          )}
        </div>
      </div>

      <div className="performance-monitor__content">
        {/* FPS Metrics */}
        <section className="performance-monitor__section">
          <h4 className="performance-monitor__section-title">FPS</h4>
          {snapshot?.fps ? (
            <div className="performance-monitor__metrics">
              <div className="performance-monitor__metric">
                <span className="performance-monitor__metric-label">Current:</span>
                <span
                  className={`performance-monitor__metric-value ${
                    snapshot.fps.current < 50 ? 'performance-monitor__metric-value--warning' : ''
                  }`}
                >
                  {snapshot.fps.current} fps
                </span>
              </div>
              <div className="performance-monitor__metric">
                <span className="performance-monitor__metric-label">Average:</span>
                <span className="performance-monitor__metric-value">{snapshot.fps.average} fps</span>
              </div>
              <div className="performance-monitor__metric">
                <span className="performance-monitor__metric-label">Min/Max:</span>
                <span className="performance-monitor__metric-value">
                  {snapshot.fps.min} / {snapshot.fps.max} fps
                </span>
              </div>
            </div>
          ) : (
            <p className="performance-monitor__no-data">No data</p>
          )}
        </section>

        {/* Memory Metrics */}
        <section className="performance-monitor__section">
          <h4 className="performance-monitor__section-title">Memory</h4>
          {snapshot?.memory ? (
            <div className="performance-monitor__metrics">
              <div className="performance-monitor__metric">
                <span className="performance-monitor__metric-label">Used:</span>
                <span
                  className={`performance-monitor__metric-value ${
                    snapshot.memory.percentUsed > 0.8 ? 'performance-monitor__metric-value--warning' : ''
                  }`}
                >
                  {formatBytes(snapshot.memory.usedJSHeapSize)}
                </span>
              </div>
              <div className="performance-monitor__metric">
                <span className="performance-monitor__metric-label">Limit:</span>
                <span className="performance-monitor__metric-value">
                  {formatBytes(snapshot.memory.jsHeapSizeLimit)}
                </span>
              </div>
              <div className="performance-monitor__metric">
                <span className="performance-monitor__metric-label">Percent:</span>
                <span className="performance-monitor__metric-value">
                  {Math.round(snapshot.memory.percentUsed * 100)}%
                </span>
              </div>
            </div>
          ) : (
            <p className="performance-monitor__no-data">Not available (Chrome/Edge only)</p>
          )}
        </section>

        {/* Touch Response Metrics */}
        <section className="performance-monitor__section">
          <h4 className="performance-monitor__section-title">Touch Response (Recent 5)</h4>
          {snapshot?.touchResponses && snapshot.touchResponses.length > 0 ? (
            <div className="performance-monitor__touch-list">
              {snapshot.touchResponses.slice(-5).map((touch, index) => (
                <div key={index} className="performance-monitor__touch-item">
                  <span className="performance-monitor__touch-target">{touch.target || 'unknown'}</span>
                  <span
                    className={`performance-monitor__touch-time ${
                      touch.responseTime > 300 ? 'performance-monitor__metric-value--warning' : ''
                    }`}
                  >
                    {formatMs(touch.responseTime)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="performance-monitor__no-data">No touch events recorded</p>
          )}
        </section>

        {/* Alerts */}
        {alerts.length > 0 && (
          <section className="performance-monitor__section">
            <div className="performance-monitor__section-header">
              <h4 className="performance-monitor__section-title">Alerts ({alerts.length})</h4>
              <button
                className="performance-monitor__button performance-monitor__button--small"
                onClick={clearAlerts}
                type="button"
              >
                Clear
              </button>
            </div>
            <div className="performance-monitor__alerts">
              {alerts.map((alert, index) => (
                <div key={index} className={`performance-monitor__alert performance-monitor__alert--${alert.severity}`}>
                  <span className="performance-monitor__alert-type">{alert.type}</span>
                  <span className="performance-monitor__alert-message">{alert.message}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
