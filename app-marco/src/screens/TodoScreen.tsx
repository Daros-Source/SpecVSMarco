import { useTasks } from "../hooks/useTasks";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

/**
 * TodoScreen — orquesta componentes y hook, sin lógica de negocio inline
 * (stack/frontend-react-ts.md §/screens). Resuelve los 4 estados de UI exigidos
 * por DEC-PROJECT-001: cargando, error (con reintento), vacío y con datos.
 */
export function TodoScreen() {
  const { tasks, status, error, reload, add, toggle, remove } = useTasks();

  return (
    <main className="app">
      <h1>To-Do · Marco Estructural</h1>
      <TaskForm onAdd={add} />

      {status === "loading" && <p className="loading">Cargando tareas…</p>}

      {status === "error" && (
        <div className="error" role="alert">
          <p>{error}</p>
          <button onClick={() => void reload()}>Reintentar</button>
        </div>
      )}

      {status === "ready" && (
        <TaskList
          tasks={tasks}
          onToggle={(t) => void toggle(t)}
          onDelete={(id) => void remove(id)}
        />
      )}
    </main>
  );
}
