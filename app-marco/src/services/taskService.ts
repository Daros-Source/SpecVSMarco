import { supabase, TASKS_TABLE } from "../config/supabaseConfig";
import { validateTitle } from "../utils/taskValidation";
import type { Task } from "../types/task.types";

/**
 * taskService — toda I/O contra Supabase vive aquí (stack/frontend-react-ts.md
 * §/services). Retorna tipos de /types, sin `any`, y propaga errores tipados sin
 * swallow silencioso (safety-policy: fail loudly).
 */

/** Normaliza un fallo de Supabase a un Error con mensaje legible. */
function fail(action: string, detail?: string): never {
  throw new Error(`No se pudo ${action}${detail ? `: ${detail}` : ""}.`);
}

/** Lista todas las tareas: no completadas primero, luego más recientes. */
export async function listTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from(TASKS_TABLE)
    .select("*")
    .order("completed", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) fail("cargar las tareas", error.message);
  return (data ?? []) as Task[];
}

/** Crea una tarea con título validado; nace con completed=false. */
export async function createTask(rawTitle: string): Promise<Task> {
  const { valid, value, error } = validateTitle(rawTitle);
  if (!valid) throw new Error(error ?? "Título inválido.");

  const { data, error: dbError } = await supabase
    .from(TASKS_TABLE)
    .insert({ title: value })
    .select("*")
    .single();

  if (dbError) fail("crear la tarea", dbError.message);
  return data as Task;
}

/** Alterna el estado completada de una tarea. */
export async function toggleTask(id: string, completed: boolean): Promise<Task> {
  const { data, error } = await supabase
    .from(TASKS_TABLE)
    .update({ completed: !completed })
    .eq("id", id)
    .select("*")
    .single();

  if (error) fail("actualizar la tarea", error.message);
  return data as Task;
}

/** Elimina una tarea de forma permanente (hard delete justificado en DEC-PROJECT-001). */
export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from(TASKS_TABLE).delete().eq("id", id);
  if (error) fail("eliminar la tarea", error.message);
}
