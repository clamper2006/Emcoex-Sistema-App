import { renderDashboard } from './dashboard.js';
import { currentRole, restoreRole } from './roles.js';

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  if (!window.location.hash) {
    window.location.hash = '#landing';
  } else {
    handleRoute();
  }
}

export function goToScreen(screenName) {
  window.location.hash = `#${screenName}`;
}

function handleRoute() {
  const hash = window.location.hash.substring(1) || 'landing';
  
  if (hash === 'dashboard') {
    const activeRole = currentRole || restoreRole();
    if (!activeRole) {
      window.location.hash = '#role';
      return;
    }
    renderDashboard(activeRole);
  }

  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  const target = document.getElementById(`screen-${hash}`);
  if(target) target.classList.add('active');
  
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
