# After

Cliente y servidor van en carpetas separadas.

- `client`: Next.js, React, TypeScript, Axios y Context
- `server`: Express, TypeScript, capas por feature y PostgreSQL en Supabase

## Que tiene

- Login, registro y refresh del token con Supabase Auth desde el servidor
- Middleware de auth y de admin en todas las rutas privadas
- Eventos, guardados, asistencia (check in y check out), tickets y pagos guardados en la base de datos
- Tiempo real con Supabase Realtime: el servidor emite y los providers del cliente escuchan
- App de usuario y panel de administrador

## Como correrlo en local

1. Instala Node.js 20 o superior.
2. Copia `server/.env.example` a `server/.env` y `client/.env.example` a `client/.env.local` y llena los datos de Supabase.
3. En la terminal:

```bash
npm run install:all
npm install
npm run db:init --prefix server
npm run dev
```

4. Abre `http://localhost:3001`
5. El servidor queda en `http://localhost:4000`

La primera vez `db:init` crea las tablas y carga los eventos de ejemplo.

## Variables

Servidor (`server/.env`):

- `PORT`: puerto del servidor
- `CLIENT_ORIGIN`: url del cliente para CORS, se pueden poner varias separadas por coma
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: conexion al pooler de Supabase
- `SUPABASE_URL` y `SUPABASE_KEY`: proyecto de Supabase

Cliente (`client/.env.local`):

- `NEXT_PUBLIC_API_URL`: url del servidor
- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: para escuchar los eventos en vivo

## Endpoints

Publicos:

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`

Con token:

- `GET /api/auth/me`
- `GET /api/events` y `GET /api/events/:id`
- `GET /api/saved`, `POST /api/saved/:eventId`, `DELETE /api/saved/:eventId`
- `GET /api/attendance/:eventId`, `POST /api/attendance/:eventId/check-in`, `POST /api/attendance/:eventId/check-out`
- `GET /api/products` y `GET /api/products/:id`
- `GET /api/payments`, `GET /api/payments/:id`, `POST /api/payments`

Solo admin:

- `GET /api/events/stats`
- `POST /api/events`, `PATCH /api/events/:id`, `DELETE /api/events/:id`
- `GET /api/attendance/activity`

## Eventos en vivo

Canal `events`: `event-created`, `event-updated`, `event-deleted`

Canal `activity`: `activity-created`

## Despliegue en Vercel

Hay que crear dos proyectos separados:

1. Proyecto Server: carpeta `server` con todas las variables del servidor. `CLIENT_ORIGIN` con la url del cliente.
2. Proyecto Client: carpeta `client`. `NEXT_PUBLIC_API_URL` con la url publica del server.

En produccion el cliente no puede usar localhost.
