import { useCallback, useEffect, useState } from "react";
import type { Task } from "../types/task";
import * as taskService from "../services/taskService";

/**
 * useTasks — orquesta el ciclo de vida de los datos en el cliente.
 * Mantiene estado loading | error | data y revalida contra la fuente de verdad
 * (la BD) tras cada operación, evitando divergencias.
 *
 * Ver: project-spec/20-architecture/50-data-truth-model.md
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTasks(await taskService.listTasks());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const add = useCallback(
    async (title: string) => {
      // Validación en cliente antes de tocar la red (defensa en profundidad).
      taskService.normalizeTitle(title);
      await taskService.createTask(title);
      await load();
    },
    [load]
  );

  const toggle = useCallback(
    async (task: Task) => {
      await taskService.toggleTask(task.id, task.completed);
      await load();
    },
    [load]
  );

  const remove = useCallback(
    async (id: string) => {
      await taskService.deleteTask(id);
      await load();
    },
    [load]
  );

  return { tasks, loading, error, reload: load, add, toggle, remove };
}
