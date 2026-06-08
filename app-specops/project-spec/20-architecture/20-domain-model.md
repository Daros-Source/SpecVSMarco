---
id: domain-model
type: architecture
---

# Modelo de dominio — To-Do List

El dominio tiene **una sola entidad**: `Task`.

## Entidad `Task`

| Campo | Tipo | Reglas |
|-------|------|--------|
| `id` | uuid | PK, generada por la BD (`gen_random_uuid()`). |
| `title` | text | Requerido, 1–255 caracteres, no vacío tras *trim*. |
| `completed` | boolean | Default `false`. |
| `created_at` | timestamptz | Default `now()`. |

No hay relaciones, agregados ni otras entidades. El título no es identificador:
se permiten duplicados.
