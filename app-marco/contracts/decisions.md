# Registro de Decisiones Tecnicas

Reglas:
- Solo agregar (append-only), nunca reescribir historia
- Si una decision cambia, agregar nueva entrada referenciando la anterior

## Formato

```
## DEC-[numero] — [titulo]
**Fecha:** YYYY-MM-DD
**Estado:** APROBADA | PENDIENTE | REEMPLAZADA POR DEC-XXX

### Contexto
[Por que surgio esta decision]

### Opciones consideradas
1. [Opcion A] — [pros/contras]

### Decision
[Que se decidio y por que]

### Impacto
[Que cambia]
```

---

## DECISIONES REGISTRADAS

## DEC-001 — Stack tecnologico
**Fecha:** 2026-06-08
**Estado:** APROBADA

### Contexto
Definicion del stack tecnologico durante la inicializacion del proyecto.

### Decision
Stack seleccionado: frontend-react-ts, database-schema

### Impacto
Determina las guias de stack aplicables y las capabilities del proyecto.

---

## DEC-002 — Perfil documental
**Fecha:** 2026-06-08
**Estado:** APROBADA

### Contexto
Perfilado basado en: equipo (solo), horizonte (< 3 meses).

### Decision
Perfil documental: **LIGHT**

### Impacto
Determina la profundidad de documentacion generada en docs/.

---

## DECISIONES PENDIENTES ACTIVAS

*(Registrar aqui decisiones que bloquean avance)*
