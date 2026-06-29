import { useEffect } from 'react';
import { TOAST_DURATION_MS } from '../constants/uiConfig';

const formatStatValue = (stat) => {
  if (stat.display) return stat.display;
  if (typeof stat.value === 'boolean') return stat.value ? 'true' : 'false';
  return String(stat.value);
};

export const Toast = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(onDismiss, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const { type, title, subtitle, stats, message, hint } = toast;
  const isError = type === 'error';

  return (
    <div className={`toast toast--${type}`} role="alert" aria-live="polite">
      <div
        className="toast__progress"
        style={{ animationDuration: `${TOAST_DURATION_MS}ms` }}
        aria-hidden="true"
      />
      <div className="toast__accent" aria-hidden="true" />
      <div className="toast__icon" aria-hidden="true">
        {isError ? '✕' : '✓'}
      </div>
      <div className="toast__content">
        <p className="toast__title">{title}</p>
        {subtitle && <p className="toast__subtitle">{subtitle}</p>}

        {stats && (
          <div className="toast__stats">
            {stats.map((stat) => (
              <div
                key={stat.key}
                className={`toast__stat toast__stat--${stat.variant ?? 'default'}`}
              >
                <span className="toast__stat-key">{stat.label}</span>
                <span className="toast__stat-value">{formatStatValue(stat)}</span>
              </div>
            ))}
          </div>
        )}

        {hint && <p className="toast__hint">{hint}</p>}
        {message && <p className="toast__message">{message}</p>}
      </div>
      <button
        type="button"
        className="toast__close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};
