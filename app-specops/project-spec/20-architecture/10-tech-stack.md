---
id: tech-stack
type: architecture
---

# Tech Stack — To-Do List

| Capa | Tecnología | Versión objetivo | Por qué |
|------|------------|------------------|---------|
| Build / dev server | Vite | 5.x | Arranque y HMR rápidos, config mínima para React+TS. |
| UI | React | 18.x | Requisito del brief compartido. |
| Lenguaje | TypeScript | 5.x | Tipado del contrato `Task` extremo a extremo. |
| Acceso a datos | `@supabase/supabase-js` | 2.x | SDK oficial; cliente PostgREST tipado. |
| Persistencia | Supabase / Postgres | gestionado | Backend-as-a-service: API + datos sin servidor propio. |
| Estilos | CSS plano (un archivo) | — | Alcance mínimo; sin framework de estilos para no añadir superficie. |

## Configuración

Variables de entorno (prefijo `VITE_` para exponerlas al cliente):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Se proveen vía `.env.local` (no versionado). Existe un `.env.example` como
plantilla.

## Justificación de exclusiones

- **Sin router:** una sola pantalla.
- **Sin librería de estado global (Redux/Zustand):** un hook local alcanza.
- **Sin framework CSS:** mantener la superficie mínima y comparable con `app-marco`.
