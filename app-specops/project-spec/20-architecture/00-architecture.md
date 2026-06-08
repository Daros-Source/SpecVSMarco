---
id: architecture
type: architecture
---

# Arquitectura — To-Do List

## Visión general

Es una **single-page application (SPA)** de React que habla directamente con
**Supabase** como backend-as-a-service. No hay servidor propio: el cliente usa
`@supabase/supabase-js` para leer y escribir en la tabla `tasks` de Postgres a
través de la API REST autogenerada (PostgREST) que expone Supabase.

El sistema tiene tres capas lógicas: una capa de **presentación** (componentes
React), una capa de **acceso a datos** (un módulo de servicio que encapsula todas
las llamadas a Supabase) y la capa de **persistencia** (Postgres gestionado). La
regla estructural central es que ningún componente de UI habla con Supabase
directamente: todo pasa por el servicio.

El flujo es unidireccional: la UI invoca funciones del servicio, el servicio
resuelve contra Supabase y devuelve datos tipados, y un hook de estado mantiene la
lista en memoria y dispara re-render.

## Componentes

### Capa de presentación (`src/components`, `src/App.tsx`)

**Responsabilidad:** renderizar el formulario de creación, la lista de tareas y
los estados de UI (cargando / error / vacío / con datos). Captura eventos del
usuario y los delega.
**Límites:** no conoce Supabase ni SQL. No contiene lógica de validación de
negocio más allá de feedback inmediato; no importa `@supabase/supabase-js`.

### Capa de servicio (`src/services/taskService.ts`)

**Responsabilidad:** única puerta hacia los datos. Expone `listTasks`,
`createTask`, `toggleTask`, `deleteTask`. Traduce filas de Postgres a la interfaz
`Task` y normaliza errores.
**Límites:** no renderiza ni conoce React. No decide UI states; solo resuelve o
lanza error.

### Hook de estado (`src/hooks/useTasks.ts`)

**Responsabilidad:** orquestar el ciclo de vida de los datos en el cliente:
estado `loading | error | data`, recarga, y operaciones optimistas mínimas.
**Límites:** no llama a Supabase directo — solo al servicio.

### Cliente Supabase (`src/lib/supabase.ts`)

**Responsabilidad:** instanciar un único cliente Supabase a partir de variables de
entorno.
**Límites:** no contiene lógica de dominio.

## Flujo de datos

```
Usuario → Componente React → useTasks (hook) → taskService → Supabase (Postgres)
                                   ↑                              │
                                   └──────── Task[] tipado ───────┘
```

## Invariantes

- Ningún componente de presentación importa `@supabase/supabase-js`.
- Toda lectura/escritura de datos pasa por `taskService`.
- El título de una tarea nunca se persiste vacío ni con solo espacios.
- El listado siempre llega ordenado: no completadas primero, luego `created_at` desc.
- Existe exactamente una instancia del cliente Supabase en toda la app.

## Integraciones externas

| Sistema | Tipo de integración | Dirección |
|---------|---------------------|-----------|
| Supabase (PostgREST) | REST vía SDK `@supabase/supabase-js` | bidireccional |

## Decisiones de diseño relevantes

| Decisión | Justificación |
|----------|---------------|
| SPA sin backend propio | El brief pide stack mínimo; Supabase cubre API + datos. |
| Capa de servicio obligatoria | Aísla el SDK, permite testear y respeta separación de capas. |
| Validación de título en cliente y BD | Defensa en profundidad; la BD es la última fuente de verdad. |
| Orden calculado en la query | El orden es invariante de negocio, no preferencia de UI. |
