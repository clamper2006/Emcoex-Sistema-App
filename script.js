/* ========================================================================
   ERP-Comex — Lógica principal
   ======================================================================== */

/* ---------- Registro del Service Worker ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}

/* ---------- Configuración de roles ---------- */
const ROLES = {
  administrador: {
    label: 'Administrador',
    icon: 'shield-check',
    color: '#6366f1',
    colorBg: 'rgba(99,102,241,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Usuarios', icon: 'users' },
      { label: 'Permisos', icon: 'lock' },
      { label: 'Auditoría', icon: 'file-search' },
      { label: 'Configuración', icon: 'settings' },
    ],
    kpis: [
      { label: 'Usuarios activos', value: '87', delta: '+4.2%', icon: 'users', color: '#6366f1' },
      { label: 'Roles configurados', value: '5', delta: '0%', icon: 'shield', color: '#8b5cf6' },
      { label: 'Sesiones hoy', value: '312', delta: '+12.8%', icon: 'activity', color: '#22c55e' },
      { label: 'Incidencias', value: '2', delta: '-50%', icon: 'alert-triangle', color: '#f59e0b' },
    ],
    donut: [
      { label: 'Administrador', value: 8, color: '#6366f1' },
      { label: 'Gerente', value: 15, color: '#8b5cf6' },
      { label: 'Inspector', value: 20, color: '#22c55e' },
      { label: 'Proveedor', value: 25, color: '#f59e0b' },
      { label: 'Transportista', value: 19, color: '#ef4444' },
    ],
    chartTitle1: 'Sesiones por día',
    chartTitle2: 'Usuarios por rol',
    formTitle: 'Registrar Usuario',
    storageKey: 'erp_usuarios',
    fields: [
      { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Ej. María Torres', required: true },
      { name: 'correo', label: 'Correo electrónico', type: 'email', placeholder: 'usuario@empresa.com', required: true },
      { name: 'rol', label: 'Rol asignado', type: 'select', options: ['Administrador', 'Gerente', 'Inspector', 'Proveedor', 'Transportista'], required: true },
      { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Suspendido'], required: true },
    ],
    tableColumns: ['nombre', 'correo', 'rol', 'estado'],
  },

  gerente: {
    label: 'Gerente',
    icon: 'briefcase',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Despachos', icon: 'ship' },
      { label: 'Clientes', icon: 'building-2' },
      { label: 'Reportes', icon: 'bar-chart-3' },
      { label: 'Aprobaciones', icon: 'check-circle' },
    ],
    kpis: [
      { label: 'Despachos activos', value: '128', delta: '+8.1%', icon: 'ship', color: '#8b5cf6' },
      { label: 'En aduana', value: '34', delta: '+2.4%', icon: 'landmark', color: '#6366f1' },
      { label: 'Tiempo prom.', value: '3.2 días', delta: '-6%', icon: 'clock', color: '#22c55e' },
      { label: 'Valor FOB total', value: '$2.4M', delta: '+15%', icon: 'dollar-sign', color: '#f59e0b' },
    ],
    donut: [
      { label: 'Importación', value: 62, color: '#8b5cf6' },
      { label: 'Exportación', value: 38, color: '#6366f1' },
    ],
    chartTitle1: 'Despachos por semana',
    chartTitle2: 'Tipo de operación',
    formTitle: 'Registrar Despacho',
    storageKey: 'erp_despachos',
    fields: [
      { name: 'referencia', label: 'N° de referencia', type: 'text', placeholder: 'DSP-2026-001', required: true },
      { name: 'cliente', label: 'Cliente', type: 'text', placeholder: 'Ej. Cleer David C.A.', required: true },
      { name: 'tipo', label: 'Tipo de operación', type: 'select', options: ['Importación', 'Exportación'], required: true },
      { name: 'valorFob', label: 'Valor FOB (USD)', type: 'number', placeholder: '15000', required: true },
    ],
    tableColumns: ['referencia', 'cliente', 'tipo', 'valorFob'],
  },

  inspector: {
    label: 'Inspector',
    icon: 'clipboard-check',
    color: '#22c55e',
    colorBg: 'rgba(34,197,94,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Inspecciones', icon: 'search' },
      { label: 'Checklist normativo', icon: 'list-checks' },
      { label: 'Evidencias', icon: 'camera' },
      { label: 'Historial', icon: 'history' },
    ],
    kpis: [
      { label: 'Inspecciones hoy', value: '24', delta: '+5%', icon: 'clipboard-check', color: '#22c55e' },
      { label: 'Aprobadas', value: '19', delta: '+9%', icon: 'check', color: '#6366f1' },
      { label: 'Con observaciones', value: '5', delta: '-12%', icon: 'alert-circle', color: '#f59e0b' },
      { label: 'Tiempo prom.', value: '42 min', delta: '-4%', icon: 'timer', color: '#8b5cf6' },
    ],
    donut: [
      { label: 'Aprobado', value: 70, color: '#22c55e' },
      { label: 'Observado', value: 20, color: '#f59e0b' },
      { label: 'Rechazado', value: 10, color: '#ef4444' },
    ],
    chartTitle1: 'Inspecciones por día',
    chartTitle2: 'Resultados',
    formTitle: 'Registrar Inspección',
    storageKey: 'erp_inspecciones',
    fields: [
      { name: 'lote', label: 'N° de lote / contenedor', type: 'text', placeholder: 'CNT-88213', required: true },
      { name: 'tipoCarga', label: 'Tipo de carga', type: 'text', placeholder: 'Ej. Alimentos refrigerados', required: true },
      { name: 'resultado', label: 'Resultado', type: 'select', options: ['Aprobado', 'Observado', 'Rechazado'], required: true },
      { name: 'observaciones', label: 'Observaciones', type: 'textarea', placeholder: 'Detalles de la inspección...' },
    ],
    tableColumns: ['lote', 'tipoCarga', 'resultado'],
  },

  proveedor: {
    label: 'Proveedor',
    icon: 'warehouse',
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Mis lotes', icon: 'boxes' },
      { label: 'Certificaciones', icon: 'award' },
      { label: 'Pagos', icon: 'credit-card' },
      { label: 'Contratos', icon: 'file-text' },
    ],
    kpis: [
      { label: 'Lotes activos', value: '46', delta: '+3.5%', icon: 'boxes', color: '#f59e0b' },
      { label: 'Certificaciones vigentes', value: '12', delta: '0%', icon: 'award', color: '#22c55e' },
      { label: 'Pagos pendientes', value: '$18.3K', delta: '-10%', icon: 'credit-card', color: '#ef4444' },
      { label: 'Calificación', value: '4.8/5', delta: '+0.2', icon: 'star', color: '#8b5cf6' },
    ],
    donut: [
      { label: 'Frescos', value: 40, color: '#f59e0b' },
      { label: 'Secos', value: 35, color: '#8b5cf6' },
      { label: 'Refrigerados', value: 25, color: '#22c55e' },
    ],
    chartTitle1: 'Lotes entregados',
    chartTitle2: 'Categoría de producto',
    formTitle: 'Registrar Lote',
    storageKey: 'erp_lotes',
    fields: [
      { name: 'codigoLote', label: 'Código de lote', type: 'text', placeholder: 'LT-2026-045', required: true },
      { name: 'producto', label: 'Producto', type: 'text', placeholder: 'Ej. Café en grano', required: true },
      { name: 'cantidad', label: 'Cantidad (kg)', type: 'number', placeholder: '2500', required: true },
      { name: 'categoria', label: 'Categoría', type: 'select', options: ['Frescos', 'Secos', 'Refrigerados'], required: true },
    ],
    tableColumns: ['codigoLote', 'producto', 'cantidad', 'categoria'],
  },

  transportista: {
    label: 'Transportista',
    icon: 'truck',
    color: '#ef4444',
    colorBg: 'rgba(239,68,68,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Entregas', icon: 'truck' },
      { label: 'Rutas', icon: 'map' },
      { label: 'Vehículos', icon: 'car' },
      { label: 'Incidencias', icon: 'alert-triangle' },
    ],
    kpis: [
      { label: 'Entregas hoy', value: '17', delta: '+6%', icon: 'truck', color: '#ef4444' },
      { label: 'En ruta', value: '9', delta: '+2%', icon: 'map-pin', color: '#f59e0b' },
      { label: 'Completadas', value: '8', delta: '+14%', icon: 'check-circle', color: '#22c55e' },
      { label: 'Km recorridos', value: '412', delta: '+3%', icon: 'route', color: '#6366f1' },
    ],
    donut: [
      { label: 'A tiempo', value: 78, color: '#22c55e' },
      { label: 'Con retraso', value: 22, color: '#ef4444' },
    ],
    chartTitle1: 'Entregas por día',
    chartTitle2: 'Puntualidad',
    formTitle: 'Registrar Entrega',
    storageKey: 'erp_entregas',
    fields: [
      { name: 'guia', label: 'N° de guía', type: 'text', placeholder: 'GU-77213', required: true },
      { name: 'destino', label: 'Destino', type: 'text', placeholder: 'Ej. Puerto Cabello, Carabobo', required: true },
      { name: 'vehiculo', label: 'Vehículo asignado', type: 'text', placeholder: 'Placa / unidad', required: true },
      { name: 'estado', label: 'Estado', type: 'select', options: ['Programada', 'En ruta', 'Entregada', 'Retrasada'], required: true },
    ],
    tableColumns: ['guia', 'destino', 'vehiculo', 'estado'],
  },
};

const ROLE_KEYS = Object.keys(ROLES);
let currentRole = null;
let selectedRoleTemp = null;

/* ---------- Navegación entre pantallas ---------- */
function goToScreen(screenName) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  const target = document.getElementById(`screen-${screenName}`);
  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function simulateLogin(method) {
  showToast('success', 'Acceso concedido', `Sesión iniciada correctamente${method === 'google' ? ' con Google' : ''}.`);
  buildRoleGrid();
  setTimeout(() => goToScreen('role'), 500);
}

/* ---------- Selección de rol ---------- */
function buildRoleGrid() {
  const grid = document.getElementById('role-grid');
  grid.innerHTML = ROLE_KEYS.map((key, i) => {
    const r = ROLES[key];
    return `
      <div class="role-card card p-6 animate-fade-up stagger-${(i % 6) + 1}" data-role="${key}" onclick="selectRoleTemp('${key}')">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:${r.colorBg}">
          <i data-lucide="${r.icon}" class="w-6 h-6" style="color:${r.color}"></i>
        </div>
        <h3 class="font-semibold mb-1">${r.label}</h3>
        <p class="text-xs text-[var(--text-secondary)]">${r.menu.length} secciones disponibles</p>
      </div>`;
  }).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function selectRoleTemp(roleKey) {
  selectedRoleTemp = roleKey;
  document.querySelectorAll('.role-card').forEach((card) => {
    card.classList.toggle('selected', card.dataset.role === roleKey);
  });
  const btn = document.getElementById('btn-continue-role');
  btn.disabled = false;
  btn.classList.remove('opacity-40', 'cursor-not-allowed');
}

function confirmRole() {
  if (!selectedRoleTemp) return;
  currentRole = selectedRoleTemp;
  localStorage.setItem('erp_current_role', currentRole);
  renderDashboard(currentRole);
  goToScreen('dashboard');
  showToast('success', `Bienvenido, ${ROLES[currentRole].label}`, 'Tu panel ha sido personalizado según tu rol.');
}

/* ---------- Cambio dinámico de rol desde el dashboard ---------- */
function switchRole(roleKey) {
  currentRole = roleKey;
  localStorage.setItem('erp_current_role', currentRole);
  renderDashboard(roleKey);
  showToast('info', 'Rol actualizado', `Ahora estás viendo el panel de ${ROLES[roleKey].label}.`);
}

/* ---------- Render completo del dashboard ---------- */
function renderDashboard(roleKey) {
  const role = ROLES[roleKey];

  // Selectors
  const opts = ROLE_KEYS.map((k) => `<option value="${k}" ${k === roleKey ? 'selected' : ''}>${ROLES[k].label}</option>`).join('');
  document.getElementById('role-switcher').innerHTML = opts;
  document.getElementById('role-switcher-mobile').innerHTML = opts;

  // Header
  document.getElementById('dashboard-title').textContent = role.label;
  const badge = document.getElementById('role-badge-top');
  badge.textContent = role.label;
  badge.style.background = role.colorBg;
  badge.style.color = role.color;

  // Sidebar nav
  const navHtml = role.menu.map((item, i) => `
    <div class="nav-item ${i === 0 ? 'active' : ''}" onclick="selectNavItem(this)">
      <i data-lucide="${item.icon}" class="w-4 h-4"></i>
      <span>${item.label}</span>
    </div>`).join('');
  document.getElementById('sidebar-nav').innerHTML = navHtml;
  document.getElementById('sidebar-nav-mobile').innerHTML = navHtml;

  // KPIs
  document.getElementById('kpi-grid').innerHTML = role.kpis.map((kpi, i) => {
    const positive = !kpi.delta.startsWith('-');
    return `
      <div class="card p-5 animate-fade-up stagger-${i + 1}">
        <div class="flex items-center justify-between mb-3">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:${kpi.color}22">
            <i data-lucide="${kpi.icon}" class="w-4 h-4" style="color:${kpi.color}"></i>
          </div>
          <span class="text-xs font-medium ${positive ? 'text-emerald-400' : 'text-rose-400'}">${kpi.delta}</span>
        </div>
        <p class="text-2xl font-bold">${kpi.value}</p>
        <p class="text-xs text-[var(--text-tertiary)] mt-1">${kpi.label}</p>
      </div>`;
  }).join('');

  // Chart titles
  document.getElementById('chart-title-1').textContent = role.chartTitle1;
  document.getElementById('chart-title-2').textContent = role.chartTitle2;

  // Line chart (simulado con datos pseudoaleatorios deterministas por rol)
  renderLineChart(roleKey);

  // Donut chart
  renderDonutChart(role.donut);

  // Form
  document.getElementById('form-title').textContent = role.formTitle;
  renderForm(role);

  // Table
  renderTable(role);

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function selectNavItem(el) {
  el.parentElement.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
  el.classList.add('active');
  if (window.innerWidth < 768) toggleMobileSidebar(true);
}

function toggleMobileSidebar(forceClose) {
  const sidebar = document.getElementById('mobile-sidebar');
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
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

/* ---------- Gráfico de línea SVG simulado ---------- */
function seededSeries(seedStr, count, min, max) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed += seedStr.charCodeAt(i) * (i + 1);
  const arr = [];
  for (let i = 0; i < count; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    arr.push(Math.round(min + rnd * (max - min)));
  }
  return arr;
}

function renderLineChart(roleKey) {
  const data = seededSeries(roleKey + '_line', 12, 20, 100);
  const w = 400, h = 140, pad = 10;
  const maxV = Math.max(...data), minV = Math.min(...data);
  const stepX = (w - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((v - minV) / (maxV - minV || 1)) * (h - pad * 2);
    return `${x},${y}`;
  });
  const linePath = 'M ' + points.join(' L ');
  const areaPath = `M ${pad},${h - pad} L ` + points.join(' L ') + ` L ${w - pad},${h - pad} Z`;

  const svg = document.getElementById('chart-line');
  svg.innerHTML = `
    <defs>
      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${areaPath}" fill="url(#areaGradient)" />
    <path d="${linePath}" fill="none" stroke="#818cf8" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
    ${points.map((p) => {
      const [x, y] = p.split(',');
      return `<circle cx="${x}" cy="${y}" r="3" fill="#818cf8" />`;
    }).join('')}
  `;
}

/* ---------- Gráfico donut SVG ---------- */
function renderDonutChart(dataArr) {
  const total = dataArr.reduce((s, d) => s + d.value, 0);
  const cx = 60, cy = 60, r = 46, strokeWidth = 16;
  const circumference = 2 * Math.PI * r;
  let offsetAcc = 0;

  const circles = dataArr.map((d) => {
    const fraction = d.value / total;
    const dash = fraction * circumference;
    const gap = circumference - dash;
    const rotation = (offsetAcc / total) * 360 - 90;
    offsetAcc += d.value;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${strokeWidth}"
      stroke-dasharray="${dash} ${gap}" transform="rotate(${rotation} ${cx} ${cy})" stroke-linecap="butt" opacity="0.9" />`;
  }).join('');

  document.getElementById('chart-donut').innerHTML = `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="${strokeWidth}" />
    ${circles}
    <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="16" font-weight="700" fill="#f4f4f6">${total}</text>
  `;

  document.getElementById('donut-legend').innerHTML = dataArr.map((d) => `
    <div class="flex items-center justify-between text-xs">
      <span class="flex items-center gap-2 text-[var(--text-secondary)]">
        <span class="w-2 h-2 rounded-full" style="background:${d.color}"></span>${d.label}
      </span>
      <span class="font-medium">${d.value}</span>
    </div>`).join('');
}

/* ---------- Formulario dinámico ---------- */
function renderForm(role) {
  const form = document.getElementById('dynamic-form');
  form.innerHTML = role.fields.map((f) => {
    if (f.type === 'select') {
      return `
        <div>
          <label class="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">${f.label}</label>
          <select name="${f.name}" class="input-field" ${f.required ? 'required' : ''}>
            <option value="" disabled selected>Selecciona una opción</option>
            ${f.options.map((o) => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>`;
    }
    if (f.type === 'textarea') {
      return `
        <div>
          <label class="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">${f.label}</label>
          <textarea name="${f.name}" class="input-field" rows="3" placeholder="${f.placeholder || ''}"></textarea>
        </div>`;
    }
    return `
      <div>
        <label class="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">${f.label}</label>
        <input type="${f.type}" name="${f.name}" class="input-field" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''} />
      </div>`;
  }).join('') + `<button type="submit" class="w-full btn-primary rounded-xl py-3 text-sm font-semibold mt-2 flex items-center justify-center gap-2">
      <i data-lucide="save" class="w-4 h-4"></i> ${role.formTitle}
    </button>`;

  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const record = { id: Date.now() };
    role.fields.forEach((f) => { record[f.name] = formData.get(f.name) || ''; });
    saveRecord(role.storageKey, record);
    renderTable(role);
    form.reset();
    showToast('success', 'Registro guardado', `${role.formTitle} completado correctamente.`);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* ---------- LocalStorage helpers ---------- */
function getRecords(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function saveRecord(key, record) {
  const records = getRecords(key);
  records.unshift(record);
  localStorage.setItem(key, JSON.stringify(records));
}

/* ---------- Tabla de registros ---------- */
function renderTable(role) {
  const records = getRecords(role.storageKey);
  const head = document.getElementById('table-head');
  const body = document.getElementById('table-body');
  const empty = document.getElementById('table-empty');
  const count = document.getElementById('record-count');

  head.innerHTML = role.tableColumns.map((c) => `<th class="px-5 py-3 font-medium">${prettify(c)}</th>`).join('') + `<th class="px-5 py-3"></th>`;

  count.textContent = `${records.length} registro${records.length === 1 ? '' : 's'}`;

  if (records.length === 0) {
    body.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  body.innerHTML = records.slice(0, 8).map((r) => `
    <tr class="table-row border-b divider-line">
      ${role.tableColumns.map((c) => `<td class="px-5 py-3 text-[var(--text-secondary)]">${escapeHtml(String(r[c] ?? '—'))}</td>`).join('')}
      <td class="px-5 py-3 text-right">
        <button onclick="deleteRecord('${role.storageKey}', ${r.id}, '${roleKeyOf(role)}')" class="text-[var(--text-tertiary)] hover:text-rose-400 transition">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </td>
    </tr>`).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function roleKeyOf(role) {
  return ROLE_KEYS.find((k) => ROLES[k] === role);
}

function deleteRecord(storageKey, id, roleKey) {
  const records = getRecords(storageKey).filter((r) => r.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(records));
  renderTable(ROLES[roleKey]);
  showToast('info', 'Registro eliminado', 'El registro fue removido correctamente.');
}

function prettify(str) {
  const map = {
    nombre: 'Nombre', correo: 'Correo', rol: 'Rol', estado: 'Estado',
    referencia: 'Referencia', cliente: 'Cliente', tipo: 'Tipo', valorFob: 'Valor FOB',
    lote: 'Lote', tipoCarga: 'Tipo de carga', resultado: 'Resultado',
    codigoLote: 'Código', producto: 'Producto', cantidad: 'Cantidad', categoria: 'Categoría',
    guia: 'Guía', destino: 'Destino', vehiculo: 'Vehículo',
  };
  return map[str] || str;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Toasts ---------- */
function showToast(type, title, message) {
  const container = document.getElementById('toast-container');
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

/* ---------- Inicialización ---------- */
window.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Si hay una sesión de rol guardada, se podría restaurar, pero
  // por UX siempre arrancamos en landing para respetar el flujo solicitado.
  buildRoleGrid();
});

/* Actualiza iconos tras cualquier cambio dinámico global */
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    document.getElementById('mobile-sidebar').classList.add('hidden');
    document.getElementById('mobile-sidebar').classList.remove('flex');
    document.getElementById('mobile-sidebar-backdrop').classList.add('hidden');
  }
});
