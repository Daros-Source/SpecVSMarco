import { useTasks } from "./hooks/useTasks";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

/**
 * App — compone la pantalla única y resuelve los cuatro estados de UI exigidos
 * por DEC-001: cargando, error (con reintento), vacío y con datos.
 */
export function App() {
  const { tasks, loading, error, reload, add, toggle, remove } = useTasks();

  return (
    <main className="app">
      <h1>To-Do · SpecOps</h1>
      <TaskForm onAdd={add} />

      {loading && <p className="loading">Cargando tareas…</p>}

      {error && !loading && (
        <div className="error">
          <p>{error}</p>
          <button onClick={() => void reload()}>Reintentar</button>
        </div>
      )}

      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onToggle={(t) => void toggle(t)}
          onDelete={(id) => void remove(id)}
        />
      )}
    </main>
  );
}
