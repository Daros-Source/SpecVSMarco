# Instrucción de análisis (derivada del PDF de referencia)

> Fuente: `marco-estructural-vs-specops.pdf`. Este archivo fija **cómo** debe
> escribirse el análisis comparativo final en este chat, una vez que ambas
> filosofías se hayan ejecutado en chats separados. El objeto de estudio es la
> **filosofía**, no la calidad de implementación.

## Enfoque
Comparar Marco Estructural vs SpecOps por **filosofía, objetivo y modelo de
trabajo**. NO evaluar cuál está "mejor hecho", ni auditar bugs, ni deuda técnica
salvo cuando revele una diferencia filosófica.

## 8 ejes a analizar
1. **Propósito central** — ¿qué problema resuelve? ¿qué promete? ¿qué relación humano-IA propone?
2. **Filosofía de trabajo** — ¿qué prioriza (velocidad, orden, control, trazabilidad, progresividad…)? ¿qué es "trabajar bien"?
3. **Modelo mental** — ¿el usuario opera comandos, skills, agentes, documentos, decisiones, estados? ¿cuál es la unidad principal?
4. **Flujo esperado** — ¿cómo empieza la sesión? ¿cuándo se documenta/decide/implementa? ¿qué se lee siempre vs bajo demanda?
5. **Rol de la documentación** — ¿upfront o progresiva? ¿memoria, contrato, guía, fuente de verdad? ¿qué tiene autoridad?
6. **Rol de la IA** — ¿ejecutor, copiloto, arquitecto, auditor, router, roles? ¿qué libertad tiene? ¿qué la frena?
7. **Diferencias profundas** — ¿dónde se parecen pero piensan distinto? ¿mismos nombres para ideas distintas? ¿tensiones reales?
8. **Evolución probable** — ¿hacia dónde tendería cada uno? ¿SpecOps es reformulación, simplificación, maduración o cambio de paradigma?

## Formato de respuesta (en este orden)
1. **Síntesis** breve de cada repo en una frase.
2. **Cuadro comparativo** por dimensiones filosóficas (ver dimensiones abajo).
3. **Explicación narrativa** de las diferencias más importantes.
4. **"Qué conserva"** un sistema del otro y **"qué abandona"**.
5. **Riesgos filosóficos** de cada enfoque.
6. **Cierre**: cuál parece más alineado con el objetivo de *instalar un sistema que
   asista el desarrollo con IA de forma progresiva, trazable y usable en proyectos reales*.

## Reglas (estrictas)
- No juzgar calidad.
- No premiar cantidad de documentación.
- No penalizar desorden histórico salvo que revele filosofía.
- Si hago una inferencia, **marcarla explícitamente como inferencia**.
- Usar **paths completos** al citar ejemplos.

## Dimensiones del cuadro comparativo (las del PDF)
Pregunta central · Problema que resuelve · Unidad central · Modelo mental del
usuario · Rol de la IA · Autoridad del sistema · Grado de libertad de la IA · Qué
frena a la IA · Documentación · Trazabilidad · Exploración · Resolución de
conflictos · Calidad · Stack · Portabilidad · Cuándo se documenta · Qué se lee
siempre · Inicio de sesión · Identidad del sistema.

## Insumo adicional (este experimento)
Cuando vuelvas a este chat tras ejecutar ambas filosofías en chats separados,
el análisis se enriquecerá con la **evidencia empírica** de haber arrancado la
misma app desde cero (mismo objetivo neutro; respuestas equivalentes según
`GUION-RESPUESTAS.md`) bajo cada una: discovery, artefactos, fricción y, sobre todo,
el contraste de cierre (SpecOps auto-certifica PASS; el gate del Marco exige firma
humana). Eso alimenta el eje 7 (diferencias profundas) y el cierre.
