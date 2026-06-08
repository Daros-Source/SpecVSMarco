---
id: product-vision
type: vision
---

# Visión del producto — To-Do List

## Problema

Una persona necesita un lugar para anotar tareas pendientes, marcar las que ya
hizo y borrar las que ya no le sirven. Hoy lo resuelve con papel, notas sueltas o
la memoria, lo que provoca olvidos y falta de una vista única de lo que falta.

> Nota de contexto: este producto es deliberadamente trivial. Su propósito real
> es servir de banco de pruebas para comparar la metodología SpecOps contra Marco
> Estructural (ver `../../../SHARED-BRIEF.md`).

## Usuarios

Un único usuario individual. No hay cuentas, ni roles, ni colaboración. La persona
abre la app y ve *su* lista global de tareas.

## Valor

Tener en un solo lugar, siempre disponible y persistente, la lista de lo que hay
que hacer: agregar en segundos, marcar como hecho con un clic y eliminar lo que
sobra. Reduce la carga mental de "tener que acordarse".

## Fuera de alcance

- Autenticación, multiusuario, roles o compartir listas.
- Edición del título de una tarea ya creada.
- Filtros, búsqueda, orden manual, drag & drop.
- Fechas de vencimiento, recordatorios, prioridades, etiquetas.
- Sincronización offline, apps nativas, notificaciones.

## Supuestos

- Un único listado global basta (no hay proyectos ni categorías).
- Supabase como backend gestionado es aceptable (no se requiere servidor propio).
- Al no haber autenticación, la tabla es de acceso público vía clave anónima —
  aceptable para el propósito experimental. Si esto se invalidara (uso real),
  cambiaría la visión y exigiría una decision de seguridad nueva.
