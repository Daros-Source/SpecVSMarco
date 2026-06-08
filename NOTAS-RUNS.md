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

> Fuente: `todo-marco/docs/retrospectiva-sesion-fase1.md` + anotaciones del evaluador.
> Cubre hasta el cierre de Fase 1.

**1. Cómo arrancó la sesión**
- **No habló de la app primero.** Ejecutó el protocolo del Marco antes de responder: `drift-audit.sh --inform` (pre-flight, sin drift) → leyó `project.manifest.json`, `AGENTS.md` y los 4 contratos → leyó del framework `principles.md`, `stack/frontend-react-ts.md`, `stack/database-schema.md`.
- Recién después resumió estado y citó el **Principio 2 (Contratos Explícitos)**: no se codea con contratos vacíos.
- **Arranque ritual y automático, no conversacional**: es *carga de contexto*, no discovery de producto.

**2. Qué preguntó y en qué orden / qué NO preguntó**
- **Una sola tanda de 3 preguntas** (selector), las que **determinan esquema/arquitectura**: (1) dónde viven las tareas → local navegador; (2) features v1 (multi) → las 4; (3) usuarios → solo yo, sin login.
- **NO preguntó**: el **stack** (ya fijado en el manifest como DEC-001 por el bootstrap), el **perfil documental** (LIGHT, DEC-002), el **modelo de datos** (lo diseñó el agente y lo escribió en `blueprint.md`), ni los **casos borde** (aparecieron implícitos en invariantes, sin ronda explícita "¿qué pasa si…?").
- Preguntas **eficientes pero acotadas a lo arquitectónico**; producto/UX y edge cases se resolvieron bajo "guíame vos", no por interrogación.

**3. Cuándo documentó · cuándo decidió · cuándo construyó**
- **Dos gates, no uno.** Gate 1: tras las 3 preguntas registró **DEC-003** (localStorage, divergiendo del `database-schema` del manifest → documentado, no silenciado), **DEC-004** (sin auth), **DEC-005** (Vite); y llenó `constitution`, `roadmap`, `blueprint`. Gate 2: presentó el plan y pidió OK explícito ("¿le doy con el scaffolding de Fase 1?") → tu "vamos" habilitó codear.
- La decisión **cerró por capas**: preguntas → contratos → confirmación → implementación.

**4. Artefactos generados**
- **Pre-existentes (bootstrap)**: `project.manifest.json`, `CLAUDE.md`, `AGENTS.md`, `.claude/hooks/*`, `.marco/`, `docs/`, y los 4 contratos **como plantillas vacías** con DEC-001/002 ya puestas.
- **Llenados/creados en sesión**: `contracts/` (constitution INV-1..5, roadmap, blueprint con modelo de datos, decisions DEC-003..007); proyecto Vite+TS (`package.json`, tsconfigs, `src/` con `types/services/hooks/components/tabs/utils/config`); **tests** (Vitest).
- Nota: el Marco **no usa `project-spec/`** (eso es SpecOps); la "spec" vive distribuida en `contracts/`.

**5. Cómo cerró**
- Verificación funcional real en navegador (CRUD + persistencia INV-1, sin errores).
- Checklist **`pre-merge`** → 1 "No": faltaban tests → **TD-1**. **Te preguntó cómo resolverlo** → elegiste agregarlos ahora → Vitest (DEC-006), 8 tests; apareció una **vуln crítica en vitest** → upgrade v4 → `npm audit` 0.
- Checklist **`cierre-fase`** + **DEC-007** (cierre formal Fase 1).
- **`debate` reviewer externo (orquestador): NO se ejecutó** — sustituido por revisión inline documentada (desproporcionado para MVP trivial + counterpart no garantizado).
- **Commit/push: NO** (no los pediste; quedaron pendientes de tu autorización). Fase 1 cerrada (DEC-007), TD-1 saldada, sin deuda abierta.

**6. Fricción / sensaciones**
- ✅ Fluyó: pre-flight de un comando; tanda de 3 preguntas al grano; DECs antes de codear dieron base clara; loop build→test→navegador directo; el checklist atrapó el hueco real (tests).
- ⚠️ Se trabó: el **preflight clasificó mal por keywords** ("ai-agent-behavior / new-technology / external-integration, riesgo high") en una app sin nada de eso → hubo que ignorarlo; el **manifest pre-comprometió una base de datos** antes de conocer el caso de uso → forzó la divergencia correctiva DEC-003 desde el día 1; contratos como plantillas vacías (dan formato, no ahorran pensar); hiccups de toolchain (`erasableSyntaxOnly`, vuln de vitest); **gobernanza pesada vs app trivial** (pide debates externos desproporcionados); artefacto de la herramienta de preview corrompió un input.
- Síntesis: **fuerte en gobernanza y trazabilidad, pero calibrado para proyectos medianos/grandes**; en un MVP trivial parte de la ceremonia agrega fricción que hay que sortear con criterio.

**🗒️ Anotaciones personales del evaluador (verbatim)**
- Instalación fácil, no requiere gran cosa.
- **Planteamiento estricto / encierra al proyecto desde el comienzo** (perfil LIGHT o cualquier perfil).
- **No hay contexto del problema más que el del comienzo**; **contexto mínimo.**
- **Solo stacks disponibles**; **requiere conocimientos previos.**
- **Abrumador**; "instala a ciegas hasta que topa un error y luego corrige". En sí es un **"arranca y no pregunto mucho".**
- **Cumple bastante el contexto y se autogestiona.**
- **Contratos específicos → dan confiabilidad** al producto y al proceso de la app.
- **Funcional y más rápido.**
- ⚠️ **El humano a veces pierde el control si no lee cada documentación.**

---

## Diferencias que ya saltan a la vista
- **Arranque:** SpecOps *pregunta primero* (discovery humano, difiere el stack); Marco *carga contexto y arranca* (stack ya pre-decidido en el manifest, "no pregunto mucho").
- **Dónde vive el problema:** SpecOps construye **contexto del problema** (reconoce el dolor); Marco tiene **contexto mínimo** del problema más allá del arranque, pero **contratos técnicos específicos** que dan confiabilidad.
- **Stack:** SpecOps = **libertad con recomendación** según el problema; Marco = **solo stacks disponibles**, fijado upfront (y si el caso de uso lo contradice, se corrige con una DEC divergente).
- **Ritmo:** SpecOps = **lento, tedioso, "de a poco"**; Marco = **más rápido y funcional**.
- **Control humano:** SpecOps = el humano confirma cada etapa (control alto, a veces redundante); Marco = el humano **puede perder el control si no lee cada documento**.
- **Clasificación de riesgo:** ambos arrastran ruido, pero el de Marco es **explícito y por keywords** (preflight mal-clasifica), mientras SpecOps no clasifica por keywords.
- **Cierre:** ambos verifican en navegador de verdad; SpecOps cierra con **auditoría PASS**; Marco cierra con **checklists + DECs** y dejó el **debate externo sin ejecutar** (desproporcionado).
- **Curva de entrada:** SpecOps = **más natural al humano**; Marco = **requiere conocimientos previos**, "instala a ciegas".
