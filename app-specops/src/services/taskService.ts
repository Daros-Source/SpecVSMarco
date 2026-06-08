import { supabase } from "../lib/supabase";
import type { Task } from "../types/task";

/**
 * taskService — única puerta hacia los datos (invariante de arquitectura).
 * Encapsula todo el acceso a Supabase, traduce filas a `Task` y normaliza
 * errores. Ningún componente de UI debe importar el SDK directamente.
 *
 * Contrato: DEC-001 §Decision / §Contrato de comportamiento.
 */

const TABLE = "tasks";
const MAX_TITLE = 255;

/** Normaliza cualquier error de Supabase a un Error con mensaje legible. */
function fail(action: string, detail?: string): never {
  throw new Error(`No se pudo ${action}${detail ? `: ${detail}` : ""}.`);
}

/** Valida el título según DEC-001 (no vacío tras trim, ≤255). Devuelve el limpio. */
export function normalizeTitle(raw: string): string {
  const title = raw.trim();
  if (title.length === 0) {
    throw new Error("El título no puede estar vacío.");
  }
  if (title.length > MAX_TITLE) {
    throw new Error(`El título no puede superar ${MAX_TITLE} caracteres.`);
  }
  return title;
}

/** Lista todas las tareas: no completadas primero, luego más recientes. */
export async function listTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("completed", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) fail("cargar las tareas", error.message);
  return (data ?? []) as Task[];
}

/** Crea una tarea con título validado; nace con completed=false. */
export async function createTask(rawTitle: string): Promise<Task> {
  const title = normalizeTitle(rawTitle);
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ title })
    .select("*")
    .single();

  if (error) fail("crear la tarea", error.message);
  return data as Task;
}

/** Alterna el estado completada de una tarea. */
export async function toggleTask(id: string, completed: boolean): Promise<Task> {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ completed: !completed })
    .eq("id", id)
    .select("*")
    .single();

  if (error) fail("actualizar la tarea", error.message);
  return data as Task;
}

/** Elimina una tarea de forma permanente. */
export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) fail("eliminar la tarea", error.message);
}
