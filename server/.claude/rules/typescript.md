---
paths:
  - "src/**/*.ts"
---

# Reglas de TypeScript del server

- Modo `strict` y CommonJS: los imports van sin extension (`import { pool } from "../../db/db";`).
- Sin `any` ni `@ts-ignore`. Si algo llega sin tipo se usa `unknown` y se revisa antes de usarlo.
- Funciones flecha exportadas por nombre: `export const createEventService = async (...) => {}`. Nada de `export default`, solo `app.ts` lo usa.
- Tipar parametros y retorno de todo lo que se exporta.
- Nombres en ingles con el formato `<verbo><Entidad><Capa>`: `getEventsRepository`, `checkInService`, `saveEventController`.
- Comillas dobles, punto y coma y 2 espacios, igual que el resto del proyecto.
- Sin comentarios en el codigo.
- `process.env` solo se lee en `src/config/config.ts`.
- Al terminar: `npm run typecheck` sin errores.
