---
name: emitir-evento
description: Hace que el backend de After avise un cambio en vivo por Supabase Realtime (por ejemplo cuando cambia el aforo o se crea algo). Usalo cuando el cliente deba enterarse de un cambio sin recargar.
---

# Emitir un evento en vivo

Argumento: que cambio se debe avisar (ej. `cuando se compra un ticket`).

1. Lee `.claude/rules/tiempo-real.md` y `src/config/realtime.ts`.
2. Elige el canal: `EVENTS_CHANNEL` si cambia un evento, `ACTIVITY_CHANNEL` si es algo que el admin ve en la actividad. Si no encaja en ninguno, agrega una constante nueva en `realtime.ts`.
3. En el service, despues de guardar en la base de datos, llama `broadcast(canal, "nombre-en-pasado", payload)` sin `await`.
4. El payload es el mismo objeto que devuelve el endpoint.
5. Corre `npm run typecheck`.
6. Dile al usuario el canal, el nombre del evento y la forma del payload, para escucharlo en el provider del cliente.
