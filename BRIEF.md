# Brief de producto — App To-Do List

## 1. Problema

Una persona necesita registrar sus tareas pendientes, marcar las que ya completó y
eliminar las que ya no le sirven. Hoy lo resuelve con papel, notas sueltas o la
memoria, lo que provoca olvidos y falta de una vista única de lo que falta hacer.

## 2. Usuario

Una sola persona. Sin autenticación, sin multiusuario y sin roles. Al abrir la app
ve su lista global de tareas.

## 3. Alcance funcional

| # | Capacidad | Descripción |
|---|-----------|-------------|
| C1 | **Crear** | Agregar una tarea con un título de texto. |
| C2 | **Listar** | Ver todas las tareas, las no completadas primero. |
| C3 | **Completar** | Alternar el estado completada / no completada de una tarea. |
| C4 | **Eliminar** | Borrar una tarea de forma permanente. |

**Fuera de alcance:** edición del título, filtros, búsqueda, fechas de vencimiento,
prioridades, etiquetas, autenticación, multiusuario, sincronización, notificaciones,
paginación, ordenamiento manual y drag & drop.

## 4. Contrato de datos (entidad `Task`)

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
| Eliminar | delete sobre una tarea | La tarea desaparece de la lista y de la base de datos. |

## 6. Estados de UI obligatorios

- **Cargando**: indicador mientras se consultan las tareas.
- **Error**: mensaje legible si una operación falla, con posibilidad de reintento.
- **Vacío**: mensaje cuando no hay tareas.
- **Con datos**: el listado.

## 7. Stack técnico

- **Frontend:** React 18 + TypeScript + Vite.
- **Backend / datos:** Supabase (Postgres) — tabla `tasks`, accedida con
  `@supabase/supabase-js` desde el cliente.
- **Sin servidor intermedio propio** (la API la provee Supabase).
- Configuración por variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

## 8. Definición de "terminado"

1. Las cuatro capacidades (C1–C4) funcionan contra Supabase.
2. La validación de título vacío está implementada.
3. Los cuatro estados de UI están presentes.
4. El proyecto compila (`tsc`) y `npm run build` pasa sin errores.
