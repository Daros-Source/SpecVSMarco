import { useCallback, useEffect, useState } from "react";
import type { Task, TaskListStatus } from "../types/task.types";
import * as taskService from "../services/taskService";

/**
 * useTasks — lógica con estado, sin render (stack/frontend-react-ts.md §/hooks).
 * Mantiene la fuente de verdad en la BD: tras cada mutación revalida con un
 * refetch, evitando divergencias (principio: fuente única de verdad).
 */
interface UseTasksResult {
  tasks: Task[];
  status: TaskListStatus;
  error: string | null;
  reload: () => Promise<void>;
  add: (title: string) => Promise<void>;
  toggle: (task: Task) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<TaskListStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async (): Promise<void> => {
    setStatus("loading");
    setError(null);
    try {
      setTasks(await taskService.listTasks());
      setStatus("ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const add = useCallback(
    async (title: string): Promise<void> => {
      await taskService.createTask(title);
      await reload();
    },
    [reload]
  );

  const toggle = useCallback(
    async (task: Task): Promise<void> => {
      await taskService.toggleTask(task.id, task.completed);
      await reload();
    },
    [reload]
  );

  const remove = useCallback(
    async (id: string): Promise<void> => {
      await taskService.deleteTask(id);
      await reload();
    },
    [reload]
  );

  return { tasks, status, error, reload, add, toggle, remove };
}
