// Theme Switcher for Vágatlanul Kiosk Application
// Handles theme persistence and switching between light/dark modes

/**
 * Initialize theme on page load
 * Reads saved theme from localStorage and applies it
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Update theme toggle button if it exists
  updateThemeToggleButton(savedTheme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'light' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Update theme toggle button if it exists
  updateThemeToggleButton(newTheme);

  console.log(`Theme switched to: ${newTheme}`);
}

/**
 * Update the theme toggle button icon/text based on current theme
 * @param {string} theme - Current theme ('light' or 'dark')
 */
function updateThemeToggleButton(theme) {
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Light';
    } else {
      themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = 'Dark';
    }
  }
}

/**
 * Get current theme
 * @returns {string} Current theme ('light' or 'dark')
 */
function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

/**
 * Set theme explicitly
 * @param {string} theme - Theme to set ('light' or 'dark')
 */
function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') {
    console.error(`Invalid theme: ${theme}. Must be 'light' or 'dark'.`);
    return;
  }

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeToggleButton(theme);

  console.log(`Theme set to: ${theme}`);
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  // DOM is already ready
  initTheme();
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initTheme,
    toggleTheme,
    getCurrentTheme,
    setTheme
  };
}
