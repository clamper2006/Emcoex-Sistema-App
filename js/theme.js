export function initTheme() {
  const saved = localStorage.getItem('erp_theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  updateThemeIcons();
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const target = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('erp_theme', target);
  updateThemeIcons();
}

function updateThemeIcons() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.querySelectorAll('.theme-icon').forEach(icon => {
    icon.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
