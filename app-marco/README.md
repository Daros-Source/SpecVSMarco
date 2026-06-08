# app-marco — To-Do (Marco Estructural)

Implementación de la app de To-Do del `SHARED-BRIEF.md` siguiendo el **Marco
Estructural**: gobernanza *coercitiva* mediante el CLI `marco.py`
(`dispatch → decide → close-decision → task → check → gate`) con evidencia
verificable y un gate bloqueante.

## Cómo está gobernado

- `project.manifest.json` — fuente de verdad del proyecto (stack, capabilities, perfil).
- `contracts/` — constitution, blueprint, roadmap, decisions (sembrados por bootstrap).
- `.marco/decisions/closed/DEC-PROJECT-001.md` — contrato CRUD aprobado.
- `.marco/work-order.json` — autorización de build (allowed/forbidden files, budget).
- `.marco/evidence/` — architect, data-integrity, security, ui y pre-merge review.
- `.marco/audits/` — auditoría final.

## Stack

React 18 + TypeScript + Vite, datos en Supabase (Postgres). Estructura por capas
exigida por `stack/frontend-react-ts.md`: `config → services → hooks → components/screens`.

## Variables de entorno

> El Marco prohíbe versionar archivos `.env.*` (safety-policy), por eso **no** hay
> `.env.example`. Crear un `.env.local` (no versionado) con:

```
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

Solo se usa la anon key (pública por diseño). El acceso a estas variables se
centraliza en `src/config/supabaseConfig.ts` (nunca `import.meta.env` directo en componentes).

## Puesta en marcha

```bash
npm install
# crear .env.local con las variables de arriba
# ejecutar supabase/migration.sql en el SQL editor de Supabase
npm run dev
```

## Verificación

```bash
npm run typecheck   # tsc --noEmit
npm run build       # tsc + vite build
# gobernanza:
python <marco>/marco.py check
python <marco>/marco.py gate
```

## Estructura del código (stack/frontend-react-ts.md)

```
src/
├── config/supabaseConfig.ts   # única puerta a env + cliente Supabase
├── types/task.types.ts        # tipos del dominio
├── utils/taskValidation.ts    # validación pura (testeable)
├── services/taskService.ts    # toda I/O a Supabase
├── hooks/useTasks.ts          # estado + revalidación
├── components/                # TaskForm, TaskList, TaskItem
├── screens/TodoScreen.tsx     # orquesta y resuelve 4 estados de UI
├── App.tsx
└── styles.css
```
