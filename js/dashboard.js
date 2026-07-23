import { ROLES, ROLE_KEYS, currentRole, setCurrentRole, roleKeyOf } from './roles.js';
import { showToast, escapeHtml } from './ui.js';
import { getRecords, saveRecord, deleteRecordItem } from './storage.js';

export function renderDashboard(roleKey) {
  const role = ROLES[roleKey];

  const opts = ROLE_KEYS.map((k) => `<option value="${k}" ${k === roleKey ? 'selected' : ''}>${ROLES[k].label}</option>`).join('');
  document.getElementById('role-switcher').innerHTML = opts;
  document.getElementById('role-switcher-mobile').innerHTML = opts;

  document.getElementById('dashboard-title').textContent = role.label;
  const badge = document.getElementById('role-badge-top');
  badge.textContent = role.label;
  badge.style.background = role.colorBg;
  badge.style.color = role.color;

  const navHtml = role.menu.map((item, i) => `
    <div class="nav-item ${i === 0 ? 'active' : ''}" onclick="selectNavItem(this)">
      <i data-lucide="${item.icon}" class="w-4 h-4"></i>
      <span>${item.label}</span>
    </div>`).join('');
  document.getElementById('sidebar-nav').innerHTML = navHtml;
  document.getElementById('sidebar-nav-mobile').innerHTML = navHtml;

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

  document.getElementById('chart-title-1').textContent = role.chartTitle1;
  document.getElementById('chart-title-2').textContent = role.chartTitle2;

  renderLineChart(roleKey);
  renderDonutChart(role.donut);

  document.getElementById('form-title').textContent = role.formTitle;
  renderForm(role);
  renderTable(role);

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

export function switchRole(roleKey) {
  setCurrentRole(roleKey);
  renderDashboard(roleKey);
  showToast('info', 'Rol actualizado', `Ahora estás viendo el panel de ${ROLES[roleKey].label}.`);
}

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

export function renderTable(role) {
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

export function deleteRecordHandler(storageKey, id, roleKey) {
  deleteRecordItem(storageKey, id);
  renderTable(ROLES[roleKey]);
  showToast('info', 'Registro eliminado', 'El registro fue removido correctamente.');
}
