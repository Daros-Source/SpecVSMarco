---
id: fase-1-00-task-crud
type: roadmap-micro
decision: DEC-001
---

# Micro roadmap — Fase 1 · CRUD de tareas

**Decision fuente:** `decisions/closed/DEC-001-task-crud-contract.md`

## Tareas

- [x] **T1 — Scaffolding del proyecto Vite + React + TS**
  - Done: `package.json`, `tsconfig`, `vite.config.ts`, `index.html`, entrada
    `src/main.tsx`. `tsc` no falla.
- [x] **T2 — Migración SQL de la tabla `tasks`**
  - Done: archivo `supabase/migration.sql` con `create table` + constraint del
    contrato de datos (DEC-001). Idempotente (`if not exists`).
- [x] **T3 — Cliente Supabase único**
  - Done: `src/lib/supabase.ts` lee `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`;
    exporta una sola instancia.
- [x] **T4 — Tipos de dominio**
  - Done: `src/types/task.ts` con la interfaz `Task` espejo del contrato de datos.
- [x] **T5 — `taskService` (capa de datos)**
  - Done: `listTasks`, `createTask`, `toggleTask`, `deleteTask`; valida título;
    normaliza errores; ningún componente importa el SDK directo.
- [x] **T6 — Hook `useTasks`**
  - Done: estados `loading | error | data`; `refetch`; expone acciones que llaman
    al servicio y revalidan.
- [x] **T7 — UI: formulario de creación + validación**
  - Done: `TaskForm` rechaza vacío con feedback; al crear, limpia y recarga.
- [x] **T8 — UI: lista + toggle + eliminar + estados**
  - Done: `TaskList`/`TaskItem` con checkbox, botón eliminar y los 4 estados de UI.
- [x] **T9 — Verificar Definition of Done**
  - Done: `tsc` + `npm run build` OK; documentación y SQL presentes; excepciones
    registradas en el DoD.

## Bloqueos identificados

- Ninguno. DEC-001 está cerrada sin `DECISION PENDING`.

## Fuera de scope

Editar título, filtros, auth, fechas, prioridades (ver DEC-001 §Límite de alcance).
