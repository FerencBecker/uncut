import { useAccessibility } from '@/contexts/AccessibilityContext';
import './AccessibilityToggle.css';

export const AccessibilityToggle = () => {
  const { reduceMotion, setReduceMotion } = useAccessibility();

  const icon = reduceMotion ? '✓' : '∿';
  const label = reduceMotion ? 'Motion Off' : 'Motion On';
  const ariaLabel = `${reduceMotion ? 'Enable' : 'Disable'} animations`;

  return (
    <button
      className="accessibility-toggle"
      onClick={() => setReduceMotion(!reduceMotion)}
      aria-label={ariaLabel}
      title={ariaLabel}
      type="button"
      aria-pressed={reduceMotion}
    >
      <span className="accessibility-toggle__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="accessibility-toggle__label">{label}</span>
    </button>
  );
};
