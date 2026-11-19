---
paths:
  - "src/features/**/*.ts"
  - "src/app.ts"
---

# Reglas de las capas

Cada feature vive en `src/features/<feature>/` con cinco archivos y el flujo va siempre en una sola direccion: router → controller → service → repository.

- **Router** (`<feature>.router.ts`): solo une el verbo y la ruta con su controller. Exporta `router`. Las rutas privadas llevan `authMiddleware` en cada ruta, y las de admin ademas `adminMiddleware`. Cada controller va envuelto en `asyncHandler` porque el server usa Express 4.
- **Controller** (`<feature>.controller.ts`): lee `req`, valida lo que llega y responde con el status correcto (`201` crear, `200` leer o editar, `204` borrar). Saca el usuario con `getUserFromRequest(req)`, nunca con `req.user!`. Llama a un solo service. Si la validacion es larga va en `<feature>.validation.ts`.
- **Service** (`<feature>.service.ts`): las reglas del negocio. Decide si algo existe, si es del usuario, si el evento esta lleno o cerrado. Lanza errores de Boom (`notFound`, `conflict`, `forbidden`). Emite los eventos en vivo. Nunca toca `req` ni `res`. Puede llamar al service de otra feature, nunca a su repository.
- **Repository** (`<feature>.repository.ts`): el unico que escribe SQL. Devuelve filas tipadas y no lanza errores HTTP.
- **Types** (`<feature>.types.ts`): interfaces de la feature y los `DTO` que recibe el service.
- Toda feature nueva se monta en `src/app.ts` con `apiRouter.use("/<ruta>", <feature>Router)`, antes de `errorsMiddleware`.
- Si algo es de un usuario se filtra siempre por `user_id`. Si no es suyo responde `404`, no `403`.
