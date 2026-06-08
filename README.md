# Marco Estructural vs SpecOps — Análisis filosófico

Comparación de **dos filosofías de gobernanza de desarrollo de software asistido
por IA**, desde su *filosofía, objetivo y modelo de trabajo* — no desde la calidad
de implementación.

## Las dos filosofías

| | **SpecOps** | **Marco Estructural** |
|---|---|---|
| Repo | `vozdigitalCL/spec-ops` | `vozdigitalCL/marco_estructural` |
| Síntesis | Sistema de **especificación progresiva**: define *qué claridad debe existir antes* de que la IA construya. | Sistema de **gobernanza**: define *con qué permisos opera* la IA, con control procedimental. |
| Pregunta central | ¿Hay suficiente claridad para construir? | ¿Con qué permiso opera la IA? |
| Unidad central | La decisión cerrada (`DEC-NNN`) | La sesión estructurada de trabajo |

## Cómo se hace esta comparación

1. **Molde del análisis** → [`INSTRUCCION-ANALISIS.md`](./INSTRUCCION-ANALISIS.md):
   formato de respuesta (6 partes), reglas (5) y cuadro comparativo (19
   dimensiones) + 8 ejes, derivados del PDF de referencia.
2. **Evidencia empírica** → en **dos chats separados**, cada framework arranca de
   cero con una **misma frase-objetivo neutra** y conduce *su propio discovery*
   (no se le entrega un brief con stack ni contrato de datos). Cada uno ejecuta *de
   verdad* su framework, no actuándolo:
   - SpecOps con el comando `/spec`.
   - Marco Estructural con `bootstrap.py` + `marco.py` + skills.

   > **Arranque ciego y mínimo.** No se da un brief cerrado: el objetivo es observar
   > *cómo cada filosofía entrevista, decide y construye desde cero*. Para mantener
   > los runs comparables, el evaluador responde las preguntas de cada framework de
   > forma consistente usando [`GUION-RESPUESTAS.md`](./GUION-RESPUESTAS.md) — un
   > archivo **privado** que los chats de construcción **nunca leen** (evita el sesgo
   > del observador). El contexto de comparación vive solo en este hub.
3. **Síntesis** → al volver, el análisis filosófico se escribe en este repo
   siguiendo `INSTRUCCION-ANALISIS.md`.

> Las apps auténticas se construyen en carpetas/repos aparte (p. ej.
> `todo-specops/`, `todo-marco/`) para no contaminar la comparación con contexto
> compartido. Este repo es el **hub de análisis**.

## Estructura del repositorio

```
SpecVSMarco/
├── README.md                ← este archivo
├── GUION-RESPUESTAS.md      ← privado: frase-objetivo + respuestas consistentes (NO se da a los chats)
├── INSTRUCCION-ANALISIS.md  ← molde del análisis (formato, reglas, cuadro)
├── NOTAS-RUNS.md            ← bitácora de ambos runs + anotaciones del evaluador
└── ANALISIS.md              ← análisis filosófico final ✅
```

> Los clones de los frameworks (`spec-ops/`, `marco_estructural/`) están en
> `.gitignore`: son material de referencia local, no parte del análisis.

## Estado

✅ Experimento completo. Ambas filosofías se ejecutaron de verdad en chats
separados desde un arranque ciego idéntico; la evidencia está en
[`NOTAS-RUNS.md`](./NOTAS-RUNS.md) y el análisis filosófico final en
[`ANALISIS.md`](./ANALISIS.md).

**Conclusión (resumen):** para el objetivo de un asistente *progresivo, trazable y
usable en proyectos reales*, **SpecOps** está más alineado (prerequisitos +
progresividad + portabilidad). Para **garantías inquebrantables en contextos
críticos** (alto riesgo, equipos, compliance), el enforcement coercitivo del **Marco
Estructural** es la fortaleza. No son mejor/peor: responden a objetivos distintos.

---

*Autor: dylhanaros (Daros-Source)*
