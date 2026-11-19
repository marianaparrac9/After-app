---
name: agregar-tabla
description: Agrega una tabla nueva a la base de datos de After en initDb y su repository. Usalo cuando una feature necesite guardar algo nuevo en Supabase.
---

# Agregar una tabla

Argumento: el nombre de la tabla y sus columnas.

1. Lee `.claude/rules/base-de-datos.md` y `src/db/db.ts`.
2. Agrega el `CREATE TABLE IF NOT EXISTS public.<tabla>` dentro de `createTables`, despues de las tablas de las que depende.
3. Si la tabla es de un usuario, pon `user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE` y un indice si se va a buscar seguido por esa columna.
4. Si necesita datos de ejemplo, agregalos en `src/db/seed.ts` con `ON CONFLICT (id) DO NOTHING`.
5. Crea el repository con la lista de columnas en una constante y los alias en camelCase.
6. Corre `npm run typecheck` y despues `npm run db:init` para crear la tabla en Supabase.

No borres ni cambies tablas que ya existen. Si hace falta cambiar una, escribe el `ALTER TABLE` y muestraselo al usuario antes de correrlo.
