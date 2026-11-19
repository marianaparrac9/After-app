---
name: agregar-componente
description: Crea un componente reutilizable en el cliente de After dentro de su propia carpeta. Usalo cuando una parte de la pantalla se repite o es lo bastante grande para separarla.
---

# Agregar un componente

Argumento: el nombre y que muestra (ej. `RatingStars: muestra de 1 a 5 estrellas`).

1. Lee `.claude/rules/componentes.md` y un componente parecido (`components/EmptyState/EmptyState.tsx`).
2. Si ya existe uno que sirva, reutilizalo en vez de crear otro.
3. Crea `components/<Nombre>/<Nombre>.tsx` (o `components/admin/<Nombre>/<Nombre>.tsx` si es del panel).
4. Tipa los props con una interface y usa callbacks `onX(dato)`.
5. Si necesita estilos, agregalos en `app/globals.css` (o `app/admin/admin.css`) con los colores que ya existen.
6. Corre `npm run typecheck`.
