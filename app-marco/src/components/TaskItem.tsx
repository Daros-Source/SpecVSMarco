import type { Task } from "../types/task.types";

/**
 * TaskItem — fila de tarea. Solo presentación; delega acciones (stack §/components).
 */
interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        <span>{task.title}</span>
      </label>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label={`Eliminar ${task.title}`}
      >
        ✕
      </button>
    </li>
  );
}
