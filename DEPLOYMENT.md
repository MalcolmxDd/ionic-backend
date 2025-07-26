# Despliegue en Render

## Variables de Entorno Requeridas

Configura estas variables en Render:

- `DATABASE_URL`: URL de tu base de datos MySQL
- `JWT_SECRET`: Clave secreta para JWT (puede ser cualquier string largo y seguro)
- `NODE_ENV`: production
- `PORT`: Render lo configura automáticamente

## Pasos para Desplegar

1. Conecta tu repositorio de GitHub a Render
2. Configura las variables de entorno
3. Render usará automáticamente:
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npm run start:prod`

## Base de Datos

Asegúrate de tener una base de datos MySQL configurada y accesible desde Render. 