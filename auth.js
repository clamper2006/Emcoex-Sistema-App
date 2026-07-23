import { showToast, escapeHtml } from './ui.js';
import { goToScreen } from './router.js';
import { buildRoleGrid } from './roles.js';

export function simulateLogin(method) {
  showToast('success', 'Acceso concedido', `Sesión iniciada correctamente${method === 'google' ? ' con Google' : ''}.`);
  buildRoleGrid();
  setTimeout(() => goToScreen('role'), 500);
}
