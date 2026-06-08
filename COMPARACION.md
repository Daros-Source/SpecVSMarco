# Marco Estructural vs SpecOps — Análisis filosófico

> Análisis escrito **después** de construir la misma app de To-Do (CRUD mínimo,
> React + TS + Supabase) dos veces, una bajo cada framework, siguiendo su ceremonia
> completa. El código resultante es **funcionalmente idéntico** (ver `SHARED-BRIEF.md`);
> lo que difiere —y es el objeto de estudio— es *el camino para llegar a él*.

---

## 0. Tesis

Ambos frameworks parten de la misma convicción: **el código no debe ser la fuente
de verdad; debe derivarse de algo anterior y más estable.** Pero divergen en *qué*
es ese algo y en *cómo* se hace cumplir:

- **SpecOps** apuesta a la **deliberación**: la verdad es una *decisión cerrada*,
  escrita en prosa, y la disciplina es *cultural* (el agente propone el siguiente
  paso, el humano conversa). Confía en el juicio.
- **Marco Estructural** apuesta a la **coerción**: la verdad es un *work-order con
  evidencia verificable*, y la disciplina es *mecánica* (un gate y hooks de git
  bloquean físicamente lo que no cumple). Desconfía del juicio y lo sustituye por
  un control ejecutable.

Es la vieja tensión entre **gobernar por principios** y **gobernar por reglas**;
entre la *constitución* y el *código penal con su policía*.

---

## 1. Las dos filosofías en una frase

| | **SpecOps** | **Marco Estructural** |
|---|---|---|
| Metáfora | Un editor socrático | Un inspector de aduana |
| Fuente de verdad | La *decision cerrada* (prosa) | El *work-order* + *evidencia* (JSON verificable) |
| Naturaleza del control | Propositivo, conversacional | Coercitivo, ejecutable |
| Interfaz | Un comando: `/spec` | Un CLI con ~20 subcomandos + hooks |
| Cómo evita el mal código | Te convence de no escribirlo | Te impide commitearlo |
| Verificación | Auditoría **semántica** (la IA juzga) | Evidencia **mecánica** (el gate cuenta) |
| Quién tiene la última palabra | La IA propone, el humano acepta | El humano **firma** o nada avanza |
| Falla por defecto hacia | Permitir (confía) | Bloquear (desconfía) |

---

## 2. El mismo trabajo, dos ceremonias

### 2.1 SpecOps — *documentar para decidir*

El flujo es una cadena de **artefactos en prosa** que se generan *solo cuando el
flujo llega a ese punto* (nada de documentación por adelantado):

```
bootstrap → discovery (visión, alcance) → arquitectura → roadmap macro
         → Definition of Done → DEC-001 (decisión cerrada) → roadmap micro
         → build → audit report
```

Todo vive en `app-specops/project-spec/`. El artefacto central es la **decisión
cerrada** (`DEC-001`): un documento con contrato de datos, contrato de
comportamiento, límite de alcance y consideraciones de seguridad. La regla dura es
simple: *no hay build sin una decisión cerrada que lo respalde*. El cierre lo
certifica la propia IA (roles `spec-lead`, `build-lead`, `security-lead`,
`audit-lead`), y la auditoría final es un juicio semántico que termina en
**PASS / PARTIAL / FAIL**.

**En la práctica:** fluido y rápido. Escribí 12 documentos en prosa, el build salió
directo, `npm run build` pasó, y la auditoría se cerró en **PASS** — certificada
por mí (la IA). Cero fricción mecánica. Cero barreras externas.

### 2.2 Marco Estructural — *autorizar para construir*

El flujo es una cadena de **comandos** que producen **artefactos verificables**
(JSON con schema) y culmina en un **gate bloqueante**:

```
bootstrap.py (manifest + .marco/) → dispatch (clasifica riesgo)
   → decide → close-decision → task (work-order con allowed/forbidden files)
   → BUILD → evidencia (.marco/evidence/*.json) → check → GATE → (push con hooks)
```

El artefacto central es el **work-order** (`.marco/work-order.json`): declara
`allowed_files`, `forbidden_files`, `simplicity_budget` (máx archivos, máx líneas,
sin dependencias nuevas) y `required_evidence`. El **gate** valida todo eso contra
el `git diff` real y **rehúsa pasar** si algo no cuadra.

**En la práctica:** fricción constante —y reveladora—. El gate me rechazó **cuatro
veces** antes de aislar el bloqueo final. Cada rechazo fue una lección sobre la
filosofía del framework (sección 4).

---

## 3. El experimento produjo código gemelo, gobernanza opuesta

El `src/` de ambas apps es casi idéntico en comportamiento. La diferencia visible
está en la **estructura impuesta** y en el **rastro de gobernanza**:

| Dimensión | `app-specops` | `app-marco` |
|-----------|---------------|-------------|
| Estructura de `src/` | Libre (la eligió la arquitectura) | **Obligatoria**: `config/services/hooks/components/screens/types/utils` (stack guide) |
| Acceso a env | `import.meta.env` en el cliente Supabase | **Prohibido fuera de `/config`** (regla del stack) |
| Artefactos de gobernanza | 12 `.md` en prosa | manifest + contracts + work-order + 7 evidencias JSON + audit |
| Validación de cierre | Audit report (juicio de la IA) → PASS | Gate mecánico → **FAIL hasta firma humana** |
| ¿Quedó "cerrado"? | **Sí**, auto-certificado | **No**, bloqueado por diseño |

Que el código sea gemelo es justamente lo que vuelve honesta la comparación: **toda
la diferencia está en el proceso, no en el producto.**

---

## 4. Los cuatro rechazos del gate (donde se ve la filosofía)

El gate del Marco no es decorativo. Cada vez que me frenó, expuso una decisión de
diseño profunda:

1. **Conflicto de globs (`.env.*` vs `.env.example`).** Los *defaults de seguridad*
   prohíben todo `.env.*`, capturando incluso la plantilla `.env.example` que SpecOps
   versionó sin problema. *El framework moldeó el entregable*: tuve que **borrar** el
   `.env.example` y documentar el entorno en el README. La opinión del Marco sobre
   seguridad ganó sobre la convención del ecosistema.

2. **Clasificación frágil por keywords.** El `dispatch` clasificó un To-Do trivial
   como **`critical`**, disparando reglas de "operación destructiva" y hasta
   "comportamiento de IA". Peor: al **reescribir la descripción** del work-order con
   menos palabras-gatillo, el mismo código bajó a `high` y *desapareció* la
   exigencia de aprobación humana. **Mismo código, distinta prosa, distinta
   ceremonia.** El control es real pero su disparador es lingüístico, no semántico.

3. **Evidencia atada a la identidad del work-order.** Regenerar el work-order le
   asignó un `task_id` nuevo e **invalidó las 7 evidencias** de golpe ("evidencia de
   otro work-order"). La trazabilidad es estricta: la evidencia *pertenece* a una
   autorización concreta, no al repositorio en abstracto.

4. **Tensión profile vs dispatch.** El DoD profile `ui` exigía menos evidencia que
   la que el `dispatch` recomendaba (architect/data-integrity/security). El CLI lo
   **advirtió** pero no lo bloqueó — una grieta donde la configuración puede
   relajar la norma, y el framework solo levanta la ceja.

Y el rechazo final, el más importante:

5. **La firma humana.** Con todo lo mecánico en verde (build, 7 evidencias,
   contrato aprobado, scope), el gate siguió en **`FAIL (1 bloqueante)`**: riesgo
   `critical` requiere `approved_by` real. El operador (tú) eligió **no firmar**, y
   el Marco —fiel a su filosofía— **no avanzó**.

> SpecOps cerró en PASS porque la IA se auto-certificó.
> El Marco se quedó en FAIL porque el humano no firmó.
> **Esa sola línea resume las dos filosofías.**

---

## 5. Lecturas filosóficas

### 5.1 Confianza vs. desconfianza
SpecOps **confía en el agente**: le da un comando y espera buen juicio. El Marco
**desconfía estructuralmente**: asume que el agente (o el humano apurado) intentará
saltarse pasos, y por eso pone barreras que *no se pueden razonar, solo cumplir*
(`No los desactives ni los burles`, dice su propio CLAUDE.md).

### 5.2 Prosa vs. dato
La verdad de SpecOps es **narrativa** (un `.md` que se lee y se interpreta). La del
Marco es **estructurada** (un JSON que una máquina valida). La prosa es más rica y
matizada pero no es ejecutable; el dato es pobre en matiz pero un gate puede contarlo.
SpecOps optimiza para *entender*; el Marco para *verificar*.

### 5.3 Velocidad vs. garantía
SpecOps minimiza fricción: ideal para iterar rápido cuando el costo de un error es
bajo y el operador es confiable. El Marco maximiza garantía: paga fricción por
adelantado para que *ciertas clases de error sean imposibles* (commitear un `.env`,
mergear sin evidencia, desplegar algo crítico sin firma humana). Es la diferencia
entre un *linter* y un *compilador con tipos*.

### 5.4 ¿Quién es el guardián?
- En SpecOps, **el guardián es la IA** (los roles `*-lead` y el `audit-lead`). El
  humano participa conversando, pero el cierre lo puede dar el agente.
- En el Marco, **el guardián es el proceso**, y para el riesgo alto, **el humano es
  irremplazable**: ninguna IA puede firmar `approved_by` por él.

---

## 6. Cuándo elegir cada uno

| Contexto | Recomendación |
|----------|---------------|
| Prototipo, spike, proyecto personal, equipo de 1 | **SpecOps** — la ceremonia del Marco sería puro peso muerto |
| Dominio crítico: pagos, auth, datos sensibles, salud | **Marco** — querés que el mal commit sea *imposible*, no *desaconsejado* |
| Equipo grande, rotativo, con auditoría/compliance | **Marco** — la evidencia mecánica y los hooks sobreviven a la disciplina individual |
| Producto exploratorio donde la spec cambia a diario | **SpecOps** — decisiones en prosa se reescriben más barato que cadenas de evidencia |
| Quiero *pensar bien* antes de construir | Ambos sirven; SpecOps es más ágil para ello |
| Quiero *garantizar* que se pensó bien | Solo el **Marco** lo hace cumplir |

### Una síntesis posible
No son excluyentes: la **deliberación en prosa de SpecOps** (su discovery y sus
decisiones legibles) combinada con el **enforcement mecánico del Marco** (gate +
evidencia + firma humana) sería, plausiblemente, lo mejor de ambos mundos. SpecOps
te ayuda a *decidir bien*; el Marco te obliga a *probar que lo hiciste*.

---

## 7. Veredicto

| | SpecOps | Marco Estructural |
|---|---|---|
| **Naturaleza** | Disciplina por convicción | Disciplina por construcción |
| **Mejor cualidad** | Fluidez y claridad narrativa | Garantías inquebrantables |
| **Peor riesgo** | El rigor depende de que alguien lo sostenga | Fricción y falsos positivos del clasificador |
| **Pregunta que responde** | "¿Pensaste esto?" | "¿Podés *demostrar* que lo pensaste, y quién lo firma?" |

Ninguno es "mejor". Son respuestas distintas a la misma pregunta —*¿cómo evitamos
que la IA escriba código que no deberíamos haber escrito?*— calibradas para niveles
de riesgo y confianza distintos. SpecOps cree que basta con **hacer visible** la
decisión. El Marco cree que hay que **hacerla obligatoria y verificable**. Este
experimento, donde el código salió gemelo pero solo uno de los dos repos se dejó
"cerrar" sin un humano firmando, muestra que **la diferencia no está en lo que
construís, sino en lo que el framework te deja —o no te deja— dar por terminado.**

---

*Evidencia de respaldo: `app-specops/project-spec/` (artefactos SpecOps) y
`app-marco/.marco/` (work-order, evidencias, `audits/AUDIT-cierre.md`,
`audits/gate-result-TASK-003.txt`).*
