---
paths:
  - "contexts/**/*.tsx"
  - "hooks/**/*.ts"
---

# Reglas de providers y hooks

- Un provider por tema: usuario y sesion en `AuthProvider`, y uno por cada feature (`EventsProvider`, `SavedProvider`, `TicketsProvider`).
- Cada provider tiene una interface con todo lo que entrega y un hook `useX` que lanza error si se usa fuera del provider.
- Los providers del usuario solo cargan datos si hay sesion con `role === "user"`; los del admin solo si `role === "admin"`.
- Las llamadas a la API usan `useAxios()` y los errores se convierten con `getErrorMessage`.
- Cada accion tiene su estado de carga (`loading`, `creating`, `deletingId`, `savingId`, `buying`) puesto en `try/finally`.
- Los mensajes al usuario salen con `showToast` de `ToastProvider`.
- Para escuchar en vivo: `supabase.channel(...).on("broadcast", ...)` dentro de un `useEffect`, y en la limpieza siempre `supabase.removeChannel(channel)`.
- Los cambios en vivo se aplican sin duplicar: se usa `upsertEvent` y `removeEvent` de `lib/eventList.ts`, comparando por `id`.
- Los hooks de `hooks/` son para logica de una sola pantalla (`useAttendance`). Lo que comparten varias pantallas va en un provider.
- Sin comentarios en el codigo.
