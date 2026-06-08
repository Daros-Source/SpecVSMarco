---
id: integration-boundaries
type: architecture
---

# Límites de integración — Supabase

## Supabase (única integración)

- **Naturaleza:** backend-as-a-service. Expone Postgres vía API REST (PostgREST)
  y una clave anónima para el cliente.
- **Punto de contacto:** exclusivamente `src/services/taskService.ts` mediante
  `@supabase/supabase-js`. Ninguna otra parte de la app conoce la integración.
- **Contrato consumido:** tabla `tasks` con las columnas de `20-domain-model.md`.
- **Modo de fallo:** si Supabase responde error o la red falla, el servicio lanza
  un `Error` normalizado; el hook lo traduce a estado `error` con reintento.
- **Autenticación:** clave anónima (`anon`). Sin sesión de usuario.
- **Lo que NO se delega a Supabase:** lógica de orden de presentación se pide en la
  query, pero la validación de título también se hace en cliente (defensa en
  profundidad).
