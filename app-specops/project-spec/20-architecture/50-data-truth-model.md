---
id: data-truth-model
type: architecture
---

# Modelo de verdad de datos — To-Do List

## Fuente única de verdad

La tabla `tasks` en Postgres (Supabase) es la **única** fuente de verdad. El estado
en el cliente (hook `useTasks`) es una **copia derivada y efímera** que se
reconstruye desde la BD en cada carga.

| Dato | Fuente de verdad | Derivados |
|------|------------------|-----------|
| Lista de tareas | tabla `tasks` | array en memoria del hook `useTasks` |
| Estado `completed` | columna `tasks.completed` | checkbox en la UI |
| Orden de listado | query `ORDER BY completed asc, created_at desc` | render del array |

## Reglas de consistencia

- Tras crear, completar o eliminar, el cliente **revalida** contra la BD (refetch)
  para no divergir de la fuente de verdad.
- No hay caché persistente en el cliente: al recargar la página, todo se relee.
- El `id` y el `created_at` los asigna la BD, nunca el cliente.

## Degradación

Si una escritura falla, el estado local **no** se da por bueno: se muestra error y
se mantiene la última lista consistente conocida. No hay escritura optimista que
pueda dejar la UI mostrando algo que la BD no confirmó.
