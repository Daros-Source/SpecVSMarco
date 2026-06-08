# app-specops — To-Do (metodología SpecOps)

Implementación de la app de To-Do del `SHARED-BRIEF.md` siguiendo el flujo
**SpecOps**: la verdad vive en `project-spec/` (visión → arquitectura → planning →
decisions cerradas → micro roadmap → build → auditoría), y el código es la
materialización de la decision `DEC-001`.

## Cómo está gobernado

Todo el rastro de gobernanza está en [`project-spec/`](./project-spec):

- `00-vision/` — problema, alcance, preguntas abiertas.
- `20-architecture/` — arquitectura, stack, dominio, lifecycle, integraciones, verdad de datos.
- `40-planning/` — roadmap macro, **Definition of Done**, micro roadmap.
- `decisions/closed/DEC-001-task-crud-contract.md` — el contrato que el código obedece.
- `50-delivery/audit-reports/` — auditoría final contra las fuentes de verdad.

## Stack

React 18 + TypeScript + Vite, datos en Supabase (Postgres). Capa de servicio única
(`src/services/taskService.ts`) como puerta a los datos.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completar con tu proyecto Supabase
# ejecutar supabase/migration.sql en el SQL editor de Supabase
npm run dev
```

## Verificación (gates del Definition of Done)

```bash
npm run typecheck   # tsc --noEmit
npm run build       # tsc + vite build
```

## Estructura del código

```
src/
├── lib/supabase.ts        # cliente único
├── types/task.ts          # entidad Task (espejo de DEC-001)
├── services/taskService.ts# única puerta a los datos
├── hooks/useTasks.ts      # estado loading|error|data + revalidación
├── components/            # TaskForm, TaskList, TaskItem (solo presentación)
├── App.tsx                # compone los 4 estados de UI
└── styles.css
```
