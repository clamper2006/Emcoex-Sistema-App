export function showToast(type, title, message) {
  const container = document.getElementById('toast-container');
  if(!container) return;
  const colors = {
    success: { bg: 'rgba(34,197,94,0.12)', border: '#22c55e', icon: 'check-circle' },
    info: { bg: 'rgba(99,102,241,0.12)', border: '#6366f1', icon: 'info' },
    error: { bg: 'rgba(239,68,68,0.12)', border: '#ef4444', icon: 'alert-circle' },
  };
  const c = colors[type] || colors.info;
  const toastId = 'toast-' + Date.now();
  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = 'toast glass-strong animate-slide-in-right';
  toast.style.borderLeft = `3px solid ${c.border}`;
  toast.innerHTML = `
    <i data-lucide="${c.icon}" class="w-4 h-4 mt-0.5 flex-shrink-0" style="color:${c.border}"></i>
    <div class="flex-1">
      <p class="text-sm font-semibold">${title}</p>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">${message}</p>
    </div>
    <button onclick="document.getElementById('${toastId}').remove()" class="text-[var(--text-tertiary)] hover:text-white transition">
      <i data-lucide="x" class="w-3.5 h-3.5"></i>
    </button>`;
  container.appendChild(toast);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  setTimeout(() => {
    if (document.getElementById(toastId)) {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4200);
}

export function toggleMobileSidebar(forceClose) {
  const sidebar = document.getElementById('mobile-sidebar');
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  if(!sidebar || !backdrop) return;
  const isOpen = !sidebar.classList.contains('hidden');
  if (forceClose || isOpen) {
    sidebar.classList.add('hidden');
    sidebar.classList.remove('flex');
    backdrop.classList.add('hidden');
  } else {
    sidebar.classList.remove('hidden');
    sidebar.classList.add('flex', 'animate-slide-in-right');
    backdrop.classList.remove('hidden');
  }
}

export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
