# Marco Estructural vs SpecOps — Análisis filosófico

> **Objeto de estudio:** la *filosofía, el objetivo y el modelo de trabajo* de cada
> sistema — **no** la calidad de implementación.
>
> **Método:** lectura de ambos repos (`spec-ops/`, `marco_estructural/`) + una prueba
> empírica: construir la misma app de To-Do desde un **arranque ciego e idéntico**
> ("quiero armar una app simple para gestionar mis tareas pendientes, guíame vos"),
> en **dos chats separados**, dejando que cada framework condujera su propio proceso.
> Las observaciones de campo están en `NOTAS-RUNS.md`.
>
> **Reglas aplicadas:** no se juzga calidad ni se premia cantidad de documentación;
> las inferencias se marcan como *(Inferencia)*; se citan paths completos.

---

## 1. Síntesis en una frase

- **Marco Estructural:** un sistema de **gobernanza** que define con qué permisos y
  bajo qué contratos opera la IA dentro de un proyecto, imponiendo control
  procedimental **verificable desde el minuto cero**.

- **SpecOps:** un sistema de **especificación progresiva** que define qué claridad
  debe existir *antes* de que la IA construya, generando trazabilidad como
  **subproducto natural** del proceso.

---

## 2. Cuadro comparativo por dimensiones filosóficas

| Dimensión | Marco Estructural | SpecOps |
|-----------|-------------------|---------|
| **Pregunta central** | ¿Con qué permiso / bajo qué contrato opera la IA? | ¿Hay suficiente claridad (decisión cerrada) para construir? |
| **Problema que resuelve** | IA sin control → caos procedimental, pérdida de consistencia | IA sin especificación → código sin fundamento, decisiones invisibles |
| **Unidad central** | El *work-order* autorizado dentro de una sesión gobernada (`.marco/work-order.json`) | La *decisión cerrada* (`DEC-NNN`) |
| **Modelo mental del usuario** | Operador de un sistema gobernado | Co-autor de un sistema especificado |
| **Rol de la IA** | Ejecutor con permisos acotados + auditor + árbitro de debate | Especificador conversacional + constructor controlado + auditor independiente; **nunca árbitro** |
| **Autoridad del sistema** | Jerarquía documental explícita (`contracts/constitution.md` > `blueprint.md` > `principles.md` > `stack/*`) | Jerarquía semántica (decisión cerrada > arquitectura > visión > planning) — ver `spec-ops/AGENTS.md` |
| **Grado de libertad de la IA** | Tabla de autorización (autónomo / requiere aprobación / prohibido) + `allowed_files`/`forbidden_files` del work-order | Limitada por la *presencia* de una decisión cerrada; fuera de scope → escala al humano |
| **Qué frena a la IA** | `dispatch.json` + `policies/core/ai-policy.md` + `gate` bloqueante + hooks de git + `forbidden_files` | Ausencia de decisión cerrada para una feature; o una decisión ya tomada que contradice la acción |
| **Documentación** | Contrato normativo **upfront** (plantillas sembradas por `bootstrap.py`) | Artefactos **progresivos**; emergen cuando el flujo los necesita |
| **Trazabilidad** | DECs append-only en `contracts/decisions.md` + `work-order.json` + evidencia JSON en `.marco/evidence/` + `.marco/audits/` | `DEC-NNN` con estado formal (`pending`/`closed`/`superseded`) + `project-spec/50-delivery/audit-reports/` |
| **Exploración** | `marco.py paper --type spike\|working` → `.marco/working-papers/`, `.marco/spikes/` | Working papers + code spikes autorizados (no autoritativos) — `spec-ops/ai-specs/rules/working-papers.md` |
| **Resolución de conflictos** | Debate multi-agente Claude↔Codex (`orchestrator/orchestrator.py`) → veredicto | El humano cierra la ambigüedad; la decisión cerrada **es** el veredicto |
| **Calidad** | Checklists ejecutables como gates (`checklists/pre-merge.md`, `cierre-fase.md`, `security-review.md`, `ui-review.md`) + `gate` | Definition of Done + delivery checklists + auditoría persistente |
| **Stack** | **Opinionated**: React+TS, Laravel, Python; reglas por tecnología; design system (`stack/*.md`, `policies/presets/vozdigital/`) | **Agnóstico**: framework de proceso, no de tecnología |
| **Portabilidad** | Fundamentalmente Claude Code (+ Codex en el debate) | Multi-tool: `spec-ops/ai-specs/adapters/` (claude-code, codex, cursor) |
| **Cuándo se documenta** | Upfront (bootstrap) + gates obligatorios + append-only por sesión | Progresivamente, solo cuando el flujo llega a ese punto |
| **Qué se lee siempre** | `project.manifest.json` + `CLAUDE.md`/`AGENTS.md` al inicio | `project-spec/project-state.md` + `ai-specs/surface/spec.md` al inicio; resto bajo demanda |
| **Inicio de sesión** | Precarga de contexto desde el manifest + pre-flight de drift (`.claude/hooks/drift-audit.sh`) + `dispatch` | `/spec` detecta modo (bootstrap / continue / discovery / build / audit) |
| **Identidad del sistema** | Framework de gobernanza de IA | Ciclo de vida de desarrollo especificado |

---

## 3. Diferencias más importantes (narrativa)

### 3.1 Gobernanza vs. especificación: dos teorías del problema
Marco Estructural parte de que **la IA sin estructura produce caos procedimental**;
su respuesta es *gobernar el comportamiento* mediante permisos, dispatch y gates. La
pregunta que ordena todo es *"¿está esto autorizado?"*. SpecOps parte de que **la IA
sin especificación produce trabajo sin fundamento**; su respuesta no es controlar a la
IA sino *asegurar claridad antes de construir*. Su pregunta es *"¿hay una decisión
cerrada que autorice esta feature?"*. No es un sistema de permisos: es uno de
**prerequisitos**.

**Evidencia de campo.** El arranque lo mostró literalmente: en `todo-marco`, el agente
**no habló de la app primero** — corrió el pre-flight, leyó el manifest, los 4
contratos y `stack/frontend-react-ts.md`, y recién después respondió (carga de
contexto ritual). En `todo-specops`, el agente **preguntó primero** (bootstrap +
discovery del dolor) y difirió el stack hasta entender el problema. El evaluador lo
resumió como *"Marco arranca y no pregunta mucho"* vs *"SpecOps se acerca de manera
más natural al humano"*.

### 3.2 La unidad de trazabilidad
En Marco, la trazabilidad vive en **la sesión gobernada y sus contratos**: cada sesión
precarga el manifest, clasifica con `dispatch.json` y registra append-only en
`contracts/decisions.md`, con un `work-order.json` como autorización puntual. En
SpecOps, vive en **la decisión cerrada**: una `DEC-NNN` no es el registro de una sesión
sino un *contrato semántico sobre un subsistema*, con estado explícito y autoridad
propia, que existe como archivo independiente de la conversación.

*(Inferencia)* La decisión-como-archivo es más fácil de consultar como fuente de verdad
de un subsistema que un registro append-only por sesión; sugiere que SpecOps optimizó
ese punto.

### 3.3 Dónde vive la calidad (la diferencia más profunda)
Marco pone la calidad en la **verificación post-build**: checklists que le recuerdan a
la IA lo que debía tener presente (`checklists/pre-merge.md`, `cierre-fase.md`). SpecOps
la pone en la **especificación pre-build**: si la decisión cerrada ya fija los
constraints, no hay nada que "recordar" después.

**Evidencia de campo.** En SpecOps, `DEC-001` ya contenía la forma de `Task`, los casos
borde (título vacío, XSS) y el contrato de comportamiento **antes** de codear — la
calidad estaba "arriba" en el flujo. En Marco, el hueco real (faltaban tests) lo
**atrapó el checklist `pre-merge` al cerrar**, registrándolo como `TD-1` y resolviéndolo
ahí. Dos lugares distintos para el mismo problema.

### 3.4 El arranque: discovery conversacional vs. carga de contexto
SpecOps arranca **conversando** (reconoce el dolor, construye contexto del problema).
Marco arranca **cargando** (lee todo el proyecto y el framework, con contexto del
problema mínimo más allá del primer mensaje). El evaluador lo vivió como *"SpecOps
genera más contexto / acompaña de a poco"* frente a *"Marco: contexto mínimo del
problema, contratos técnicos muy específicos que dan confiabilidad"*.

### 3.5 Stack: agnóstico-progresivo vs. opinionated-upfront
SpecOps no presupone tecnología: el stack se discute cuando el flujo lo necesita y
**con recomendación según el problema** (en el run lo difirió en bootstrap y lo cerró en
arquitectura). Marco fija el stack **en el bootstrap**, dentro de
`project.manifest.json`, y solo ofrece *stacks disponibles*.

**Evidencia de campo.** El manifest de `todo-marco` pre-comprometió `database-schema`
(`has_database: true`) **antes de conocer el caso de uso**; como el caso resultó
local-first, el agente tuvo que registrar una **divergencia correctiva** (`DEC-003`,
localStorage) el día 1. Decidir el stack antes que el problema *genera una decisión
"correctiva" desde el inicio* — lo opuesto a progresivo.

### 3.6 La IA como árbitro vs. como socio técnico
En Marco, ante incertidumbre arquitectónica hay un **árbitro mecánico**: el orquestador
de debate (Claude↔Codex) produce un veredicto; el humano lo supervisa. En SpecOps no hay
debate multi-agente: la ambigüedad se documenta como `DECISION PENDING` y **la cierra el
humano**.

**Evidencia de campo.** El `dispatch` de Marco *pidió* `debate reviewer` al cerrar fase,
pero en el run **no se ejecutó** (se sustituyó por revisión inline, por
desproporcionado para un MVP y porque el counterpart no está garantizado). Es decir: el
mecanismo de arbitraje existe pero, en un proyecto trivial, se vuelve ceremonia que se
sortea con criterio.

### 3.7 Clasificación de la tarea: por keywords vs. conversacional
Ambos clasifican el trabajo. Marco lo hace **explícito y por coincidencia léxica**
(`dispatch.json`); SpecOps clasifica el *tipo de cambio* (trivial / feature /
structural) de forma conversacional.

**Evidencia de campo.** El preflight de Marco **mal-clasificó** el To-Do como
*"ai-agent-behavior / new-technology / external-integration, riesgo high"* por palabras
clave, en una app sin nada de eso → hubo que ignorarlo. Es ruido por *matching* léxico,
no por el contenido real.

### 3.8 El control humano
SpecOps **pide OK antes de cada salto de etapa** (control alto, a veces redundante).
Marco se **autogestiona** más, con dos gates (contratos y autorización a construir) — pero
el evaluador anotó el riesgo simétrico: *"el humano a veces pierde el control si no lee
cada documentación"*. Más autonomía del sistema = más necesidad de que el humano lea para
no quedar afuera de sus propias decisiones.

---

## 4. Qué comparten y qué abandona cada uno

*(Inferencia)* Ambos parecen descender de una misma familia de ideas sobre desarrollo
asistido por IA; comparten más de lo que sus nombres distintos sugieren.

### Lo que comparten
- **Jerarquía de autoridad documental** con precedencia explícita.
- **Decisiones técnicas como registro persistente** (`contracts/decisions.md` ↔ `DEC-NNN`).
- **Auditoría como práctica explícita** antes de avanzar.
- **Checklists / Definition of Done** como contrato de calidad.
- **Separación framework ↔ proyecto** (`marco_estructural/` vs el proyecto ↔ `spec-ops/ai-specs/` vs `project-spec/`).
- **Seguridad como capa transversal** (`security-review`).
- **Un espacio de exploración no-autoritativo** (working papers / spikes en ambos).

### Lo que SpecOps abandona respecto del enfoque del Marco
- **El stack opinionated** (sin reglas de tecnología ni design system).
- **La tabla de dispatch por keywords** (`dispatch.json`).
- **La documentación upfront** (un solo artefacto de inicio: `project-state.md`).
- **El debate multi-agente como árbitro** (lo cierra el humano).
- **La precarga de contexto por manifest** (`project.manifest.json`).
- **Los hooks de git como enforcement** y el `gate` bloqueante coercitivo.

### Lo que el Marco no toma de un enfoque spec-first
- **La progresividad estricta** (no crear estructura antes de necesitarla).
- **La portabilidad multi-tool de primera clase** (adapters por herramienta).
- **La ronda explícita de modelo de datos y casos borde** (en el run los resolvió el agente sin interrogación).

---

## 5. Riesgos filosóficos de cada enfoque

### Marco Estructural
1. **La gobernanza se vuelve burocracia.** Dispatch, checklists, debates y aprobaciones
   antes de cada acción pueden pesar más que el trabajo. *Evidencia:* en un To-Do
   trivial, el debate externo fue desproporcionado y se omitió.
2. **Clasificación frágil por keywords.** El preflight mal-etiquetó la tarea como
   alto riesgo por *matching* léxico — ruido que el humano debe filtrar.
3. **Pre-compromiso de stack.** Decidir tecnología en el bootstrap, antes del caso de
   uso, fuerza decisiones correctivas (la divergencia `DEC-003`).
4. **El humano puede perder el control** si no lee cada documento que el sistema
   autogestiona (anotación de campo).
5. *(Inferencia)* **El debate multi-agente es un árbitro no verificable**: que dos
   modelos "acuerden" no garantiza que el veredicto sea correcto.

### SpecOps
1. **La progresividad puede generar ambigüedad prematura** si el humano no invierte en
   especificar antes de construir.
2. **Lentitud.** *Evidencia:* el evaluador lo vivió como *"alta espera, tedioso, avance
   lento"* — la contracara de tanta deliberación y confirmación por etapa.
3. **Fugas entre la charla y el contrato.** *Evidencia:* "ordenar por fecha/prioridad"
   se mencionó en el discovery pero no llegó al scope ni a `DEC-001`, así que no se
   construyó (la auditoría lo marcó como deuda).
4. *(Inferencia)* **Decisiones cerradas que envejecen** sin un audit automático de
   coherencia entre ellas.
5. **Confirmaciones redundantes**: pedir OK en cada etapa da control pero se siente como
   paso extra cuando la respuesta siempre es "sí".

---

## 6. Cierre — ¿cuál se alinea con instalar un sistema que asista el desarrollo con IA de forma progresiva, trazable y usable en proyectos reales?

**SpecOps está más alineado con *ese* objetivo**, por tres razones estructurales —
confirmadas por el run:

1. **Progresividad.** Arranca con un solo artefacto (`project-state.md`) y genera el
   resto cuando el flujo lo necesita. Marco invierte en estructura documental y fija el
   stack antes de escribir código — correcto para proyectos maduros, costoso para
   exploración.
2. **La decisión cerrada como unidad de trazabilidad.** Persiste entre herramientas,
   sesiones y colaboradores; no depende de que el manifest esté precargado ni de que el
   dispatch acierte la clasificación.
3. **Agnosticismo de stack + portabilidad multi-tool.** Funciona en Claude Code, Codex y
   Cursor y no presupone tecnología; Marco está calibrado para un stack específico y,
   sobre todo, para Claude Code.

**Matiz crítico (y aparente paradoja).** En el run, Marco se sintió *"funcional y más
rápido"* y SpecOps *"lento"*. Pero **velocidad no es el objetivo**: parte de la rapidez
de Marco vino de *pre-decidir* (stack, perfil) — justo lo opuesto a "progresivo". Esa
rapidez es deuda de progresividad, no alineación con la meta.

**Y el contrapunto honesto (no es un veredicto de calidad).** El objetivo declarado
privilegia *progresivo + trazable + usable en proyectos variados*. Para **otro**
objetivo — alto riesgo, equipos grandes, compliance, donde se busca que el mal commit
sea *imposible* y no solo *desaconsejado* — el enforcement coercitivo del Marco (gate
bloqueante, hooks de git, firma humana obligatoria, evidencia mecánica) es justamente la
fortaleza. No son mejor/peor: responden a objetivos distintos.

> En una línea: **SpecOps asegura que se *pensó bien* antes de construir y lo hace
> portable; Marco asegura que se *cumplió el proceso* y lo hace verificable.** Para el
> objetivo de un asistente progresivo, trazable y usable en proyectos reales, gana la
> lógica de prerequisitos de SpecOps; para el objetivo de garantías inquebrantables en
> contextos críticos, gana la lógica de permisos del Marco.

---

*Evidencia de respaldo: `NOTAS-RUNS.md` (observaciones de ambos runs + anotaciones del
evaluador), `todo-specops/CONTEXTO-sesion-spec-2026-06-08.md`,
`todo-marco/docs/retrospectiva-sesion-fase1.md`. Frameworks: `spec-ops/`,
`marco_estructural/`.*
