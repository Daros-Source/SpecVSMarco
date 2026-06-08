# Brief Canónico Compartido — App To-Do List

> **Propósito de este documento.** Este es el *único* documento que ambas
> implementaciones comparten. Define el producto a construir de forma idéntica
> para que la comparación entre **SpecOps** y **Marco Estructural** mida la
> *metodología*, no diferencias de alcance. Ninguna de las dos implementaciones
> puede añadir o quitar requisitos respecto a este brief.

---

## 1. Problema

Un usuario necesita registrar tareas pendientes, marcarlas como completadas y
eliminarlas. Es la app de To-Do más simple posible: el objetivo NO es el producto,
sino ejercitar la ceremonia de cada framework de gobernanza sobre un dominio
trivial y conocido.

## 2. Usuario

Una sola persona. **Sin autenticación**, sin multiusuario, sin roles. Un único
listado global de tareas.

## 3. Alcance funcional (CRUD mínimo — idéntico en ambas apps)

| # | Capacidad | Descripción |
|---|-----------|-------------|
| C1 | **Crear** | Agregar una tarea con un título de texto. |
| C2 | **Listar** | Ver todas las tareas, las no completadas primero. |
| C3 | **Completar** | Alternar el estado completada / no completada de una tarea. |
| C4 | **Eliminar** | Borrar una tarea de forma permanente. |

**Fuera de alcance (explícito):** edición de título, filtros, búsqueda, fechas de
vencimiento, prioridades, etiquetas, autenticación, multiusuario, sincronización,
notificaciones, paginación, ordenamiento manual, drag&drop.

## 4. Contrato de datos (entidad única `Task`)

| Campo | Tipo | Reglas |
|-------|------|--------|
| `id` | uuid | Generado por el servidor. Clave primaria. |
| `title` | text | Requerido. 1–255 caracteres. No vacío tras *trim*. |
| `completed` | boolean | Default `false`. |
| `created_at` | timestamptz | Default `now()`. |

## 5. Contrato de comportamiento

| Caso | Entrada | Salida esperada |
|------|---------|-----------------|
| Crear válida | `title` no vacío | Tarea creada con `completed=false`; aparece en la lista. |
| Crear vacía | `title` vacío / solo espacios | Rechazo; no se crea; mensaje de error visible. |
| Listar vacío | (sin tareas) | Estado vacío: "No hay tareas todavía." |
| Listar con datos | (≥1 tarea) | Lista ordenada: no completadas primero, luego por `created_at` desc. |
| Completar | toggle sobre una tarea | `completed` se invierte y persiste. |
| Eliminar | delete sobre una tarea | Tarea desaparece de la lista y de la BD. |

## 6. Estados de UI obligatorios

- **Cargando**: indicador mientras se consultan las tareas.
- **Error**: mensaje legible si una operación falla (con posibilidad de reintento).
- **Vacío**: mensaje cuando no hay tareas.
- **Con datos**: el listado.

## 7. Stack técnico (idéntico en ambas apps)

- **Frontend:** React 18 + TypeScript + Vite.
- **Backend / datos:** Supabase (Postgres) — tabla `tasks`, accedida con
  `@supabase/supabase-js` desde el cliente.
- **Sin servidor intermedio propio** (la API la provee Supabase).
- Configuración por variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

## 8. Definición de "Terminado" (alto nivel, común)

1. Las 4 capacidades (C1–C4) funcionan contra Supabase.
2. Validación de título vacío implementada.
3. Los 4 estados de UI presentes.
4. El código compila (`tsc`) y `npm run build` pasa.
5. Cada framework produce además **sus propios artefactos de gobernanza**
   (lo que distingue a uno de otro y es el objeto de la comparación).

---

*Cualquier divergencia funcional entre `app-specops/` y `app-marco/` se considera
un defecto del experimento, no una diferencia de framework.*
