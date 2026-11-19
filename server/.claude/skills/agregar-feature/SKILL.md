---
name: agregar-feature
description: Agrega una feature nueva al backend de After (por ejemplo calificaciones de eventos o cupones) con sus cinco archivos, su tabla y sus eventos en vivo, orquestando feature-planner, backend-writer y code-reviewer. Usalo cuando pidan un endpoint o recurso nuevo en el server.
---

# Agregar una feature al server

Argumento: lo que debe hacer la feature (ej. `reviews: los usuarios califican un evento`).

Los agentes no se llaman entre si: tu los lanzas **uno a la vez y en este orden**:

1. **`feature-planner`**: pasale la descripcion. Guarda su plan (tabla, endpoints, quien puede usarlos, errores y eventos en vivo). Si la feature ya existe o el plan tiene supuestos importantes, preguntale al usuario antes de seguir.
2. **`backend-writer`**: pasale el plan completo. Escribe la tabla en `initDb`, los cinco archivos de la feature y la monta en `src/app.ts`.
3. **`code-reviewer`**: pidele revisar la feature contra el plan y las reglas.

Despues:

- Si el revisor responde CAMBIOS REQUERIDOS, pasale los bloqueantes a `backend-writer` y repite el paso 3 (maximo 2 vueltas).
- Termina solo cuando el revisor diga APROBADO y `npm run typecheck` pase.
- Si la feature emite eventos en vivo, avisale al usuario que falta escucharlos en el provider del cliente.

Al final resume: endpoints nuevos, tabla creada, eventos en vivo y veredicto del revisor.
