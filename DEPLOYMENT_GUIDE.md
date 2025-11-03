# 🚀 Guía de Despliegue - NOMED

## Índice
1. [Preparación](#preparación)
2. [Despliegue en Vercel](#despliegue-en-vercel)
3. [Despliegue en Netlify](#despliegue-en-netlify)
4. [Despliegue con Docker](#despliegue-con-docker)
5. [Configuración de Producción](#configuración-de-producción)
6. [Monitoreo](#monitoreo)
7. [Backup y Recuperación](#backup-y-recuperación)

---

## Preparación

### 1. Verificar Build Local
```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar build
npm run build

# Verificar que no hay errores
npm run lint
```

### 2. Configurar Variables de Entorno
Crear archivo `.env.production`:
```env
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=tu-secret-super-seguro-de-32-caracteres
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
GOOGLE_CHAT_WEBHOOK=tu-webhook-url
RECAPTCHA_SITE_KEY=tu-recaptcha-site-key
RECAPTCHA_SECRET_KEY=tu-recaptcha-secret-key
```

### 3. Configurar Google OAuth
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Seleccionar proyecto
3. Ir a "APIs y servicios" > "Credenciales"
4. Editar OAuth 2.0 Client ID
5. Agregar URI autorizado: `https://tu-dominio.com`
6. Agregar URI de redirección: `https://tu-dominio.com/api/auth/callback/google`

---

## Despliegue en Vercel

### Método 1: Dashboard de Vercel
1. **Conectar repositorio**:
   - Ir a [vercel.com](https://vercel.com)
   - Hacer login con GitHub
   - Click en "New Project"
   - Seleccionar repositorio de NOMED

2. **Configurar proyecto**:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install --legacy-peer-deps
   ```

3. **Variables de entorno**:
   - Ir a Settings > Environment Variables
   - Agregar todas las variables de `.env.production`

4. **Desplegar**:
   - Click en "Deploy"
   - Esperar a que termine el build
   - Obtener URL de producción

### Método 2: Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel

# Configurar variables de entorno
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
# ... agregar todas las variables

# Desplegar a producción
vercel --prod
```

### Configuración Avanzada de Vercel
Crear archivo `vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps",
  "env": {
    "NEXTAUTH_URL": "@nextauth-url",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

---

## Despliegue en Netlify

### Método 1: Drag & Drop
1. **Build local**:
   ```bash
   npm run build
   npm run export  # Si usas static export
   ```

2. **Subir carpeta**:
   - Ir a [netlify.com](https://netlify.com)
   - Arrastrar carpeta `out` o `.next` a Netlify

### Método 2: Git Integration
1. **Conectar repositorio**:
   - Conectar GitHub con Netlify
   - Seleccionar repositorio NOMED

2. **Configurar build**:
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Variables de entorno**:
   - Site settings > Environment variables
   - Agregar todas las variables

### Configuración de Netlify
Crear archivo `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

---

## Despliegue con Docker

### 1. Crear Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. Crear docker-compose.yml
```yaml
version: '3.8'

services:
  nomed-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=tu-secret
      - GOOGLE_CLIENT_ID=tu-client-id
      - GOOGLE_CLIENT_SECRET=tu-client-secret
      - SMTP_HOST=smtp.gmail.com
      - SMTP_PORT=587
      - SMTP_USER=tu-email@gmail.com
      - SMTP_PASS=tu-app-password
    volumes:
      - ./uploads:/app/public/uploads
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - nomed-app
    restart: unless-stopped
```

### 3. Desplegar con Docker
```bash
# Construir imagen
docker build -t nomed-app .

# Ejecutar contenedor
docker run -d \
  --name nomed-app \
  -p 3000:3000 \
  --env-file .env.production \
  nomed-app

# O usar docker-compose
docker-compose up -d
```

---

## Configuración de Producción

### 1. Configurar Dominio Personalizado
```bash
# Vercel
vercel domains add tu-dominio.com

# Netlify
# Ir a Site settings > Domain management
# Agregar dominio personalizado
```

### 2. Configurar SSL
```bash
# Vercel (automático)
# No requiere configuración adicional

# Netlify
# SSL se configura automáticamente con Let's Encrypt

# Docker con Nginx
# Configurar certificados SSL en nginx.conf
```

### 3. Configurar CDN
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['tu-dominio.com'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.js'
  }
}
```

### 4. Configurar Base de Datos
```bash
# MongoDB Atlas
# 1. Crear cluster en MongoDB Atlas
# 2. Obtener connection string
# 3. Configurar en variables de entorno

# PostgreSQL
# 1. Crear instancia en Railway/Supabase
# 2. Configurar connection string
# 3. Migrar datos si es necesario
```

---

## Monitoreo

### 1. Vercel Analytics
```bash
# Instalar Vercel Analytics
npm install @vercel/analytics

# Configurar en app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Sentry para Error Tracking
```bash
# Instalar Sentry
npm install @sentry/nextjs

# Configurar sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### 3. Uptime Monitoring
```bash
# UptimeRobot
# 1. Crear cuenta en uptimerobot.com
# 2. Agregar monitor para tu-dominio.com
# 3. Configurar alertas por email/SMS

# Pingdom
# 1. Crear cuenta en pingdom.com
# 2. Configurar monitor
# 3. Recibir alertas de downtime
```

---

## Backup y Recuperación

### 1. Backup de Base de Datos
```bash
# MongoDB
mongodump --uri="mongodb://user:pass@host:port/db" --out=backup/

# PostgreSQL
pg_dump -h host -U user -d database > backup.sql
```

### 2. Backup de Archivos
```bash
# Backup de uploads
tar -czf uploads-backup.tar.gz public/uploads/

# Backup completo
tar -czf nomed-backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  .
```

### 3. Script de Backup Automático
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/nomed"
SITE_DIR="/app/nomed"

# Crear directorio de backup
mkdir -p $BACKUP_DIR

# Backup de archivos
tar -czf $BACKUP_DIR/files-$DATE.tar.gz -C $SITE_DIR \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  .

# Backup de base de datos
mongodump --uri="$MONGODB_URI" --out=$BACKUP_DIR/db-$DATE/

# Limpiar backups antiguos (más de 30 días)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
find $BACKUP_DIR -name "db-*" -mtime +30 -exec rm -rf {} \;

echo "Backup completado: $DATE"
```

### 4. Recuperación
```bash
# Restaurar archivos
tar -xzf files-20241017_120000.tar.gz -C /app/nomed/

# Restaurar base de datos
mongorestore --uri="$MONGODB_URI" /backups/nomed/db-20241017_120000/

# Reiniciar aplicación
docker-compose restart nomed-app
```

---

## Checklist de Despliegue

### Pre-Despliegue
- [ ] Variables de entorno configuradas
- [ ] Google OAuth configurado
- [ ] SMTP configurado
- [ ] Build local exitoso
- [ ] Tests pasando

### Despliegue
- [ ] Repositorio conectado
- [ ] Variables de entorno en plataforma
- [ ] Dominio configurado
- [ ] SSL habilitado
- [ ] Build exitoso

### Post-Despliegue
- [ ] Sitio accesible
- [ ] Autenticación funcionando
- [ ] Formulario de contacto funcionando
- [ ] Backoffice accesible
- [ ] Monitoreo configurado
- [ ] Backup configurado

---

## Troubleshooting

### Errores Comunes

#### Build Fallido
```bash
# Verificar dependencias
npm install --legacy-peer-deps

# Limpiar cache
rm -rf .next node_modules
npm install --legacy-peer-deps
```

#### Variables de Entorno
```bash
# Verificar variables
vercel env ls

# Actualizar variable
vercel env add VARIABLE_NAME
```

#### Dominio no Funciona
```bash
# Verificar DNS
nslookup tu-dominio.com

# Verificar SSL
curl -I https://tu-dominio.com
```

---

**¡Despliegue exitoso! 🚀**

*Última actualización: Octubre 2024*
