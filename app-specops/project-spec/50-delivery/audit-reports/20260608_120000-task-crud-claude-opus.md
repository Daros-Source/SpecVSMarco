---
id: audit-20260608-task-crud
type: audit-report
scope: feature/task-crud
verdict: PASS
model: claude-opus
date: 2026-06-08
---

# Auditoría — Feature CRUD de tareas

## Resumen ejecutivo

La feature CRUD de tareas está implementada conforme a `DEC-001`, la arquitectura
documentada y el `SHARED-BRIEF.md`. Los gates aplicables del Definition of Done se
verificaron (typecheck + build OK). Las dos excepciones del DoD (RLS/auth y tests
e2e) están registradas con justificación. **Veredicto: PASS.**

## Fuentes consultadas

- `decisions/closed/DEC-001-task-crud-contract.md` (autoridad máxima)
- `20-architecture/00-architecture.md`, `50-data-truth-model.md`
- `40-planning/10-definition-of-done.md`
- `40-planning/roadmap-micro/fase-1-00-task-crud.md`
- Código en `src/` y `supabase/migration.sql`

## Hallazgos

### Correcto

- **Contrato de datos:** `src/types/task.ts` y `supabase/migration.sql` coinciden
  con DEC-001 (campos, tipos, constraint de título 1–255 no vacío).
- **Contrato de comportamiento:** `taskService` implementa crear/listar/toggle/
  eliminar; el orden `completed asc, created_at desc` se pide en la query
  (`listTasks`), tal como exige el invariante.
- **Validación de título:** doble — `normalizeTitle` en cliente y `CHECK` en BD.
- **Estados de UI:** `App.tsx` resuelve cargando, error (con reintento), vacío y
  con datos. Coincide con la tabla de estados de DEC-001.
- **Invariante de capas:** ningún componente importa `@supabase/supabase-js`; solo
  `taskService` (vía `lib/supabase.ts`) lo hace. Verificado por inspección.
- **Fuente única de verdad:** tras cada mutación, `useTasks` hace `reload()` — no
  hay escritura optimista que pueda divergir (alineado con `50-data-truth-model.md`).

### Desvíos

- Ninguno respecto a las fuentes de verdad.

### Faltante

- Ninguno dentro del alcance. Lo no implementado está explícitamente fuera de
  alcance en DEC-001 §Límite de alcance.

### Implícito (choices en código sin decision)

- Estilos visuales (tema oscuro) — decisión estética sin impacto de contrato; se
  acepta sin decision formal.

### Deuda

- Sin suite de tests automatizada (excepción registrada). Riesgo residual bajo dada
  la fina capa de servicio y el tipado estricto.

### Seguridad (security-lead)

- Solo se usa la anon key; la service_role nunca llega al cliente.
- Acceso anónimo a `tasks` aceptado y documentado en DEC-001 §Seguridad — no es un
  hallazgo nuevo, es un riesgo residual aceptado para el experimento.
- Validación de entrada presente. Sin datos personales.

### Evidencia de calidad (gates del DoD)

| Gate | Resultado |
|------|-----------|
| Typecheck / build | ✅ `npm run build` (tsc + vite) OK, 78 módulos |
| Lint / format | ✅ compila con `noUnusedLocals`/`noUnusedParameters`; estilo consistente |
| Seguridad | ✅ revisado; riesgo anónimo aceptado |
| Migraciones / datos | ✅ `migration.sql` idempotente con constraint |
| Documentación | ✅ `project-spec/` + README de la app actualizados |
| Tests | ⚠️ e2e omitidos (excepción registrada en DoD) |

## Veredicto

**PASS.**

## Siguiente paso

Ninguno dentro del alcance del experimento. La app está lista para la fase de
comparación con `app-marco`.
