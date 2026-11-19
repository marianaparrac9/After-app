# After

App para descubrir eventos de noche en Cali y ver en vivo que tan llenos estan. Tiene una app para el usuario y un panel para el administrador del evento.

El proyecto esta dividido en dos carpetas y cada una tiene su propio `CLAUDE.md` y su carpeta `.claude/` con reglas, skills y agentes:

- `server/`: el backend con la API (Express, TypeScript, PostgreSQL de Supabase, Supabase Auth y Supabase Realtime). Ver `server/CLAUDE.md`.
- `client/`: la app web (Next.js, React, Axios y Context). Ver `client/CLAUDE.md`.

Cuando la tarea es solo del backend se trabaja dentro de `server/`, y cuando es solo de la app dentro de `client/`. Lo que diga el `CLAUDE.md` de cada carpeta manda sobre esta raiz.

## Como se conectan

1. El cliente llama a la API con axios (`NEXT_PUBLIC_API_URL`) y manda el token de Supabase en cada peticion.
2. El server valida el token con `authMiddleware`, guarda en Supabase y responde.
3. Cuando algo cambia (un evento nuevo, alguien entra o sale), el server lo avisa por Supabase Realtime en los canales `events` y `activity`.
4. Los providers del cliente estan escuchando esos canales y actualizan la pantalla sin recargar.

## Comandos desde la raiz

- `npm run install:all`: instala server y client.
- `npm run dev`: prende los dos al tiempo (server en `4000`, client en `3001`).

## Harness

- `.claude/` en esta raiz es el harness base de la clase (`fullstack-harness`): agentes, skills, reglas y documentacion general para proyectos con `client/` y `server/`.
- `server/.claude/` y `client/.claude/` son ese mismo harness adaptado a After: sus reglas, sus skills (`/agregar-feature`, `/agregar-tabla`, `/emitir-evento`, `/agregar-provider`, `/agregar-componente`, `/agregar-pagina`) y sus agentes.
- Si una regla de la raiz no coincide con el proyecto (por ejemplo Express 5 o Tailwind), se sigue la de la carpeta.

## Convenciones de todo el proyecto

- Nombres de codigo y textos de la app en ingles.
- Sin comentarios en el codigo.
- Nunca leer ni editar archivos `.env`; los cambios de variables van en los `.env.example`.
- Los secretos solo viven en el server. El cliente solo usa variables `NEXT_PUBLIC_`.

## Antes de dar una tarea por terminada

1. `npm run typecheck` sin errores en cada carpeta que se toco.
2. Probar el cambio con un usuario y con un admin.
3. El `code-reviewer` de la carpeta dice APROBADO.
