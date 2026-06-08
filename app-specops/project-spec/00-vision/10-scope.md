---
id: scope
type: vision
---

# Alcance — To-Do List

## Dentro

- Crear una tarea con un título de texto (1–255 caracteres, no vacío).
- Listar todas las tareas, con las no completadas primero.
- Alternar el estado completada / no completada de una tarea.
- Eliminar una tarea de forma permanente.
- Mostrar estados de UI: cargando, error (con reintento), vacío, con datos.

## Fuera

- Editar el título de una tarea existente.
- Filtrar, buscar u ordenar manualmente.
- Autenticación y multiusuario.
- Fechas, prioridades, etiquetas, recordatorios.
- Sincronización offline / apps nativas.

## Restricciones conocidas

| Restricción | Tipo | Impacto |
|-------------|------|---------|
| React 18 + TypeScript + Vite | stack | Frontend obligado por el brief compartido. |
| Supabase (Postgres) como backend | integración | Persistencia y API provistas por Supabase; sin servidor propio. |
| Sin autenticación | stack / seguridad | Acceso por clave anónima; limita a uso de un solo usuario no sensible. |
| Paridad con `app-marco` | compliance experimental | Ningún requisito puede divergir de `SHARED-BRIEF.md`. |
