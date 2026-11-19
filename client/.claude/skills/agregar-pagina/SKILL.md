---
name: agregar-pagina
description: Crea una pantalla nueva en el cliente de After, protegida y con sus estados de carga, vacio y error. Usalo cuando pidan una ruta nueva en la app del usuario o en el panel del admin.
---

# Agregar una pagina

Argumento: la ruta y lo que debe mostrar (ej. `/tickets: lista de mis tickets`).

1. Lee `CLAUDE.md` y `.claude/rules/componentes.md`.
2. Crea `app/<ruta>/page.tsx` con `"use client";`.
3. Si es del usuario envuelvela en `PrivateRoute`; si va en `app/admin/` ya queda protegida por `AdminState`.
4. Saca los datos del provider con su hook; si no existe, usa primero `/agregar-provider`.
5. Muestra `Loader` mientras carga, `EmptyState` si no hay datos y el error si algo falla.
6. Si es una pantalla principal del usuario, agregala al `BottomNav`.
7. Corre `npm run typecheck`.
