---
id: DEC-001
type: decision
slug: task-crud-contract
status: closed
closure-verdict: closed
date: 2026-06-08
authors: [spec-lead, build-lead, security-lead]
subsystems: [tasks, data, ui]
supersedes: ~
superseded-by: ~
---

# DEC-001 — Contrato de CRUD de tareas

## Problema

Necesitamos un contrato único, sin ambigüedad, de cómo se crean, listan, completan
y eliminan las tareas, incluyendo forma de los datos, comportamiento ante casos
borde y estados de UI. Sin este contrato cerrado, el build no puede empezar.

## Contexto

El roadmap macro coloca todo el producto en una sola feature (Fase 1). La
arquitectura (`20-architecture/`) fija una SPA React con capa de servicio única
contra Supabase. Esta decision cierra el contrato de esa feature.

## Decision

Se implementa una entidad `Task` persistida en la tabla `tasks` de Supabase, con
cuatro operaciones expuestas por `taskService`:

- `createTask(title)` — inserta con `completed=false`; rechaza título vacío/espacios.
- `listTasks()` — devuelve todas, ordenadas `completed asc, created_at desc`.
- `toggleTask(id, completed)` — invierte el booleano `completed`.
- `deleteTask(id)` — borrado permanente.

La validación de título (no vacío, ≤255) se hace en el cliente **y** como
constraint en la BD.

## Alternativas consideradas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Persistencia en `localStorage` | El brief fija Supabase como backend; localStorage no es comparable con `app-marco`. |
| Servidor Node/Express intermedio | Añade superficie innecesaria; Supabase ya expone API. |
| Soft delete (columna `deleted_at`) | Fuera de alcance; el brief pide borrado permanente. |
| Escritura optimista en UI | Riesgo de divergir de la fuente de verdad; se prefiere refetch (ver `50-data-truth-model.md`). |

## Contrato de datos

```
Task {
  id: uuid           // PK, gen_random_uuid(), asignado por la BD
  title: text        // requerido, 1..255, no vacío tras trim
  completed: boolean // default false
  created_at: timestamptz // default now()
}
```

Tabla SQL:

```sql
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 255),
  completed boolean not null default false,
  created_at timestamptz not null default now()
);
```

## Contrato de comportamiento

| Caso | Input | Output esperado |
|------|-------|-----------------|
| caso feliz — crear | `title="Comprar pan"` | fila creada `completed=false`; aparece primera en lista (más reciente, no completada). |
| caso borde — duplicado | `title` igual a uno existente | se crea igual; duplicados permitidos. |
| error — título vacío | `title=""` o `"   "` | no se crea; error de validación visible; sin llamada a BD. |
| caso feliz — listar | — | array ordenado `completed asc, created_at desc`. |
| caso feliz — toggle | `id`, `completed` actual | `completed` invertido y persistido; reordena la lista. |
| caso feliz — eliminar | `id` | fila borrada; desaparece de lista y BD. |
| error — operación falla | red/Supabase caído | `taskService` lanza Error normalizado; UI muestra estado error con reintento. |

| Estado UI | Qué muestra |
|-----------|-------------|
| cargando | indicador mientras se hace `listTasks`. |
| error | mensaje legible + botón "Reintentar". |
| vacío | "No hay tareas todavía." |
| con datos | lista con checkbox (toggle) y botón eliminar por ítem. |

## Límite de alcance

FUERA de esta decision: editar título, filtros, búsqueda, orden manual, fechas,
prioridades, etiquetas, autenticación, multiusuario, paginación, soft delete.

## Consideraciones de seguridad

- **Validación de entrada:** título validado en cliente y por `CHECK` en BD.
- **Exposición de claves:** solo se usa la `anon key` (pública por diseño en
  Supabase); la `service_role` nunca llega al cliente.
- **Acceso anónimo aceptado:** sin autenticación, la tabla es accesible con la
  anon key. **Riesgo residual aceptado** por ser un experimento sin datos
  sensibles (ver `00-vision/00-product-vision.md` §Supuestos). Si el producto se
  volviera real, se requiere una decision nueva para activar RLS + auth.
- **Revisión security-lead:** attack surface mínima (un solo endpoint de datos),
  sin datos personales, sin secretos en cliente. Sin hallazgos bloqueantes.

## Impacto en arquitectura

Confirma —no modifica— la arquitectura ya documentada: tabla `tasks`,
`taskService` como única puerta, hook `useTasks`. No introduce componentes nuevos.

## Criterios de done

- [x] Tabla `tasks` creada con constraints del contrato de datos.
- [x] `taskService` expone las 4 operaciones con tipos correctos.
- [x] Validación de título en cliente y BD.
- [x] Los 4 estados de UI implementados.
- [x] Orden de listado correcto.
- [x] `tsc` + `npm run build` sin errores.

## Revisión de cierre

**Veredicto:** closed

Contrato de datos completo (sin campos TBD). Contrato de comportamiento cubre
feliz, borde y error, con estados de UI. Límite de alcance explícito.
Seguridad revisada por security-lead: riesgo de acceso anónimo nombrado y
aceptado con justificación, no implícito. No quedan `DECISION PENDING`.

## Notas

Esta decision es el contrato espejo del `SHARED-BRIEF.md`; cualquier divergencia
respecto a `app-marco` se considera defecto del experimento.
