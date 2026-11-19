---
paths:
  - "src/db/**/*.ts"
  - "src/features/**/*.repository.ts"
---

# Reglas de base de datos

- Hay un solo `pool` y sale de `src/db/db.ts`. Nadie mas crea conexiones.
- Las tablas se crean en `initDb` con `CREATE TABLE IF NOT EXISTS public.<tabla>`. Ahi nunca se hace `DROP`.
- Llaves con `UUID PRIMARY KEY DEFAULT gen_random_uuid()`, salvo `events` y `products` que usan `TEXT` para conservar los ids de ejemplo (`evt-1`, `prod-1`).
- Llaves foraneas con `ON DELETE CASCADE` cuando el hijo no tiene sentido sin el padre (guardados, asistencias, tickets).
- Los estados son `TEXT` con `CHECK` (`status IN ('live', 'open', 'almost-full', 'closed')`).
- Todas las consultas son parametrizadas (`$1`, `$2`). Solo se mete con `${}` una lista de columnas escrita a mano, nunca algo que mande el usuario.
- Las columnas van en snake_case y se devuelven en camelCase con `AS "camelCase"`.
- Si la respuesta lleva un objeto adentro (el ticket de un evento, el producto de un pago, el usuario de una actividad) se arma con `json_build_object` en la misma consulta, sin hacer una consulta por cada fila.
- Si la consulta tiene pasos, se usa un CTE (`WITH ... AS`) en vez de varias consultas desde el codigo, como en las estadisticas o los guardados.
- Si se escriben dos tablas que deben quedar juntas se usa `withTransaction` (crear evento con su ticket, check in con su actividad).
- Las lecturas de una fila devuelven `T | undefined` y los borrados devuelven `boolean`; el service decide si eso es un `404`.
