# Guion de respuestas — uso PRIVADO del evaluador

> ⚠️ **Este archivo NO se pega ni se copia a los chats de construcción.** Vive solo
> en el hub de análisis. Su función es que, cuando cada framework te entreviste
> (discovery), **respondas igual en ambos chats** → los runs quedan comparables sin
> revelarles que están siendo evaluados. Si un framework pregunta algo y el otro no,
> *esa diferencia es justamente el dato a observar*.

---

## 1. Arranque idéntico en ambos chats (esto SÍ lo escribes)

Pega **exactamente esta frase** como primer mensaje de tarea, en los dos chats, sin
agregar stack, contrato de datos ni alcance:

> **"Quiero armar una app simple para gestionar mis tareas pendientes. Guíame vos."**

(En el chat de SpecOps va después de `/spec`; en el de Marco, después de iniciar la
sesión del Marco.) No menciones que hay otro chat, ni comparación, ni "experimento".

---

## 2. Respuestas consistentes (solo si te preguntan)

Contesta esto **únicamente cuando el framework lo pida**. No lo ofrezcas de entrada.

| Si pregunta por… | Respondés |
|------------------|-----------|
| Tipo de usuario / quién la usa | Una sola persona, uso personal. Sin login, sin multiusuario, sin roles. |
| Alcance / qué debe hacer | Crear una tarea, verlas en lista, marcarla como completada y eliminarla. Nada más. |
| Qué queda afuera | Editar título, filtros, búsqueda, fechas, prioridades, etiquetas, login, sync, notificaciones. |
| Stack / tecnología | Si te dejan elegir o proponen: **React + TypeScript** en frontend. Si insisten en backend/datos: **Supabase**. Si proponen otra cosa razonable, aceptá lo que el framework recomiende (y anotá qué propuso). |
| Persistencia / base de datos | Sí, que se guarden (Supabase si preguntan cómo). |
| Modelo de datos de una tarea | Un título de texto (obligatorio), si está completada (sí/no), y cuándo se creó. |
| Orden de la lista | Primero las no completadas; dentro de cada grupo, las más recientes arriba. |
| Validaciones | El título no puede quedar vacío. |
| Estados de pantalla | Que muestre cargando, error (con reintento), vacío y la lista con datos. |
| Cuándo está "terminada" | Cuando puedo crear, listar, completar y borrar tareas y la app compila/corre. |
| Datos sensibles / seguridad | No hay datos sensibles; es de uso personal. |
| Equipo / horizonte / plazos | Una sola persona, proyecto chico y corto. |

> Regla de oro: **respondé lo mínimo y lo mismo en ambos.** Si te empuja a decidir
> algo no listado acá, elige la opción más simple y **anótalo** para contarlo después
> (qué te preguntó, qué decidiste).

---

## 3. Qué anotar de cada run (para el análisis posterior)

Lleva nota en cada chat de:

1. **Cómo arrancó** la sesión (qué leyó/precargó, qué te dijo primero).
2. **Qué te preguntó y en qué orden** (y qué NO te preguntó).
3. **Cuándo documentó, cuándo decidió, cuándo construyó.**
4. **Qué artefactos generó** (archivos, decisiones, evidencias, gates).
5. **Cómo cerró**: ¿pidió tu aprobación?, ¿hubo un gate?, ¿quedó bloqueado o cerrado?
6. **Fricción**: dónde te frenó, qué te obligó a hacer, qué se sintió natural.

Con esas notas redactamos el análisis en este hub siguiendo `INSTRUCCION-ANALISIS.md`.
