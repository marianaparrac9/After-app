# After client: la app web

Frontend de After hecho con Next.js 16 (App Router), React 19, TypeScript, Axios y Context. Tiene dos apps en el mismo proyecto: la del usuario (`/home`, `/map`, `/events/...`) y el panel del administrador (`/admin/...`). Todos los datos vienen de la API en `../server`; aca no hay datos de prueba.

## Comandos

- Instalar: `npm install`
- Correr en local: `npm run dev` (queda en `http://localhost:3001`)
- Revisar tipos: `npm run typecheck`
- Build: `npm run build`

## Estructura

- `app/`: las pantallas. Cada carpeta es una ruta. `app/admin/` es el panel del administrador.
- `components/`: un componente por carpeta (`components/EmptyState/EmptyState.tsx`). Los del admin estan en `components/admin/`.
- `contexts/`: los providers con el estado y las llamadas a la API. Los del admin estan en `contexts/admin/`.
- `hooks/`: logica reutilizable que no es estado global (`useAttendance`).
- `lib/`: `config.ts` (unico que lee las variables), `axios.ts` (instancia con interceptores), `supabase.ts` (cliente para escuchar en vivo), `storage.ts` (sesion en `localStorage`), `errors.ts`, `eventList.ts`.
- `shared/models.ts`: los tipos que llegan de la API.

## Providers

| Provider | Que maneja |
|----------|-----------|
| `AxiosProvider` | entrega la instancia de axios con el token y el refresh |
| `ToastProvider` | los mensajes de exito y error |
| `AuthProvider` | usuario, login, registro, logout y sesion vencida |
| `EventsProvider` | eventos y filtros del usuario, escucha el canal `events` |
| `SavedProvider` | eventos guardados |
| `TicketsProvider` | tickets y pagos |
| `admin/EventsProvider` | eventos, estadisticas, crear, editar estado y borrar, escucha `events` |
| `admin/ActivityProvider` | actividad en vivo del admin, escucha `activity` |
| `admin/ProfileProvider` | datos del admin que inicio sesion |

## Sesion

- Al hacer login o registro se guarda en `localStorage` el usuario, el `token` y el `refreshToken`.
- `lib/axios.ts` mete el token en cada peticion. Si la API responde `401`, pide un token nuevo a `/api/auth/refresh` y repite la peticion. Si eso falla, borra la sesion y manda al login.
- Las paginas privadas van dentro de `PrivateRoute`. El panel del admin pide `role="admin"`.

## Variables

Solo variables `NEXT_PUBLIC_` y nunca secretos: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Nunca leer ni editar `.env.local`; los cambios van en `.env.example`.

## Convenciones

- Textos de la app en ingles, como el resto de las pantallas.
- Sin comentarios en el codigo.
- Las paginas no llaman a la API directo: usan el hook del provider (`useEvents`, `useSaved`...).
- Siempre mostrar carga, vacio y error, y desactivar los botones mientras se envia algo.
- Los estilos van en `app/globals.css` y `app/admin/admin.css` con los colores que ya existen.

## Antes de dar una tarea por terminada

1. `npm run typecheck` sin errores.
2. Probar la pantalla con sesion y sin sesion.
3. El agente `code-reviewer` dice APROBADO.

## Flujo para agregar algo al client

1. `frontend-writer`: escribe el provider, los componentes y la pagina.
2. `code-reviewer`: revisa y da el veredicto.

Skills disponibles: `/agregar-provider`, `/agregar-componente` y `/agregar-pagina`.
