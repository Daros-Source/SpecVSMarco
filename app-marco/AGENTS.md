# AGENTS.md — Proyecto Vozdigital
# Este archivo es leido automaticamente por agentes compatibles con AGENTS.md al abrir el proyecto.

## Marco Estructural

Este proyecto usa el **Marco Estructural de Vozdigital** para gobernanza de desarrollo.

**Fuente canonica (GitHub):** https://github.com/vozdigitalCL/marco_estructural
**Copia local:** `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural`

## Sincronizacion obligatoria

`AGENTS.md` y `CLAUDE.md` deben mantenerse sincronizados.
Todo cambio en uno DEBE registrarse tambien en el otro dentro del mismo commit.

---

## ⚠️ PRE-FLIGHT OBLIGATORIO — ejecutar SIEMPRE antes de responder al primer mensaje

> **No es guia, es procedimiento.** Si el agente saltea este pre-flight está operando con
> contexto desactualizado y va a generar drift documental. Origen del cambio:
> Marco Estructural DEC-HOOKS-002 (supersede DEC-HOOKS-001).

Al inicio de cada sesión, **ANTES de responder al primer mensaje del usuario**,
ejecutar este bloque Bash:

```bash
bash .claude/hooks/drift-audit.sh --inform
```

Eso imprime:
- Última DEC del repo principal y de los repos secundarios (si el proyecto es multi-repo)
- TDs marcadas "abierto, prioritario Fase X" que pueden estar obsoletas
- Fases marcadas EN CURSO en `roadmap.md` para verificar contra el código real

Si el audit reporta drift, **arreglarlo ANTES de aceptar tareas nuevas del usuario**.
La regla del Marco "si el agente detecta drift, debe corregirlo" es procedural, no
opcional.

---

## ⚠️ ENFORCEMENT AUTOMATICO — hooks de `.claude/settings.json`

Los hooks de `.claude/settings.json` aplican cuando el agente corre en harness Claude Code.
Si el agente corre en otro harness (Codex CLI, Cursor, etc.), las reglas de hooks no se
ejecutan automáticamente, pero **el agente debe respetar el espíritu equivalente**:
ejecutar `drift-audit.sh --strict` antes de cada `git push origin <branch_protected>`
y reaccionar a su exit code.

| Hook (Claude Code) | Trigger | Comportamiento | Equivalente manual (otros agentes) |
|--------------------|---------|----------------|------------------------------------|
| `PreToolUse` (Bash) | comando matchea `git push.*origin <branch_protected>` | ejecuta `drift-audit.sh --strict`. Si exit 2, push BLOQUEADO. | el agente ejecuta `bash .claude/hooks/drift-audit.sh --strict` antes del push |
| `Stop` | fin de sesión | ejecuta `drift-audit.sh --inform`. No bloquea, deja warning visible. | el agente ejecuta `bash .claude/hooks/drift-audit.sh --inform` antes de declarar la sesión cerrada |

Branches protegidos por default: `main`, `master`. Configurables en
`.claude/hooks/pre-push-check.sh`.

Los scripts viven en `.claude/hooks/`:
- `drift-audit.sh` — detector de drift (config-based, lee `.claude/marco.config.json`)
- `pre-push-check.sh` — wrapper PreToolUse Bash (Claude Code only)
- `session-end-audit.sh` — wrapper Stop (Claude Code only)
- `marco.config.json.example` — template de configuración para multi-repo

Si necesitás cambiar el comportamiento, editá el script o el config. NO desactives el hook
ni ignores los scripts si corrés sin hooks.

---

### Paso 0: Leer el manifiesto del proyecto

Si existe `project.manifest.json` en la raiz del proyecto, leerlo PRIMERO.
Contiene: stack, capabilities, perfil documental, repositorio y metadata del proyecto.
Usar estos datos para precargar SESSION_CONTEXT sin preguntar al usuario.

Si NO existe `project.manifest.json`, ejecutar el protocolo completo de inicializacion
del Marco Estructural (Paso 1-5 de AGENTS.md maestro).

### Instruccion para el agente

**Antes de hacer cualquier tarea**, leer y ejecutar el protocolo de inicializacion
del Marco Estructural:

1. **Leer** `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/AGENTS.md` (protocolo de inicializacion y dispatch table)
   - Si el path local no existe, clonar: `git clone https://github.com/vozdigitalCL/marco_estructural.git C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural`
2. **Leer** `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/principles.md` (principios arquitectonicos)
3. **Leer** el archivo de stack relevante de `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/stack/`
   (segun stack[] del manifest o SESSION_CONTEXT)
4. **Leer** `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/contracts/security.md` cuando aplique segun dispatch table

### Orquestador de debate

El orquestador vive en `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/orchestrator/orchestrator.py`.

**OBLIGATORIO: Usar modo --step desde Claude Code (nunca --no-interactive).**

```bash
# Debate arquitectonico (ANTES de implementar)
python C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/orchestrator/orchestrator.py \
  --mode architect --step init \
  --topic "Descripcion de la mejora" \
  --transport cli \
  --local-dir . \
  --proposal "Propuesta con stack del proyecto"

# Responder a cada turno de GPT
python C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/orchestrator/orchestrator.py \
  --step respond \
  --session-id SESSION_ID \
  --transport cli \
  --response-file respuesta_claude.md

# Obtener veredicto final
python C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/orchestrator/orchestrator.py \
  --step finalize \
  --session-id SESSION_ID \
  --transport cli
```

**Transporte (v4.8 CLI-only):** `--transport cli` ($0, suscripcion). El backend se elige con
`--counterpart {codex,claude}`. La opcion API HTTP fue removida (no hay fallback API / OPENAI_API_KEY).

### Resolución de la contradicción `Skill` tool vs AGENTS.md (importante)

Si el agente corre en harness Claude Code, la tool `Skill` dice "solo invocar skill que
aparece en la lista o que el usuario tipeó como `/<name>`". En proyectos del Marco la
regla operativa es:

1. **Si la skill aparece listada en el system-reminder de la sesión**, podés invocarla
   proactivamente cuando la dispatch table imperativa lo indique. La restricción
   "solo slash command" no aplica para skills del Marco listadas — el Marco es contexto
   pre-aprobado del proyecto.
2. **Si la skill NO aparece** (porque el harness no la cargó, o porque corrés en otro
   agente que no tiene Skill tool), leé el `.md` correspondiente desde
   `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/checklists/<nombre>.md` y aplicá su contenido como checklist.

En cualquiera de los dos casos, la consecuencia operativa es la misma: cumplir el checklist.

### Checklists del Marco

Los checklists viven en `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/checklists/` y se aplican cuando la dispatch
table imperativa de abajo lo indica.

- `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/checklists/pre-merge.md` — Antes de cada merge a branch protegido
- `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/checklists/cierre-fase.md` — Al cierre de sprint/fase
- `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/checklists/security-review.md` — Cuando aplique
- `C:\Users\Dylhan\Desktop\SpecVSMarco\marco_estructural/checklists/ui-review.md` — Cuando aplique (proyectos con UI)

### Dispatch table imperativa — qué hacer ANTES y DESPUÉS de cada tipo de tarea

> Cada fila es un **imperativo procedural**, no una guía. Si la tabla dice "ANTES de X,
> hacé Y", hacelo antes de X o estás incumpliendo el Marco.

| Tipo de tarea | ANTES de implementar | Mientras implementás | DESPUÉS / antes del push |
|---|---|---|---|
| Modificar código | — | aplicar `code-rules` + stack relevante | aplicar `pre-merge` |
| Cambio de schema o migration | invocar `debate` modo architect | aplicar `code-rules` + stack/database | aplicar `pre-merge` |
| Cambio arquitectónico | invocar `debate` modo architect + registrar `decision` | aplicar `code-rules` | aplicar `pre-merge` |
| Cambios en auth, credenciales, secretos, encriptación | aplicar `security-review` ANTES también | `code-rules` + stack relevante | `security-review` + `pre-merge` |
| Nueva tecnología o dependencia mayor | `debate` modo architect + `decision` + `security-review` | — | — |
| **Cierre de fase / sprint** | `decision` (registrar la fase como cerrada) | — | **`cierre-fase` (OBLIGATORIO)** + `debate` modo reviewer |
| Ambigüedad o selección entre alternativas | invocar `decision` | — | — |
| UI relevante | — | `code-rules` + `ui-design` | `pre-merge` + `ui-review` |

### Triggers OBLIGATORIOS (no negociables)

> Si saltás estos, el push se rechaza por hook o vas a generar drift documental.
> Documentado por experiencia (DEC-HOOKS-002).

1. **ANTES de `git push origin <branch_protected>`:** `pre-push-check.sh` se ejecuta
   automáticamente (Claude Code) o el agente lo ejecuta manualmente (otros harness).
   Si reporta drift, arreglá el drift antes de pushear.

2. **ANTES de declarar "fase cerrada" / "sub-fase cerrada":** aplicar checklist
   `cierre-fase`. Eso incluye: actualizar `roadmap.md` + cerrar TDs obsoletas +
   agregar entrada en `decisions.md` del **repo principal** (no solo en repos
   de componente si el proyecto es multi-repo).

3. **ANTES de tocar código de auth, secrets, permisos, RLS, encriptación:**
   aplicar `security-review` ANTES (no después).

4. **DESPUÉS de cerrar sprint o fase:** aplicar `debate` modo reviewer.

### Contratos de este proyecto

- `contracts/constitution.md` — Reglas fundamentales del proyecto
- `contracts/blueprint.md` — Arquitectura actual del proyecto
- `contracts/roadmap.md` — Secuencia de fases
- `contracts/decisions.md` — Registro de decisiones tecnicas

### Portabilidad a otros agentes

Si se actualiza `AGENTS.md`, reflejar el mismo cambio en `CLAUDE.md`.
Ambos archivos deben permanecer alineados para mantener la portabilidad del sistema.

---

*Proyecto gobernado por el Marco Estructural de Vozdigital — www.vozdigital.net*
