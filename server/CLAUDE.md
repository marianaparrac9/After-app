# After server: el backend con la API

API REST de After hecha con Express 4 y TypeScript. Guarda todo en PostgreSQL de Supabase, maneja el login con Supabase Auth y avisa los cambios en vivo con Supabase Realtime. El cliente que la consume esta en `../client`.

## Comandos

- Instalar: `npm install`
- Correr en local: `npm run dev` (queda en `http://localhost:4000`)
- Crear tablas y datos de ejemplo: `npm run db:init`
- Revisar tipos: `npm run typecheck`

## Estructura

- `src/app.ts`: arma la app de Express, monta todos los routers bajo `/api` y pone el middleware de errores al final. No hace `listen` para que Vercel lo pueda usar.
- `src/index.ts`: corre `initDb` y prende el server en local.
- `src/config/`: `config.ts` es el unico que lee `process.env`. `supabase.ts` crea el cliente de Supabase. `realtime.ts` tiene la funcion `broadcast` y los nombres de los canales.
- `src/db/`: `db.ts` tiene el `pool` de Postgres, `withTransaction` e `initDb`. `seed.ts` tiene los eventos y tickets de ejemplo.
- `src/middlewares/`: `authMiddleware.ts` (valida el token y saca el rol), `adminMiddleware` (solo admins) y `errorsMiddleware.ts` (convierte errores de Boom en JSON).
- `src/shared/types.ts`: tipos que usan varias features (`AuthUser`, `Role`).
- `src/features/<feature>/`: cada feature tiene `router`, `controller`, `service`, `repository` y `types`.

## Features que existen

| Feature | Para que es |
|---------|-------------|
| `auth` | registro, login, refresh del token y `me` |
| `events` | listar, ver, crear, editar y borrar eventos, y estadisticas del admin |
| `saved` | eventos guardados por cada usuario |
| `attendance` | check in y check out, mueve el aforo y deja la actividad para el admin |
| `products` | tickets de cada evento |
| `payments` | compra de tickets del usuario |

## Endpoints

- Publicos: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`.
- Con token: `GET /api/auth/me`, `GET /api/events`, `GET /api/events/:id`, `GET|POST|DELETE /api/saved/...`, `GET /api/attendance/:eventId`, `POST /api/attendance/:eventId/check-in`, `POST /api/attendance/:eventId/check-out`, `GET /api/products...`, `GET|POST /api/payments...`.
- Solo admin: `GET /api/events/stats`, `POST /api/events`, `PATCH /api/events/:id`, `DELETE /api/events/:id`, `GET /api/attendance/activity`.

## Eventos en vivo

- Canal `events`: `event-created`, `event-updated`, `event-deleted`.
- Canal `activity`: `activity-created`.
- Siempre los emite el service despues de guardar en la base de datos.

## Convenciones

- Nombres en ingles, mensajes de error en ingles y cortos.
- Sin comentarios en el codigo.
- Comillas dobles y punto y coma, como el resto del server.
- Nunca leer ni editar `.env`; si se agrega una variable, va en `config.ts` y en `.env.example`.
- Las reglas de cada tipo de archivo estan en `.claude/rules/` y se cargan solas segun el archivo que se edite.

## Antes de dar una tarea por terminada

1. `npm run typecheck` sin errores.
2. Probar el endpoint nuevo con y sin token.
3. El agente `code-reviewer` dice APROBADO.

## Flujo para agregar una feature

1. `feature-planner`: arma el plan (tabla, endpoints, quien puede usarlos y eventos en vivo). No escribe codigo.
2. `backend-writer`: escribe los archivos de la feature y la monta en `app.ts`.
3. `code-reviewer`: revisa y da el veredicto.

El skill `/agregar-feature` describe este flujo. Para cosas puntuales estan `/agregar-tabla` y `/emitir-evento`.
