# After

Cliente y servidor van en carpetas separadas.

- `client`: Next.js, React, TypeScript, Axios y Context
- `server`: Express, TypeScript, 4 capas y `data.mock.ts`

El servidor solo tiene GET. No hay Firebase ni Supabase.

## Como correrlo en local

1. Instala Node.js 18 o superior.
2. En la terminal:

```bash
npm run install:all
npm install
npm run dev
```

3. Abre `http://localhost:3000`
4. El servidor queda en `http://localhost:4000`

## Usuario de prueba

`laura.gomez@after.app` / `After123!`

## Variables

Copia `client/.env.example` a `client/.env.local` y `server/.env.example` a `server/.env`.

- Cliente: `NEXT_PUBLIC_API_URL=http://localhost:4000`
- Servidor: `PORT=4000` y `CLIENT_ORIGIN=http://localhost:3000`

## Despliegue en Vercel

Hay que crear dos proyectos separados:

1. Proyecto Server: carpeta `server`. Variable `CLIENT_ORIGIN` con la URL del cliente.
2. Proyecto Client: carpeta `client`. Variable `NEXT_PUBLIC_API_URL` con la URL publica del server.

En produccion el cliente no puede usar localhost.

## Endpoints GET

- `/api/products` y `/api/products/:id`
- `/api/clients` y `/api/clients/:id`
- `/api/payments` y `/api/payments/:id`
