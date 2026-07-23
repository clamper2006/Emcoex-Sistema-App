# MASTERPLAN.md — ERP-Comex

> **Este documento es la única fuente de verdad (Single Source of Truth) del proyecto ERP-Comex.**
>
> A partir de este momento actuarás como el Arquitecto Principal y Director Técnico del proyecto. Antes de escribir una sola línea de código, deberás leer completamente este documento. Al finalizar cada iteración de desarrollo deberás actualizarlo para reflejar el estado real del proyecto.
>
> Ningún agente debe tomar decisiones importantes sin consultar primero este archivo.

---

# IDENTIDAD DEL PROYECTO

## Nombre

ERP-Comex

## Cliente

Empresa de Comercio Exterior del Estado Lara (EMCOEX Lara)

## Objetivo

Desarrollar una Progressive Web App (PWA) profesional que permita digitalizar y optimizar la gestión logística, documental y operativa del comercio exterior de EMCOEX Lara.

El proyecto comenzará como un MVP demostrativo y evolucionará progresivamente hasta convertirse en un ERP especializado con arquitectura Offline-First.

---

# FILOSOFÍA DEL PROYECTO

Este proyecto NO busca escribir mucho código.

Busca construir un producto real.

Cada decisión debe responder a estas preguntas:

- ¿Hace el sistema más profesional?
- ¿Hace el sistema más fácil de mantener?
- ¿Hace el sistema más escalable?
- ¿Reduce deuda técnica?
- ¿Me acerca al ERP final?

Si la respuesta es NO, esa decisión no debe implementarse.

---

# MI ROL

Soy el Product Owner y Tech Lead.

Tú eres el Arquitecto Principal del proyecto.

No eres únicamente un programador.

Tu responsabilidad principal es ayudarme a tomar las mejores decisiones técnicas.

Cada recomendación debe priorizar:

- simplicidad
- mantenibilidad
- escalabilidad
- experiencia de usuario
- arquitectura limpia

---

# TECNOLOGÍAS OFICIALES

Durante esta etapa del proyecto está PROHIBIDO migrar a otras tecnologías.

La aplicación se desarrollará únicamente con:

- HTML5
- CSS3
- JavaScript ES6+

Como Progressive Web App.

No utilizar:

- React
- Vue
- Angular
- TypeScript
- Bootstrap
- Tailwind
- jQuery
- Frameworks SPA

El objetivo es construir un MVP sólido y profesional utilizando únicamente tecnologías web nativas.

---

# OBJETIVOS DEL MVP

Este prototipo debe demostrar el potencial del sistema.

No debe intentar implementar el ERP completo.

El MVP debe incluir únicamente:

- Landing Page
- Login
- Login con Google (cuando corresponda)
- Selección automática de rol
- Dashboard profesional
- Navegación por módulos
- CRUDs básicos
- LocalStorage (temporalmente)
- Diseño premium
- Responsive
- PWA instalable

Todo lo demás queda para futuras versiones.

---

# VISIÓN DEL PRODUCTO FINAL

Cuando el proyecto madure deberá incluir:

- Supabase
- PostgreSQL
- Offline First
- IndexedDB
- Sincronización
- Gestión documental
- Dashboard ejecutivo
- Roles avanzados
- Reportes
- Alertas
- Integraciones gubernamentales
- Firma digital
- Analítica

Pero estas funcionalidades NO deben implementarse todavía.

---

# ARQUITECTURA DEL PROYECTO

La estructura del proyecto debe mantenerse organizada.

Ejemplo:

```text
ERP-Comex/

index.html

manifest.json

service-worker.js

css/
    style.css
    layout.css
    dashboard.css
    themes.css
    components.css

js/
    app.js
    router.js
    auth.js
    storage.js
    dashboard.js
    roles.js
    theme.js
    ui.js

pages/
    dashboard.html
    about.html
    settings.html

assets/
    icons/
    images/
    logos/
```

La estructura podrá evolucionar únicamente si aporta una mejora clara.

---

# PRINCIPIOS DE DISEÑO

Inspirarse en:

- Stripe
- Linear
- Notion
- Supabase
- Vercel
- Clerk

No copiar diseños.

El sistema debe transmitir:

- profesionalismo
- minimalismo
- tecnología
- confianza
- rapidez
- claridad

---

# PRINCIPIOS UX

Siempre priorizar:

- pocas pantallas
- navegación clara
- cero confusión
- cero scroll infinito
- feedback inmediato
- interfaz limpia
- responsive

---

# SISTEMA DE NAVEGACIÓN

La aplicación debe utilizar un único layout.

Debe existir:

- Sidebar
- Navbar
- Área principal

Las vistas deben cambiar dinámicamente.

No crear múltiples páginas innecesarias.

---

# SISTEMA DE TEMAS

Todo el proyecto debe utilizar variables CSS.

Nunca utilizar colores escritos directamente.

Preparar desde el inicio:

- Tema claro
- Tema oscuro

---

# ROLES

Roles oficiales:

Administrador

Presidente

Gerente Operativo

Inspector

Proveedor

Transportista

Agente Aduanal

Analista Documental

Auditor

El dashboard será único.

Lo que cambia será:

- menú
- tarjetas
- formularios
- accesos rápidos
- estadísticas

---

# METODOLOGÍA

El proyecto SIEMPRE se desarrollará mediante pequeñas iteraciones.

Cada iteración debe:

- tener un único objetivo
- quedar completamente terminada
- no romper funcionalidades existentes
- dejar el proyecto estable

Nunca implementar grandes bloques de trabajo.

---

# FLUJO DE TRABAJO DE CADA ITERACIÓN

Antes de escribir código debes responder:

## Objetivo

¿Qué vamos a construir?

## Valor

¿Por qué mejora el producto?

## Impacto

¿Qué archivos modifica?

## Riesgos

¿Qué podría romper?

## Plan

Pasos concretos.

Después generar únicamente el código necesario.

---

# REGLAS DE CÓDIGO

Siempre:

- reutilizar componentes
- evitar duplicación
- escribir código limpio
- nombres claros
- comentarios únicamente cuando aporten valor
- mantener consistencia

Nunca implementar funcionalidades no solicitadas.

---

# ROADMAP

## Fase 1

☐ Diseño profesional

☐ Sidebar

☐ Navbar

☐ Dashboard

☐ Navegación

☐ Responsive

☐ Tema oscuro

☐ Página Acerca de

☐ Configuración

---

## Fase 2

☐ Login Google

☐ Supabase Auth

☐ Roles

☐ Persistencia de sesión

---

## Fase 3

☐ CRUD Usuarios

☐ CRUD Despachos

☐ CRUD Inspecciones

☐ CRUD Proveedores

☐ CRUD Transporte

---

## Fase 4

☐ Base de datos

☐ Storage

☐ Documentos

---

## Fase 5

☐ Offline First

☐ IndexedDB

☐ Sincronización

☐ Outbox Pattern

---

# ESTADO ACTUAL DEL PROYECTO

## Estructura actual

```text
ERP-Comex/
    index.html          (modificado, apunta a nuevos assets)
    manifest.json       (PWA manifest)
    service-worker.js   (Service Worker con cache stale-while-revalidate actualizado)
    ERP-Comex-PWA.zip   (archivo zip del proyecto)
    css/
        themes.css      (variables CSS claro/oscuro)
        base.css        (reset, scrollbar, utilities)
        layout.css      (clases de grid, flex, padding, responsive reemplazando Tailwind)
        components.css  (glass panels, buttons, forms, nav)
        animations.css  (keyframes, animaciones)
    js/
        app.js          (entry point y orchestrator)
        auth.js         (simulación login)
        dashboard.js    (renderizado de dashboard, kpis, charts)
        roles.js        (configuración de roles)
        router.js       (navegación de pantallas)
        storage.js      (abstracción de LocalStorage)
        ui.js           (toasts, sidebar)
    pages/              (preparado para futuras vistas)
    assets/             (preparado para iconos e imágenes)
```

## Deuda técnica identificada

1. **TailwindCSS CDN** — (✅ SOLUCIONADO)
2. **Lucide Icons CDN** — Dependencia externa no declarada
3. **Arquitectura monolítica** — (✅ SOLUCIONADO: módulos ES6)
4. **Roles incompletos** — (✅ SOLUCIONADO: 9 de 9 roles implementados)
5. **Sin sistema de temas** — (✅ SOLUCIONADO: dual theme JS/CSS implementado)
6. **Sin router** — (✅ SOLUCIONADO: hash router implementado)
7. **Colores hardcodeados** — (✅ SOLUCIONADO)
8. **Sin estructura de carpetas** — (✅ SOLUCIONADO)

## Decisiones de arquitectura pendientes

- Decidir estrategia para Lucide Icons (¿mantener CDN o embeber SVGs?)

---

# CHANGELOG

## Iteración 0 — Diagnóstico inicial

Estado: ✅ Completada

Cambios:

- Proyecto analizado completamente
- MASTERPLAN creado como fuente de verdad
- Deuda técnica documentada
- Estado actual registrado

---

## Iteración 1 — Reestructuración de carpetas + CSS base

Estado: ✅ Completada

Cambios:

- Creadas carpetas `css/`, `js/`, `pages/`, `assets/`
- Creados archivos CSS modulares: `themes.css`, `base.css`, `components.css`, `animations.css`
- Definidas variables CSS preparadas para tema claro y oscuro
- Migrados los estilos de `style.css` y eliminado de la raíz
- Movido `script.js` a `js/app.js`
- Actualizadas las referencias en `index.html` y en `service-worker.js`

---

## Iteración 2 — Eliminar TailwindCSS y reescribir layout

Estado: ✅ Completada

Cambios:

- Creado `css/layout.css` con clases nativas que replican los requerimientos de UI.
- Eliminado CDN de TailwindCSS de `index.html`.
- Media queries nativas incluidas (`sm`, `md`, `lg`).
- Sistema 100% independiente y libre del framework externo.
- Actualizado `service-worker.js` para cachear el nuevo archivo.

---

## Iteración 3 — Modularizar JavaScript

Estado: ✅ Completada

Cambios:
- Eliminado archivo JS monolítico (~600 líneas).
- Creados módulos ES6 independientes: `ui.js`, `storage.js`, `router.js`, `roles.js`, `dashboard.js`, `auth.js`.
- Modificado `app.js` para servir de orquestador principal e inyectar dependencias globales.
- Etiqueta `<script type="module">` implementada en el HTML.

---

## Iteración 4 — Implementar Roles Completos

Estado: ✅ Completada

Cambios:
- Se implementaron los 4 roles faltantes del MASTERPLAN en `js/roles.js`: Presidente, Agente Aduanal, Analista Documental y Auditor.
- Cada rol cuenta con su propio icono representativo, paleta de colores, menú lateral específico y KPIs únicos de su área.
- Se definieron los esquemas de formulario, configuraciones de la tabla (tableColumns) y datos base para los gráficos en el dashboard.

---

## Iteración 5 — Enrutador SPA basado en Hash

Estado: ✅ Completada

Cambios:
- Implementado sistema de rutas basado en `window.location.hash` en `js/router.js`.
- Eliminado el renderizado directo del dashboard mediante funciones manuales, integrándolo de forma declarativa con el router.
- Agregada lógica de persistencia y guardia de navegación: al recargar en `index.html#dashboard`, el router restaura el rol desde el LocalStorage.
- El cambio de URLs actualiza la vista, dándole comportamiento genuino de Single Page Application sin frameworks externos.

---

## Iteración 6 — Sistema de Temas Claro/Oscuro

Estado: ✅ Completada

Cambios:
- Implementado el módulo `js/theme.js` para la gestión dinámica del tema.
- Se agregaron botones tipo *toggle* en la navegación principal (landing) y en las barras superiores del dashboard (escritorio y móvil).
- Al cambiar de tema, el icono de Lucide se actualiza (Sol/Luna) y se modifica el atributo `data-theme` en la raíz del documento.
- Persistencia del tema elegido en `localStorage`.
- Soporte para la preferencia de esquema de color nativo del sistema operativo (`prefers-color-scheme: light`).

Debes marcar:

- funcionalidades completadas
- funcionalidades pendientes
- decisiones de arquitectura tomadas
- estructura actual del proyecto
- próximos pasos recomendados

Este documento siempre debe representar el estado REAL del proyecto.

Nunca permitas que quede desactualizado.

Si detectas una mejor decisión técnica, primero proponla, justifícala y luego actualiza el MASTERPLAN.md antes de modificar el código.
