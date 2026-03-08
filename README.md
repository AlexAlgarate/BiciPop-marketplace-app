# BiciPop - Marketplace de Bicicletas

Proyecto del Bootcamp de Desarrollo Web de KeepCoding (Edición XIX).

## Descripción

BiciPop es una aplicación web de compraventa de bicicletas de segunda mano, desarrollada con las últimas tecnologías del ecosistema React/Next.js.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Estilos**: Tailwind CSS
- **Backend**: Next.js Server Actions
- **Base de datos**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Despliegue**: Vercel

## Características

- Publicación de anuncios de bicicletas
- Filtrado y búsqueda de productos
- Sistema de autenticación (registro/login) y rutas protegidas
- Diseño responsive
- Likes/favoritos en productos (un solo like por usuario, no puedes dar like a tus propios productos)

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos (Supabase/PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@localhost:54321/nextjs_db?schema=public"

# Autenticación JWT
JWT_SECRET="tu-secret-jwt-aqui"

# Configuración de cookies
AUTH_COOKIE_NAME="session-token"
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Configura las variables de entorno en `.env`
4. Genera el cliente de Prisma:

   ```bash
   pnpm prisma:generate
   ```

5. Sincroniza la base de datos:

   ```bash
   pnpm prisma:push
   ```

6. (Opcional) Ejecuta el seed para datos de prueba:

   ```bash
   pnpm prisma:seed
   ```

7. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter
- `pnpm test` - Ejecuta los tests unitarios (próximas features)
- `pnpm test:e2e` - Ejecuta los tests end-to-end con Playwright (próximas features)

## Despliegue

La aplicación está desplegada en Vercel: <https://bicipop.vercel.app>

## Licencia

MIT
