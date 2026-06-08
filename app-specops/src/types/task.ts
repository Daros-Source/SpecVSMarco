/**
 * Entidad de dominio `Task`. Espejo exacto del contrato de datos de DEC-001
 * y de la tabla `tasks` en Supabase.
 *
 * Ver: project-spec/decisions/closed/DEC-001-task-crud-contract.md
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}
