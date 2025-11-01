import { useTheme } from '@/hooks/useTheme';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const icon = isDark ? '☀️' : '🌙';
  const label = isDark ? 'Light' : 'Dark';
  const ariaLabel = `Switch to ${isDark ? 'light' : 'dark'} theme`;

  return (
    <button
      className={`theme-toggle ${isDark ? 'theme-toggle--light-preview' : 'theme-toggle--dark-preview'}`}
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
      type="button"
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="theme-toggle__label">{label}</span>
    </button>
  );
};
