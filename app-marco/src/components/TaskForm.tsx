import { useState, type FormEvent } from "react";
import { validateTitle } from "../utils/taskValidation";

/**
 * TaskForm — recibe la acción por props, no fetcha (stack §/components).
 * Da feedback inmediato usando la validación pura compartida.
 */
interface TaskFormProps {
  onAdd: (title: string) => Promise<void>;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    const check = validateTitle(title);
    if (!check.valid) {
      setLocalError(check.error);
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
      {localError && (
        <p className="form-error" role="alert">
          {localError}
        </p>
      )}
    </form>
  );
}
