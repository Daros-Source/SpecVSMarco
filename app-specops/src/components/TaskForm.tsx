import { useState, type FormEvent } from "react";

/**
 * TaskForm — formulario de creación. Solo presentación: valida vacío para dar
 * feedback inmediato y delega la creación al padre. No conoce Supabase.
 */
interface TaskFormProps {
  onAdd: (title: string) => Promise<void>;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (title.trim().length === 0) {
      setLocalError("Escribí un título para la tarea.");
      return;
    }
    setSubmitting(true);
    setLocalError(null);
    try {
      await onAdd(title);
      setTitle("");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "No se pudo crear.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        maxLength={255}
        placeholder="¿Qué hay que hacer?"
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
        aria-label="Título de la tarea"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Agregando…" : "Agregar"}
      </button>
      {localError && <p className="form-error">{localError}</p>}
    </form>
  );
}
