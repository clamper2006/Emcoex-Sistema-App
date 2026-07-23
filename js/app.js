import { showToast, toggleMobileSidebar } from './ui.js';
import { goToScreen, initRouter } from './router.js';
import { initTheme, toggleTheme } from './theme.js';
import { simulateLogin } from './auth.js';
import { buildRoleGrid, ROLES, selectedRoleTemp, setSelectedRoleTemp, setCurrentRole } from './roles.js';
import { renderDashboard, switchRole, deleteRecordHandler } from './dashboard.js';

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}

// Global scope bindings for inline HTML handlers
window.goToScreen = goToScreen;
window.simulateLogin = simulateLogin;
window.switchRole = switchRole;
window.toggleMobileSidebar = toggleMobileSidebar;
window.deleteRecord = deleteRecordHandler;
window.toggleTheme = toggleTheme;

window.selectRoleTemp = function(roleKey) {
  setSelectedRoleTemp(roleKey);
  document.querySelectorAll('.role-card').forEach((card) => {
    card.classList.toggle('selected', card.dataset.role === roleKey);
  });
  const btn = document.getElementById('btn-continue-role');
  if (btn) {
    btn.disabled = false;
    btn.classList.remove('opacity-40', 'cursor-not-allowed');
  }
};

window.confirmRole = function() {
  if (!selectedRoleTemp) return;
  setCurrentRole(selectedRoleTemp);
  goToScreen('dashboard');
  showToast('success', `Bienvenido, ${ROLES[selectedRoleTemp].label}`, 'Tu panel ha sido personalizado según tu rol.');
};

window.selectNavItem = function(el) {
  el.parentElement.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
  el.classList.add('active');
  if (window.innerWidth < 768) toggleMobileSidebar(true);
};

// Init
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  if (typeof lucide !== 'undefined') lucide.createIcons();
  buildRoleGrid();
  initRouter();
});

// Resize listener for mobile sidebar
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    const sidebar = document.getElementById('mobile-sidebar');
    const backdrop = document.getElementById('mobile-sidebar-backdrop');
    if (sidebar) {
      sidebar.classList.add('hidden');
      sidebar.classList.remove('flex');
    }
    if (backdrop) {
      backdrop.classList.add('hidden');
    }
  }
});
