-- =====================================================================
-- Migración: tabla `tasks` — contrato de datos de DEC-PROJECT-001.
-- Idempotente (IF NOT EXISTS). Incluye plan de rollback explícito
-- (requerido por dispatch: "All migrations require explicit rollback plan").
-- =====================================================================

-- UP --------------------------------------------------------------------
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 255),
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists tasks_order_idx on public.tasks (completed asc, created_at desc);

-- Acceso anónimo (experimental, sin auth — DEC-PROJECT-001 §Seguridad).
alter table public.tasks enable row level security;
drop policy if exists "anon full access (experimental)" on public.tasks;
create policy "anon full access (experimental)" on public.tasks
  for all using (true) with check (true);

-- ROLLBACK (ejecutar manualmente para revertir) -------------------------
-- drop policy if exists "anon full access (experimental)" on public.tasks;
-- drop index if exists tasks_order_idx;
-- drop table if exists public.tasks;
