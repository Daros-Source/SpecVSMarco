/**
 * Tipos del dominio `Task`. Declaraciones puras, sin lógica
 * (stack/frontend-react-ts.md §/types). Espejo del contrato de DEC-PROJECT-001.
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

/** Estado de la vista de tareas, consumido por la capa de presentación. */
export type TaskListStatus = "loading" | "error" | "ready";
