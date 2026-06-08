---
id: definition-of-done
type: definition-of-done
status: active
---

# Definition of Done

## Alcance

Repo type: frontend-spa

Este contrato aplica a builds, remediaciones y auditorías del scope activo
(`app-specops/`).

## Gates

| Gate | Aplica | Evidencia requerida | Excepción permitida |
|------|--------|---------------------|---------------------|
| Tests | condicional | Lógica pura testeable (orden, validación de título) cubierta por revisión; sin suite e2e por alcance trivial. | Omitir tests de integración con Supabase: motivo = sin entorno CI con credenciales. |
| Lint / format | sí | El código compila con `tsc --noEmit` sin errores; estilo consistente por revisión. | ninguna |
| Typecheck / build | sí | `npm run build` (vite + tsc) termina sin errores. | ninguna |
| Seguridad | condicional | Revisión: validación de título; constraint en BD; nota sobre acceso anónimo aceptado (DEC-001 §Seguridad). | Omitir RLS/auth: motivo = experimental sin datos sensibles, registrado en DEC-001. |
| Migraciones / datos | sí | Script SQL de creación de `tasks` con constraints; idempotente. | ninguna |
| Documentación | sí | `project-spec/` actualizado + `README.md` de la app. | ninguna |
| Auditoría | sí | Audit report en `50-delivery/audit-reports/`. | ninguna |

## Gates mínimos por repo type

Base sugerida para `frontend-spa`: typecheck/build siempre; lint siempre;
seguridad enfocada en validación de entrada y exposición de claves; tests
proporcionales (lógica pura sí, e2e opcional).

## Política de excepciones

Toda excepción debe registrar: gate omitido · motivo concreto · fuente que lo
acepta · riesgo residual.

Excepciones activas:

- **Tests de integración Supabase omitidos** — motivo: no hay CI con credenciales;
  fuente: este DoD; riesgo residual: regresiones en llamadas al SDK no detectadas
  automáticamente (mitigado por capa de servicio fina y tipado).
- **RLS / autenticación omitidas** — motivo: experimento sin datos sensibles;
  fuente: `DEC-001 §Consideraciones de seguridad`; riesgo residual: cualquiera con
  la URL+anon key puede leer/escribir (aceptado para el experimento).

## Evidencia de cierre

| Fecha | Cambio | Evidencia | Excepciones |
|-------|--------|-----------|-------------|
| 2026-06-08 | Build CRUD de tareas | `tsc` + `npm run build` OK; SQL de migración; audit report PASS | RLS/auth y e2e omitidos (ver arriba) |
