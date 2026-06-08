# Auditoría cruzada — Marco audita a SpecOps · SpecOps audita a Marco

> **Qué es esto.** Cada framework evalúa al otro **con su propia vara**: el Marco usa
> su modo AUDITOR (hallazgos con severidad P0–P3 + veredicto estilo gate); SpecOps usa
> su `audit-lead` (Correcto / Desvíos / Faltante / Implícito / Deuda / Seguridad +
> veredicto PASS / PARTIAL / FAIL contra fuentes de verdad).
>
> **Naturaleza.** Cross-audit **analítico**: se aplica el *lente* de cada auditor a la
> *filosofía* del otro, anclado a paths reales (`spec-ops/`, `marco_estructural/`) y a
> la evidencia de campo (`NOTAS-RUNS.md`). Las inferencias se marcan como *(Inferencia)*.
> No se juzga la calidad del código; se evalúa el **diseño del sistema**.

---

## PARTE A — El Marco Estructural audita a SpecOps

> Modo AUDITOR. Fuentes de verdad del auditor: `marco_estructural/principles.md`
> (8 invariantes), `policies/core/ai-policy.md`, `policies/core/evidence-policy.md`,
> `dispatch.json`, `checklists/*`. Objeto auditado: la filosofía de SpecOps
> (`spec-ops/ai-specs/`, `spec-ops/AGENTS.md`).

### ✅ Correcto (lo que pasa la vara del Marco)
- **Principio 2 — Contratos Explícitos:** SpecOps lo cumple de forma *ejemplar*. La
  `DEC-NNN` cerrada antes de codear (`spec-ops/ai-specs/templates/decision.md`) es un
  contrato explícito con estado formal; el run lo mostró (`DEC-001` con forma de `Task`
  y casos borde *antes* del build). *(Inferencia)* Es más granular que el
  `contracts/decisions.md` append-only del Marco.
- **Principio 6 — Decisiones Documentadas:** decisión-como-archivo con lifecycle
  (`pending`/`closed`/`superseded`) → trazabilidad de subsistema fuerte.
- **Principio 5 — Fases Cerradas:** SpecOps no deja construir sin decisión cerrada;
  equivale a "no abrir fase sin cerrar la anterior".
- **Auditoría como práctica:** persistida en `spec-ops/project-spec/50-delivery/audit-reports/`.

### ⚠️ Desvíos / Hallazgos (severidad estilo Marco)
- **[P1] Sin enforcement mecánico.** No hay `gate` bloqueante ni hooks de git. El cierre
  lo **auto-certifica** la IA (audit-lead → PASS). Para el Marco, "PASS sin evidencia
  mecánica" es un riesgo: `policies/core/evidence-policy.md` exige evidencia
  verificable, no opinión. *Recomendación:* un gate que cuente artefactos (como
  `marco.py gate`).
- **[P2] Sin tabla de autorización ni `allowed/forbidden files`.** Nada impide tocar
  archivos sensibles; la disciplina es cultural, no coercitiva. *(Marco lo frena con
  `forbidden_files` y `dispatch.json`.)*
- **[P2] Sin reglas de stack.** `spec-ops/` es agnóstico → la calidad técnica depende
  del build-lead. El Marco lo consideraría "calidad no gobernada"
  (`stack/frontend-react-ts.md` no tiene equivalente).
- **[P3] Sin clasificación de riesgo explícita ni human-approval obligatorio.** Una
  feature de auth o un borrado destructivo no disparan aprobación humana forzada como
  en el `gate` del Marco.

### 🕳️ Faltante (lo que el Marco esperaría y no encuentra)
- Un **árbitro para incertidumbre arquitectónica** (el Marco usa `orchestrator/`); en
  SpecOps la cierra el humano — para el Marco eso es "faltante", no "decisión".

### 📉 Deuda / Seguridad (lente del Marco)
- La seguridad existe como revisión (`security-lead`), pero **no es un gate que bloquee
  el commit**. *(Inferencia)* En un repo con secretos, la ausencia de hook pre-push es
  deuda de seguridad para el Marco.

### Veredicto del Marco
**PASS_WITH_CONDITIONS.** SpecOps satisface el *espíritu* de los principios del Marco
(contratos explícitos, decisiones documentadas) **mejor en granularidad**, pero
**reprueba el enforcement**: confía en juicio donde el Marco exige barreras mecánicas.
Condición: para contextos críticos, SpecOps necesitaría un gate coercitivo y límites de
archivos.

---

## PARTE B — SpecOps audita al Marco Estructural

> Rol `audit-lead` (`spec-ops/ai-specs/agents/audit-lead.md`). Evalúa contra sus fuentes
> de verdad: la decisión cerrada como unidad, la progresividad
> (`spec-ops/ai-specs/rules/working-papers.md`: *"crear estructura upfront viola el
> principio progresivo"*), y "el humano cierra la ambigüedad". Objeto auditado: la
> filosofía del Marco (`marco_estructural/`).

### ✅ Correcto (lo que pasa la vara de SpecOps)
- **Decisiones como compromiso previo al build:** el Marco también las tiene
  (`DEC-003/004/005` antes de codear en el run) → coherente con "no construir sin
  decisión".
- **Trazabilidad fuerte:** work-order + evidencia JSON + DECs + audits. SpecOps lo
  reconoce como un registro rico.
- **Verificación real antes de cerrar:** el run verificó en navegador + checklist
  `pre-merge` atrapó el hueco de tests. Alineado con "auditar contra fuentes de verdad".

### ⚠️ Desvíos (respecto de la filosofía spec-first)
- **Documentación upfront = regresión progresiva.** `bootstrap.py` crea estructura,
  contratos y fija stack **antes de conocer el problema**. Para SpecOps esto es un
  desvío explícito de su principio rector: la estructura debe *emerger*. *Evidencia:* el
  manifest pre-comprometió `database-schema` y forzó la divergencia correctiva `DEC-003`
  el día 1.
- **Árbitro mecánico en vez de humano.** El `orchestrator/` (debate Claude↔Codex) cierra
  ambigüedad arquitectónica. SpecOps sostiene que **el humano con información clara**
  produce el mejor veredicto; un árbitro de máquinas es, para su lente, un desvío.

### 🕳️ Faltante
- **Discovery del problema.** *Evidencia de campo:* "contexto mínimo del problema más
  allá del arranque". No hubo ronda explícita de dolor, casos borde ni modelo de datos
  conversado — los resolvió el agente. Para SpecOps falta la fase que *justifica* que
  valga la pena construir.
- **Recomendación de stack según el problema.** El Marco ofrece "solo stacks
  disponibles"; SpecOps esperaría que el stack se derive del problema, no del bootstrap.

### 🔍 Implícito (decisiones en el sistema sin decisión explícita)
- La **clasificación de riesgo por keywords** (`dispatch.json`) tomó decisiones de
  proceso de forma implícita y **errónea** (etiquetó el To-Do como "ai-agent /
  new-technology / external-integration, high"). Para SpecOps, eso es una decisión de
  proceso que ningún humano cerró: ruido implícito.

### 📉 Deuda / Seguridad
- *(Inferencia)* La autoridad de documentos sobre el código (constitución/blueprint) es
  frágil si divergen del código real sin sincronización activa — deuda latente que el
  propio Marco registra en su historia (`DEC-HOOKS-*`).

### Veredicto de SpecOps
**PARTIAL.** Gobernanza y trazabilidad sólidas (correcto), pero **falla la
progresividad y el discovery**: el Marco construye estructura y compromete stack *antes
de la claridad del problema*, y delega en un árbitro mecánico lo que SpecOps daría al
humano. No es FAIL —las decisiones existen— pero está "incompleto" en la fase que para
SpecOps es la que da fundamento.

---

## PARTE C — Síntesis: ¿"Marco = funcionalidad" y se beneficiaría del acercamiento de SpecOps?

Tu conclusión preliminar resiste el cross-audit, con matices.

### Dónde tu tesis se sostiene
- **Marco es fuerte en *ejecución gobernada*:** llega a algo funcional rápido, con
  contratos específicos, evidencia y gates. El evaluador lo vivió como *"funcional y más
  rápido"*; SpecOps mismo se lo reconoce (Parte B, "Correcto"). En ese sentido, **sí:
  el Marco optimiza la *funcionalidad disciplinada*.**
- **Su punto ciego es justo lo que SpecOps hace bien:** el *discovery del problema* y la
  *progresividad*. Ambas auditorías coinciden — el Marco lo tiene "Faltante" (Parte B) y
  el Marco mismo reconoce que SpecOps cumple "mejor en granularidad" los contratos
  explícitos (Parte A). **Marco se beneficiaría mucho de injertar el front-end
  conversacional de SpecOps.**

### Dónde conviene matizar la tesis
- **"Marco = funcionalidad" es parte virtud, parte síntoma.** Su rapidez vino en parte
  de *pre-decidir* (stack, perfil en el bootstrap) — lo opuesto a progresivo. Es decir:
  parte de la "funcionalidad veloz" es **deuda de discovery**, no solo eficiencia. La
  divergencia correctiva `DEC-003` es la prueba.
- **El beneficio es mutuo, no unidireccional.** SpecOps también "reprueba" la vara del
  Marco en *enforcement* (Parte A: sin gate, sin límites de archivos, auto-certifica el
  PASS). Para contextos críticos, SpecOps se beneficiaría del back-end coercitivo del
  Marco tanto como el Marco se beneficia del front-end de SpecOps.

### El injerto ideal (lo que cada uno tomaría del otro)
| Si el Marco adoptara de SpecOps… | Si SpecOps adoptara del Marco… |
|----------------------------------|-------------------------------|
| Discovery conversacional del **problema** antes de fijar stack | Un **gate bloqueante** + hooks de git como enforcement |
| **Progresividad**: no crear estructura/stack upfront | `allowed/forbidden files` y human-approval forzado en riesgo alto |
| Stack **derivado del problema** (recomendación), no pre-comprometido | Clasificación de riesgo **conversacional**, no por keywords |
| Decisión **cerrada por el humano** sobre el árbitro mecánico | Reglas de stack para que la calidad técnica no dependa solo del build-lead |

### Conclusión en una línea
**Marco = ejecución gobernada (funcionalidad disciplinada); SpecOps = claridad antes de
ejecutar.** Tu intuición es correcta: *el Marco ganaría muchísimo incorporando el
acercamiento conversacional/progresivo de SpecOps* — porque su debilidad (discovery
delgado, stack pre-decidido, riesgo por keywords) es precisamente la fortaleza del otro.
El reverso también es cierto, pero menos urgente para el objetivo de "asistir el
desarrollo de forma progresiva y usable": ahí el déficit del Marco pesa más que el de
SpecOps.

---

*Evidencia: `ANALISIS.md`, `NOTAS-RUNS.md`,
`todo-specops/CONTEXTO-sesion-spec-2026-06-08.md`,
`todo-marco/docs/retrospectiva-sesion-fase1.md`. Frameworks: `spec-ops/ai-specs/`,
`marco_estructural/` (principles.md, dispatch.json, policies/core/, orchestrator/).*
