---
id: DEC-PROJECT-001
type: architectural-decision
slug: contrato-crud-de-tareas-tabla-tasks-servicio-ui
status: closed
closure-verdict: approved
date: 2026-06-08
authors:
  - claude (BUILDER/ARCHITECT)
subsystems:
  - tasks
  - data
  - ui
supersedes: []
superseded-by: null
dod-profile: ui
---

# DEC-PROJECT-001 — Contrato CRUD de tareas (tabla tasks + servicio + UI)

## Problema

Se necesita un contrato cerrado de cómo se crean, listan, completan y eliminan
tareas (datos, comportamiento y UI) antes de implementar. El dispatch clasificó la
tarea como `critical` (toca schema + borrado + UI), por lo que requiere decisión
formal con architect/data-integrity/security review.

## Contexto

Proyecto gobernado por Marco Estructural. Stack `frontend-react-ts` + Supabase
(`database-schema`). El alcance está fijado por `../../../SHARED-BRIEF.md` (CRUD
mínimo), idéntico a la implementación hermana `app-specops`. Restricción: ningún
requisito puede divergir del brief.

## Decision

Entidad `Task` en tabla `public.tasks` (Supabase/Postgres). Toda I/O de datos vive
en `src/services/taskService.ts`; la config de entorno solo en `src/config/`; tipos
en `src/types/task.types.ts`; estado/efectos en `src/hooks/useTasks.ts`; UI en
`src/screens` + `src/components`. Operaciones:

- `createTask(title)` — inserta con `completed=false`; rechaza título vacío/espacios.
- `listTasks()` — `order by completed asc, created_at desc`.
- `toggleTask(id, completed)` — invierte `completed`.
- `deleteTask(id)` — borrado permanente (ver §Seguridad: hard delete justificado).

## Alternativas consideradas

1. **Persistencia local (localStorage)** — descartada: el brief fija Supabase y se
   debe poder comparar 1:1 con `app-specops`.
2. **Soft delete (`deleted_at`)** — el Marco recomienda soft delete (dispatch note),
   pero el brief pide borrado permanente. Se documenta como excepción consciente al
   default del framework (ver §Seguridad). Hard delete es aceptable por dominio
   trivial sin datos sensibles y sin requisito de recuperación.

## Contrato de datos

```sql
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 255),
  completed boolean not null default false,
  created_at timestamptz not null default now()
);
```

`Task` (TypeScript, en `src/types/task.types.ts`): `{ id: string; title: string;
completed: boolean; created_at: string }`.

## Contrato de comportamiento

| Caso | Input | Resultado |
|------|-------|-----------|
| crear válida | `title` no vacío | fila `completed=false`; aparece primera |
| crear vacía | `""` / espacios | rechazo en cliente y `CHECK` en BD; sin inserción |
| listar | — | orden `completed asc, created_at desc` |
| toggle | `id`, estado | `completed` invertido y persistido |
| eliminar | `id` | fila borrada de UI y BD |
| fallo I/O | red/Supabase caído | servicio lanza Error tipado; UI estado error con reintento |

Estados UI obligatorios: cargando, error (con reintento), vacío, con datos.

## Limite de alcance

### allowed_files (que puede tocarse)
- src/**
- supabase/**
- index.html
- package.json
- tsconfig.json
- tsconfig.node.json
- vite.config.ts
- .env.example
- README.md

### forbidden_files (que NO se toca)
- .env
- .env.local
- .env.production
- **/secrets/**
- .marco/**
- contracts/**

> Nota: se excluye el patrón amplio `.env.*` a propósito porque captura
> `.env.example` (plantilla segura, sin secretos, que sí debe versionarse).
> Se prohíben los archivos de entorno reales (`.env`, `.env.local`, `.env.production`).

## Consideraciones de seguridad

- **Entrada:** título validado en `/utils` (cliente) y por `CHECK` en BD.
- **Secretos:** solo `anon key` vía `src/config/`; nunca `service_role` en cliente;
  sin credenciales hardcodeadas (safety-policy).
- **Acceso anónimo:** sin auth, la tabla es accesible con la anon key. Riesgo
  residual **aceptado** por ser experimento sin datos sensibles
  (`handles_sensitive_data=false` en el manifest). Si pasara a real → nueva decisión
  para RLS + auth.
- **Hard delete:** excepción consciente al default "preferir soft delete"; sin
  pérdida relevante de datos por dominio trivial.

## Impacto en arquitectura

Confirma la estructura de `stack/frontend-react-ts.md`: capas `config → services →
hooks → components/screens`. Ningún componente importa Supabase ni usa
`import.meta.env` directo (va por `/config`). Sin store global (no necesario).

## Criterios de done

1. Tabla `tasks` creada con `CHECK` de título (migración idempotente + rollback).
2. `taskService` con las 4 operaciones tipadas, sin `any`, errores propagados.
3. Validación de título en cliente y BD.
4. 4 estados de UI presentes.
5. `tsc --noEmit` y `npm run build` sin errores.
6. Evidencias: architect-review, data-integrity-review, ui-review, security-review.

## Revision de cierre

**Veredicto:** approved. Contrato de datos y comportamiento completos; límites de
alcance explícitos (allowed/forbidden); riesgos de seguridad nombrados y aceptados
con justificación; excepción de hard delete documentada. Sin campos pendientes.

## Notas

Decisión espejo de `app-specops/.../DEC-001`. Cualquier divergencia funcional con
`app-specops` es un defecto del experimento, no del framework.
