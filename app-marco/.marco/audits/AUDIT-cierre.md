# Auditoría de cierre — app-marco (To-Do)

**Fecha:** 2026-06-08
**Work-order:** TASK-2026-06-08-003 · **Decisión:** DEC-PROJECT-001 (aprobada)
**Riesgo:** critical · **Modo final:** AUDITOR

## Estado del gate

```
GATE: FAIL (1 bloqueante)
[FAIL] human_approval_required=true pero approved_by no es una aprobación real (riesgo critical)
```

Salida completa en `gate-result-TASK-003.txt`.

## Lectura

Todo lo verificable mecánicamente **pasó**:

- Typecheck + build verdes (`tsc --noEmit && vite build`, 80 módulos).
- 7 evidencias presentes y válidas, atadas al work-order activo, sin findings P0/P1:
  architect, data-integrity, security, ui, pre-merge, evidence, documentation.
- Decisión fuente `DEC-PROJECT-001` cerrada con `closure-verdict: approved`.
- Sin archivos prohibidos modificados.

El **único** bloqueante es la **aprobación humana**: el operador (Dylhan Aros)
optó deliberadamente por **no firmar** (`approved_by` vacío). El Marco, por diseño,
**rehúsa cerrar el gate** sin esa firma para un cambio de riesgo `critical`.

## Conclusión

La app está funcionalmente completa y conforme al contrato, pero **permanece
bloqueada por gobernanza** a la espera de aprobación humana. Esto es el
comportamiento esperado del Marco Estructural (governance coercitivo,
human-in-the-loop), no un defecto. Contrasta directamente con `app-specops`, cuyo
cierre lo certificó la propia auditoría de la IA (PASS) sin barrera humana
obligatoria.

## Observaciones de proceso (insumo para COMPARACION.md)

1. El clasificador por keywords del `dispatch` **sobre-disparó** ("ai-agent-behavior",
   "destructive-operation") en un To-Do trivial.
2. **Mismo código, distinta redacción** del `--description` cambió la clasificación
   de `critical` a `high` (y quitó la aprobación humana). Fragilidad del clasificador.
3. El DoD profile `ui` **omitió** evidencias que el dispatch recomendaba; el CLI lo
   advirtió pero no lo bloqueó (tensión profile vs dispatch).
4. Regenerar el work-order **invalidó toda la evidencia previa** (atada al task_id).
5. Los defaults de seguridad (`forbidden .env.*`) **moldearon el entregable**:
   obligaron a eliminar `.env.example` y documentar el entorno en el README.
