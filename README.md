# Marco Estructural vs SpecOps — Análisis filosófico

Comparativa empírica de **dos filosofías de gobernanza de código asistido por IA**,
construyendo **la misma aplicación de To-Do list dos veces** —una bajo cada
framework— y analizando las diferencias de proceso, artefactos y resultado.

## Las dos filosofías

| | **SpecOps** | **Marco Estructural** |
|---|---|---|
| **Repo** | `vozdigitalCL/spec-ops` | `vozdigitalCL/marco_estructural` |
| **Idea central** | *Spec-driven*: las **decisiones cerradas** son la fuente de verdad; el código emerge de ellas. | *Governance-driven*: 8 principios inmutables + **gates bloqueantes** que impiden avanzar sin evidencia. |
| **Interfaz** | Un comando conversacional único: `/spec`. | CLI `marco.py` (dispatch → task → gate) + skills de Claude Code. |
| **Estilo de control** | Suave / propositivo. | Estricto / coercitivo (hooks de git, gate que bloquea commits). |
| **Verificación** | Auditoría semántica (`audit-lead`). | Evidencia mecánica + debate adversarial con Codex. |

## Estructura del repositorio

```
SpecVSMarco/
├── README.md            ← este archivo (tesis + resultados)
├── SHARED-BRIEF.md      ← brief canónico idéntico para ambas apps
├── COMPARACION.md       ← análisis filosófico comparativo (entregable)
├── spec-ops/            ← framework SpecOps (submódulo clonado)
├── marco_estructural/   ← framework Marco Estructural (submódulo clonado)
├── app-specops/         ← To-Do construido siguiendo SpecOps
└── app-marco/           ← To-Do construido siguiendo Marco Estructural
```

## Metodología del experimento

1. **Brief único** (`SHARED-BRIEF.md`): mismo producto, mismo stack
   (React + TS + Supabase), mismo alcance CRUD. Así la comparación mide la
   *metodología*, no el alcance.
2. **Ceremonia completa**: cada app se construye respetando el flujo real de su
   framework, de principio a fin, generando sus artefactos de gobernanza.
3. **Observación**: se registra fricción, ceremonia, artefactos y código.
4. **Síntesis**: el análisis vive en `COMPARACION.md`.

## Estado

🚧 En construcción. Avance:

- [x] Andamiaje y brief compartido
- [ ] To-Do con SpecOps
- [ ] To-Do con Marco Estructural
- [ ] Análisis comparativo

---

*Autor: dylhanaros (Daros-Source)*
