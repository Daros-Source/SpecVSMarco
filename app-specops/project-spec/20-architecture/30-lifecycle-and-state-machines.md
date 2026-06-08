---
id: lifecycle-and-state-machines
type: architecture
---

# Lifecycle y máquinas de estado — Task

El ciclo de vida de una `Task` es mínimo:

```
        crear
  (∅) ─────────▶ [ pendiente ]  (completed=false)
                    │   ▲
            toggle  │   │ toggle
                    ▼   │
                 [ completada ] (completed=true)

  cualquier estado ──eliminar──▶ (∅)   (borrado permanente)
```

- **Creación:** nace siempre en `pendiente` (`completed=false`).
- **Toggle:** alterna entre `pendiente` y `completada`. Es reversible e idempotente
  respecto al valor objetivo (se invierte el booleano actual).
- **Eliminación:** transición terminal desde cualquier estado; no hay papelera ni
  *soft delete*.

No existen otros estados (ni "archivada", ni "en progreso"): están fuera de alcance.
