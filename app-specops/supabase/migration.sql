-- Migración: tabla `tasks` — contrato de datos de DEC-001.
-- Idempotente: segura de re-ejecutar.
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 255),
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

-- Índice para el orden de listado (completed asc, created_at desc).
create index if not exists tasks_order_idx on public.tasks (completed asc, created_at desc);

-- NOTA DE SEGURIDAD (DEC-001 §Consideraciones de seguridad):
-- Experimento sin autenticación. Se acepta acceso anónimo y riesgo residual.
-- Para habilitar acceso con la anon key sin RLS restrictivo en este contexto:
alter table public.tasks enable row level security;
drop policy if exists "anon full access (experimental)" on public.tasks;
create policy "anon full access (experimental)" on public.tasks
  for all using (true) with check (true);
