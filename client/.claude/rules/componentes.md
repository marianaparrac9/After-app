---
paths:
  - "components/**/*.tsx"
  - "app/**/*.tsx"
---

# Reglas de componentes y paginas

- Un componente por archivo y cada uno en su carpeta: `components/<Nombre>/<Nombre>.tsx`, exportado por nombre (`export const EmptyState = () => {}`).
- Si usa estado, efectos o eventos del navegador empieza con `"use client";`.
- Los props se tipan con una interface arriba del componente. Los callbacks se llaman `onX` y reciben el dato, no el evento del DOM: `onDelete(id)`, no `onDelete(e, id)`.
- Los componentes muestran y componen; los datos salen de un provider con su hook (`useEvents`, `useSaved`). No llaman a `api` directo.
- Las paginas en `app/` son delgadas: arman providers y componentes, sin logica de negocio.
- Toda pagina privada va dentro de `PrivateRoute`. Las del admin quedan protegidas por `AdminState` con `role="admin"`.
- Siempre se ven los tres estados: cargando (`Loader`), vacio (`EmptyState`) y error.
- Los botones se desactivan mientras hay una peticion y cambian su texto (`Saving...`, `Creating...`).
- Los formularios validan antes de enviar y muestran el error con `role="alert"`.
- Librerias que solo corren en el navegador (Leaflet) se cargan con `next/dynamic` y `ssr: false`.
- Sin comentarios en el codigo.
