export const ROLES = {
  administrador: {
    label: 'Administrador', icon: 'shield-check', color: '#6366f1', colorBg: 'rgba(99,102,241,0.15)',
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
    chartTitle1: 'Sesiones por día', chartTitle2: 'Usuarios por rol', formTitle: 'Registrar Usuario', storageKey: 'erp_usuarios',
    fields: [
      { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Ej. María Torres', required: true },
      { name: 'correo', label: 'Correo electrónico', type: 'email', placeholder: 'usuario@empresa.com', required: true },
      { name: 'rol', label: 'Rol asignado', type: 'select', options: ['Administrador', 'Gerente', 'Inspector', 'Proveedor', 'Transportista'], required: true },
      { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Suspendido'], required: true },
    ],
    tableColumns: ['nombre', 'correo', 'rol', 'estado'],
  },
  gerente: {
    label: 'Gerente', icon: 'briefcase', color: '#8b5cf6', colorBg: 'rgba(139,92,246,0.15)',
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
    chartTitle1: 'Despachos por semana', chartTitle2: 'Tipo de operación', formTitle: 'Registrar Despacho', storageKey: 'erp_despachos',
    fields: [
      { name: 'referencia', label: 'N° de referencia', type: 'text', placeholder: 'DSP-2026-001', required: true },
      { name: 'cliente', label: 'Cliente', type: 'text', placeholder: 'Ej. Cleer David C.A.', required: true },
      { name: 'tipo', label: 'Tipo de operación', type: 'select', options: ['Importación', 'Exportación'], required: true },
      { name: 'valorFob', label: 'Valor FOB (USD)', type: 'number', placeholder: '15000', required: true },
    ],
    tableColumns: ['referencia', 'cliente', 'tipo', 'valorFob'],
  },
  inspector: {
    label: 'Inspector', icon: 'clipboard-check', color: '#22c55e', colorBg: 'rgba(34,197,94,0.15)',
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
    chartTitle1: 'Inspecciones por día', chartTitle2: 'Resultados', formTitle: 'Registrar Inspección', storageKey: 'erp_inspecciones',
    fields: [
      { name: 'lote', label: 'N° de lote / contenedor', type: 'text', placeholder: 'CNT-88213', required: true },
      { name: 'tipoCarga', label: 'Tipo de carga', type: 'text', placeholder: 'Ej. Alimentos refrigerados', required: true },
      { name: 'resultado', label: 'Resultado', type: 'select', options: ['Aprobado', 'Observado', 'Rechazado'], required: true },
      { name: 'observaciones', label: 'Observaciones', type: 'textarea', placeholder: 'Detalles de la inspección...' },
    ],
    tableColumns: ['lote', 'tipoCarga', 'resultado'],
  },
  proveedor: {
    label: 'Proveedor', icon: 'warehouse', color: '#f59e0b', colorBg: 'rgba(245,158,11,0.15)',
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
    chartTitle1: 'Lotes entregados', chartTitle2: 'Categoría de producto', formTitle: 'Registrar Lote', storageKey: 'erp_lotes',
    fields: [
      { name: 'codigoLote', label: 'Código de lote', type: 'text', placeholder: 'LT-2026-045', required: true },
      { name: 'producto', label: 'Producto', type: 'text', placeholder: 'Ej. Café en grano', required: true },
      { name: 'cantidad', label: 'Cantidad (kg)', type: 'number', placeholder: '2500', required: true },
      { name: 'categoria', label: 'Categoría', type: 'select', options: ['Frescos', 'Secos', 'Refrigerados'], required: true },
    ],
    tableColumns: ['codigoLote', 'producto', 'cantidad', 'categoria'],
  },
  transportista: {
    label: 'Transportista', icon: 'truck', color: '#ef4444', colorBg: 'rgba(239,68,68,0.15)',
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
    chartTitle1: 'Entregas por día', chartTitle2: 'Puntualidad', formTitle: 'Registrar Entrega', storageKey: 'erp_entregas',
    fields: [
      { name: 'guia', label: 'N° de guía', type: 'text', placeholder: 'GU-77213', required: true },
      { name: 'destino', label: 'Destino', type: 'text', placeholder: 'Ej. Puerto Cabello, Carabobo', required: true },
      { name: 'vehiculo', label: 'Vehículo asignado', type: 'text', placeholder: 'Placa / unidad', required: true },
      { name: 'estado', label: 'Estado', type: 'select', options: ['Programada', 'En ruta', 'Entregada', 'Retrasada'], required: true },
    ],
    tableColumns: ['guia', 'destino', 'vehiculo', 'estado'],
  },
  presidente: {
    label: 'Presidente', icon: 'trending-up', color: '#0ea5e9', colorBg: 'rgba(14,165,233,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Visión Global', icon: 'globe' },
      { label: 'Finanzas', icon: 'pie-chart' },
      { label: 'Estrategia', icon: 'target' },
      { label: 'Aprobaciones', icon: 'check-square' },
    ],
    kpis: [
      { label: 'Operaciones totales', value: '4,521', delta: '+12%', icon: 'activity', color: '#0ea5e9' },
      { label: 'Volumen USD', value: '$12.4M', delta: '+8%', icon: 'dollar-sign', color: '#22c55e' },
      { label: 'Eficiencia', value: '94%', delta: '+2.1%', icon: 'zap', color: '#f59e0b' },
      { label: 'Clientes VIP', value: '18', delta: '0%', icon: 'star', color: '#8b5cf6' },
    ],
    donut: [
      { label: 'Importaciones', value: 55, color: '#0ea5e9' },
      { label: 'Exportaciones', value: 45, color: '#8b5cf6' },
    ],
    chartTitle1: 'Proyección de volumen', chartTitle2: 'Balance Operativo', formTitle: 'Registrar Decisión', storageKey: 'erp_presidente',
    fields: [
      { name: 'asunto', label: 'Asunto estratégico', type: 'text', placeholder: 'Ej. Expansión de rutas', required: true },
      { name: 'departamento', label: 'Departamento afectado', type: 'select', options: ['Operaciones', 'Finanzas', 'Logística', 'Legal'], required: true },
      { name: 'impacto', label: 'Impacto estimado', type: 'select', options: ['Alto', 'Medio', 'Bajo'], required: true },
      { name: 'notas', label: 'Notas', type: 'textarea', placeholder: 'Detalles de la decisión...' },
    ],
    tableColumns: ['asunto', 'departamento', 'impacto'],
  },
  agente_aduanal: {
    label: 'Agente Aduanal', icon: 'landmark', color: '#10b981', colorBg: 'rgba(16,185,129,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Declaraciones', icon: 'file-text' },
      { label: 'Aranceles', icon: 'calculator' },
      { label: 'Inspecciones', icon: 'search' },
      { label: 'Normativas', icon: 'book-open' },
    ],
    kpis: [
      { label: 'DUAs Procesadas', value: '156', delta: '+4%', icon: 'file-text', color: '#10b981' },
      { label: 'Impuestos pagados', value: '$840K', delta: '-2%', icon: 'dollar-sign', color: '#f59e0b' },
      { label: 'Tiempo aduana', value: '2.1 días', delta: '-15%', icon: 'clock', color: '#6366f1' },
      { label: 'Retenciones', value: '3', delta: '-50%', icon: 'alert-triangle', color: '#ef4444' },
    ],
    donut: [
      { label: 'Aprobadas', value: 85, color: '#10b981' },
      { label: 'En revisión', value: 12, color: '#f59e0b' },
      { label: 'Retenidas', value: 3, color: '#ef4444' },
    ],
    chartTitle1: 'Declaraciones por día', chartTitle2: 'Estado Aduanero', formTitle: 'Registrar DUA', storageKey: 'erp_aduanal',
    fields: [
      { name: 'dua', label: 'N° DUA', type: 'text', placeholder: 'DUA-88123-2026', required: true },
      { name: 'cliente', label: 'Cliente', type: 'text', placeholder: 'Ej. Empresa XYZ', required: true },
      { name: 'impuestos', label: 'Impuestos ($)', type: 'number', placeholder: '2500', required: true },
      { name: 'estado', label: 'Estado', type: 'select', options: ['Borrador', 'Presentada', 'Aprobada', 'Retenida'], required: true },
    ],
    tableColumns: ['dua', 'cliente', 'impuestos', 'estado'],
  },
  analista_documental: {
    label: 'Analista Doc.', icon: 'files', color: '#f43f5e', colorBg: 'rgba(244,63,94,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Expedientes', icon: 'folder-open' },
      { label: 'Validaciones', icon: 'file-check' },
      { label: 'Firma Digital', icon: 'pen-tool' },
      { label: 'Archivo Histórico', icon: 'archive' },
    ],
    kpis: [
      { label: 'Docs procesados', value: '1,204', delta: '+22%', icon: 'files', color: '#f43f5e' },
      { label: 'Errores', value: '14', delta: '-30%', icon: 'alert-circle', color: '#f59e0b' },
      { label: 'Tiempo revisión', value: '12 min', delta: '-5%', icon: 'clock', color: '#10b981' },
      { label: 'Exp. cerrados', value: '89', delta: '+11%', icon: 'check-square', color: '#6366f1' },
    ],
    donut: [
      { label: 'Validados', value: 90, color: '#10b981' },
      { label: 'Observados', value: 10, color: '#f43f5e' },
    ],
    chartTitle1: 'Tasa de revisión diaria', chartTitle2: 'Calidad Documental', formTitle: 'Validar Expediente', storageKey: 'erp_documental',
    fields: [
      { name: 'expediente', label: 'N° Expediente', type: 'text', placeholder: 'EXP-10023', required: true },
      { name: 'tipo', label: 'Tipo de Documento', type: 'select', options: ['Factura Comercial', 'Bill of Lading', 'Certificado Origen', 'Seguro'], required: true },
      { name: 'validacion', label: 'Estado Validación', type: 'select', options: ['Conforme', 'Con Errores', 'Falta Firma'], required: true },
      { name: 'comentarios', label: 'Comentarios', type: 'textarea', placeholder: 'Observaciones del analista...' },
    ],
    tableColumns: ['expediente', 'tipo', 'validacion'],
  },
  auditor: {
    label: 'Auditor', icon: 'clipboard-list', color: '#eab308', colorBg: 'rgba(234,179,8,0.15)',
    menu: [
      { label: 'Resumen', icon: 'layout-dashboard' },
      { label: 'Trazabilidad', icon: 'git-commit' },
      { label: 'Conformidad', icon: 'shield-alert' },
      { label: 'Hallazgos', icon: 'flag' },
      { label: 'Reportes', icon: 'file-bar-chart' },
    ],
    kpis: [
      { label: 'Auditorías', value: '12', delta: '+20%', icon: 'clipboard-list', color: '#eab308' },
      { label: 'Hallazgos', value: '4', delta: '-10%', icon: 'flag', color: '#f43f5e' },
      { label: 'Riesgo Global', value: 'Bajo', delta: '0%', icon: 'shield', color: '#10b981' },
      { label: 'Cumplimiento', value: '98%', delta: '+1%', icon: 'check-circle', color: '#6366f1' },
    ],
    donut: [
      { label: 'Conformes', value: 75, color: '#10b981' },
      { label: 'Menores', value: 15, color: '#eab308' },
      { label: 'Mayores', value: 10, color: '#f43f5e' },
    ],
    chartTitle1: 'Evaluaciones semanales', chartTitle2: 'Severidad', formTitle: 'Registrar Hallazgo', storageKey: 'erp_auditoria',
    fields: [
      { name: 'referencia', label: 'Ref. Operación', type: 'text', placeholder: 'AUD-2026-X', required: true },
      { name: 'proceso', label: 'Proceso Auditado', type: 'select', options: ['Despacho', 'Finanzas', 'Documental', 'Transporte'], required: true },
      { name: 'nivel', label: 'Nivel Riesgo', type: 'select', options: ['Bajo', 'Medio', 'Alto', 'Crítico'], required: true },
      { name: 'descripcion', label: 'Descripción', type: 'textarea', placeholder: 'Detalle del hallazgo...' },
    ],
    tableColumns: ['referencia', 'proceso', 'nivel'],
  },
};

export const ROLE_KEYS = Object.keys(ROLES);

export let currentRole = null;
export let selectedRoleTemp = null;

export function setCurrentRole(role) {
  currentRole = role;
  localStorage.setItem('erp_current_role', currentRole);
}

export function restoreRole() {
  const saved = localStorage.getItem('erp_current_role');
  if (saved && ROLES[saved]) {
    currentRole = saved;
    return saved;
  }
  return null;
}

export function setSelectedRoleTemp(role) {
  selectedRoleTemp = role;
}

export function buildRoleGrid() {
  const grid = document.getElementById('role-grid');
  if(!grid) return;
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

export function roleKeyOf(role) {
  return ROLE_KEYS.find((k) => ROLES[k] === role);
}
