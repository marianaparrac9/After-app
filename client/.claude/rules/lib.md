---
paths:
  - "lib/**/*.ts"
  - "shared/**/*.ts"
---

# Reglas de lib y shared

- `lib/config.ts` es el unico que lee `process.env`, y solo variables `NEXT_PUBLIC_`.
- `lib/axios.ts` exporta una sola instancia `api`. El token se pone en el interceptor de peticion y el refresh en el interceptor de respuesta; no se pone a mano en cada llamada.
- `lib/storage.ts` es el unico que toca `localStorage` para la sesion.
- `lib/supabase.ts` exporta un solo cliente con la llave publica y los nombres de los canales.
- `lib/errors.ts` exporta `getErrorMessage(error)` para mostrar errores al usuario.
- En `lib/` no se importa React: se puede usar desde providers, hooks y pantallas.
- `shared/models.ts` tiene los tipos que devuelve la API. Si el server cambia una respuesta, se cambia aqui tambien.
- Nunca se ponen secretos del server en el cliente.
- Sin comentarios en el codigo.
