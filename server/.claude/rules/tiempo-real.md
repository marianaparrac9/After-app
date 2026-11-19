---
paths:
  - "src/config/realtime.ts"
  - "src/features/**/*.service.ts"
---

# Reglas de tiempo real

- Se usa Supabase Realtime con broadcast. La funcion `broadcast(canal, evento, payload)` esta en `src/config/realtime.ts`.
- Solo el service emite, y solo despues de que la base de datos guardo bien.
- No se espera el `broadcast` con `await` y si falla no rompe la peticion: solo se escribe el error en consola.
- Canales: `EVENTS_CHANNEL` (`events`) para cambios de eventos y `ACTIVITY_CHANNEL` (`activity`) para la actividad del admin.
- Nombres de evento en kebab-case y en pasado: `event-created`, `event-updated`, `event-deleted`, `activity-created`.
- El payload es el mismo objeto que devuelve la API (el evento completo o la actividad completa). Para borrar se manda solo `{ id }`.
- Si se agrega un evento nuevo hay que avisarle al cliente: el provider que lo escucha esta en `client/contexts`.
