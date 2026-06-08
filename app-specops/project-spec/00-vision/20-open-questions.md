---
id: open-questions
type: vision
---

# Preguntas abiertas — To-Do List

| # | Pregunta | Impacto | Estado |
|---|----------|---------|--------|
| Q1 | ¿La tabla `tasks` debe protegerse con RLS aunque no haya auth? | Seguridad de datos | **Resuelta** — al ser experimental y sin datos sensibles, se acepta acceso anónimo; documentado en DEC-001 §Seguridad. |
| Q2 | ¿El orden de listado es fijo o configurable? | Comportamiento | **Resuelta** — fijo: no completadas primero, luego `created_at` desc (SHARED-BRIEF §5). |
| Q3 | ¿Se permite crear tareas con títulos duplicados? | Comportamiento | **Resuelta** — sí, se permiten duplicados; el título no es identificador. |
