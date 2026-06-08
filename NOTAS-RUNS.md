# Bitácora de runs — observaciones del evaluador

> Registro en vivo de cómo se comporta cada filosofía al construir la misma app
> desde el mismo arranque neutro. Insumo para el análisis final
> (`INSTRUCCION-ANALISIS.md`). _En progreso._

---

## 🟦 SpecOps — `todo-specops`

> Fuente: `todo-specops/CONTEXTO-sesion-spec-2026-06-08.md` (recap de la sesión)
> + anotaciones personales del evaluador. Modelo: claude-opus-4-8. SpecOps v0.11.0.

**1. Cómo arrancó la sesión**
- `/spec` → primero **verificó el framework** (AGENTS.md vía CLAUDE.md) y **leyó sus reglas** (`workflow.md`, `read.md`, `repo-types.md`, `spec.md`, plantilla `project-state.md`) antes de hablar.
- Detectó que no existía `project-spec/project-state.md` → **modo bootstrap**; repo-type `monolith` provisional.
- Recién entonces saludó, aclaró que no crearía worktrees y **preguntó primero** (3 preguntas de bootstrap). La frase neutra del evaluador fue *respuesta* a su 1ª pregunta, no un brief.
- Único artefacto de minuto cero: `project-spec/project-state.md`.

**2. Qué preguntó y en qué orden / qué NO preguntó**
- Preguntó **en bloques con opciones** (no de a una): bootstrap (tipo de app · **stack** · cómo arrancar) → discovery r1 (dolor actual · plataforma · features MVP) → discovery r2 (dónde viven los datos · fuera de scope) → dimensiones (estados de la tarea · términos de dominio) → arquitectura (**stack** concreto · modelo de agrupamiento).
- **Stack: lo preguntó** (dos veces: lo difirió en bootstrap a pedido del evaluador, lo cerró en arquitectura con opciones). → *libertad de stack, con recomendación acorde al problema.*
- **NO preguntó**: la **forma exacta de los datos** (`Task`: campos/tipos/`id`/`createdAt`), los **casos borde** (título vacío, localStorage, XSS) ni el **orden por fecha/prioridad** → los **diseñó el agente** y los dejó registrados en DEC-001.
- Patrón: pregunta lo de **producto/dirección**; resuelve por su cuenta el **contrato técnico** y lo deja por escrito para revisión.

**3. Cuándo documentó · cuándo decidió · cuándo construyó**
- Documentación **progresiva**: cada etapa generó su artefacto, nada por adelantado.
- **Decidió** en modo arquitectura: escribió `DEC-001` en `pending/`, hizo **revisión de cierre** (verdict CERRADA, sin `DECISION PENDING`) y la movió a `closed/`.
- **Ese cierre fue el punto de habilitación**: sin DEC-001 en `closed/`, el framework no deja crear el micro roadmap ni codear. Construir vino **después**.

**4. Artefactos generados**
- `project-spec/`: `project-state.md` → `00-vision/` (product-vision, scope, open-questions) → `decisions/closed/DEC-001-stack-persistencia-modelo.md` → `20-architecture/` (architecture, tech-stack, domain-model) → `40-planning/` (roadmap-macro, definition-of-done, `roadmap-micro/fase-1-00-…` con T1–T6) → `50-delivery/audit-reports/…`.
- También `README.md`, `CONTRIBUTING.md`, `.claude/launch.json`, y el MVP (`index.html`, `styles.css`, `app.js`).
- `project-state.md` se actualizó **al cierre de cada etapa**.

**5. Cómo cerró**
- **Verificación real**: levantó static server (`:4173`), probó con `preview_eval` crear/validar vacío/completar/borrar/filtrar/persistencia tras recarga y **XSS** (un `<img onerror>` se renderizó como texto). Sin errores. Screenshot.
- **Auditoría de cierre** (etapa 7): código vs DEC-001 + arquitectura + DoD → **veredicto PASS** persistido.
- **Aprobación**: pidió OK **antes de cada salto de etapa**; nunca avanzó sin confirmación. Cerró **limpio**, las 7 etapas en `[x]`.

**6. Fricción / sensaciones**
- ✅ Fluido: preguntas en bloque con opciones; cada etapa deja artefacto; verificación ejecutada de verdad; gates proporcionales (registró excepciones en vez de inventar tooling); trazabilidad código → DEC → visión.
- ⚠️ Trabado: lectura de reglas al inicio suma latencia; naming del micro roadmap impuesto por regla (poco intuitivo); stack preguntado dos veces; DEC-001 "todo-en-uno" (stack+persistencia+modelo); **fuga sutil de alcance** ("ordenar por fecha/prioridad" se mencionó en discovery pero no llegó al scope/DEC → no se construyó, la auditoría lo marcó como deuda); confirmaciones repetidas se sienten como paso extra.

**🗒️ Anotaciones personales del evaluador (verbatim)**
- Instalación fácil, no requiere gran cosa.
- Plantea y **reconoce el dolor** (el problema real).
- **Clave para la lógica de negocio.**
- Se acerca de manera **más natural al humano**.
- **Buen entendimiento** del proyecto; **genera más contexto**.
- **Libertad de stack** (recomendación acorde al problema).
- **Acompaña, va de a poco**; acciona mejor hacia la tecnología necesaria; **solo lo justo**.
- ⚠️ **Alta espera, tedioso**; **avance lento.**

---

## 🟩 Marco Estructural — `todo-marco`

**1. Cómo arrancó la sesión**
- _(pendiente)_

**2. Qué preguntó y en qué orden / qué NO preguntó**
- _(pendiente)_

**3. Cuándo documentó · cuándo decidió · cuándo construyó**
- _(pendiente)_

**4. Artefactos generados**
- _(pendiente)_

**5. Cómo cerró**
- _(pendiente)_

**6. Fricción / sensaciones**
- _(pendiente)_

---

## Diferencias que ya saltan a la vista
- _(se completa sobre la marcha)_
