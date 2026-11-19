---
name: agregar-provider
description: Crea un provider nuevo en el cliente de After para una feature (estado, llamadas a la API y escucha en vivo). Usalo cuando una pantalla necesite datos nuevos del server.
---

# Agregar un provider

Argumento: la feature y los endpoints que usa (ej. `reviews: GET /api/reviews, POST /api/reviews`).

1. Lee `CLAUDE.md`, `.claude/rules/providers.md` y `contexts/SavedProvider.tsx` como ejemplo.
2. Agrega los tipos que devuelve la API en `shared/models.ts`.
3. Crea `contexts/<Feature>Provider.tsx` con su interface, su estado, su carga inicial y sus acciones con estado de carga y toasts.
4. Si el server emite eventos en vivo para esta feature, escuchalos en un `useEffect` y limpia el canal al salir.
5. Exporta el hook `use<Feature>` y monta el provider en `components/Providers/Providers.tsx` (o en `contexts/admin/AdminState.tsx` si es del admin).
6. Corre `npm run typecheck`.
