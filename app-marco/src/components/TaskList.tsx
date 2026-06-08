import type { Task } from "../types/task.types";
import { TaskItem } from "./TaskItem";

/**
 * TaskList — render de la lista o estado vacío. Los estados cargando/error los
 * resuelve la screen (stack §/components: recibe datos por props).
 */
interface TaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty">No hay tareas todavía.</p>;
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
