# 📚 Documentación Técnica - NOMED

## Índice
1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Configuración del Proyecto](#configuración-del-proyecto)
4. [APIs y Endpoints](#apis-y-endpoints)
5. [Componentes Principales](#componentes-principales)
6. [Autenticación y Seguridad](#autenticación-y-seguridad)
7. [Base de Datos](#base-de-datos)
8. [Despliegue](#despliegue)
9. [Troubleshooting](#troubleshooting)
10. [Contribución](#contribución)

---

## Introducción

NOMED es una plataforma educativa que utiliza inteligencia artificial para transformar el aprendizaje. El proyecto ha sido migrado de Node.js/Express a **Next.js 14** con App Router, implementando un backoffice completo y una web pública con funcionalidades avanzadas.

### Características Principales
- **Backoffice**: Gestión de blogs con generación de contenido por IA
- **Autenticación**: Google OAuth restringido a dominios específicos
- **Formulario de Contacto**: Con validación de email por código
- **Integración**: Google Chat para notificaciones
- **Productos**: 4 herramientas educativas (Botbee, Monkit, Quizzal, App Nomed)

---

## Arquitectura del Sistema

### Stack Tecnológico
```
Frontend: Next.js 14 + TypeScript + Tailwind CSS
Backend: Next.js API Routes + NextAuth.js
Base de Datos: MongoDB (opcional, actualmente en memoria)
Email: Nodemailer + SMTP
Autenticación: Google OAuth 2.0
Animaciones: Framer Motion
Formularios: React Hook Form
Notificaciones: React Hot Toast
```

### Estructura de Directorios
```
nomed-main/
├── app/                          # App Router de Next.js
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/   # NextAuth.js
│   │   ├── blog/                 # Gestión de blogs
│   │   └── contact/              # Formulario de contacto
│   ├── auth/                     # Páginas de autenticación
│   ├── backoffice/               # Panel de administración
│   ├── [productos]/             # Páginas de productos
│   ├── globals.css              # Estilos globales
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página de inicio
├── components/                   # Componentes React
├── lib/                         # Configuraciones y utilidades
├── public/                      # Archivos estáticos
│   ├── images/                  # Imágenes del sitio
│   └── uploads/                 # Imágenes subidas
├── styles/                      # Estilos adicionales
├── types/                       # Definiciones TypeScript
└── utils/                       # Funciones utilitarias
```

---

## Configuración del Proyecto

### 1. Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd nomed-main

# Instalar dependencias
npm install --legacy-peer-deps

# Configurar variables de entorno
cp .env.example .env.local
```

### 2. Variables de Entorno
Crear archivo `.env.local` con las siguientes variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database Configuration (Opcional)
MONGODB_URI=mongodb://localhost:27017/nomed

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# API Keys
OPENAI_API_KEY=your-openai-api-key

# Google Chat Integration
GOOGLE_CHAT_WEBHOOK=your-google-chat-webhook-url

# reCaptcha Configuration
RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

### 3. Configuración de Google OAuth
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear un nuevo proyecto o seleccionar uno existente
3. Habilitar Google+ API
4. Crear credenciales OAuth 2.0
5. Configurar URIs autorizados:
   - `http://localhost:3000` (desarrollo)
   - `https://tu-dominio.com` (producción)

### 4. Configuración de Email (Gmail)
1. Habilitar autenticación de 2 factores en Gmail
2. Generar contraseña de aplicación
3. Usar la contraseña de aplicación en `SMTP_PASS`

### 5. Configuración de Google Chat
1. Crear un espacio en Google Chat
2. Agregar un webhook al espacio
3. Copiar la URL del webhook a `GOOGLE_CHAT_WEBHOOK`

---

## APIs y Endpoints

### Autenticación
```
GET/POST /api/auth/[...nextauth]
```
- **Descripción**: Maneja la autenticación con Google OAuth
- **Restricciones**: Solo dominios @nomed.org y @cread.org.pe

### Gestión de Blogs
```
GET /api/blog
POST /api/blog
DELETE /api/blog/[id]
POST /api/blog/generate
```

#### POST /api/blog
**Descripción**: Crear un nuevo blog
**Body** (FormData):
```typescript
{
  title: string
  description: string
  content: string
  format: 'noticias' | 'investigacion' | 'opinion'
  authorName: string
  authorEmail: string
  authorImage: string
  image: File
}
```

#### POST /api/blog/generate
**Descripción**: Generar contenido con IA
**Body**:
```typescript
{
  topic: string
  format: 'noticias' | 'investigacion' | 'opinion'
}
```

### Formulario de Contacto
```
POST /api/contact
POST /api/contact/verify-email
POST /api/contact/verify-code
```

#### POST /api/contact
**Descripción**: Enviar mensaje de contacto
**Body**:
```typescript
{
  subject: string
  description: string
  email: string
  phone: string
}
```

#### POST /api/contact/verify-email
**Descripción**: Enviar código de verificación
**Body**:
```typescript
{
  email: string
}
```

#### POST /api/contact/verify-code
**Descripción**: Verificar código de 6 dígitos
**Body**:
```typescript
{
  email: string
  code: string
}
```

---

## Componentes Principales

### Layout y Navegación
- **`app/layout.tsx`**: Layout principal con providers
- **`components/Header.tsx`**: Navegación principal con autenticación
- **`components/Footer.tsx`**: Pie de página con enlaces

### Página Principal
- **`app/page.tsx`**: Página de inicio
- **`components/HeroSection.tsx`**: Sección hero con animaciones
- **`components/ServicesSection.tsx`**: Presentación de productos
- **`components/TestimonialsSection.tsx`**: Testimonios de usuarios
- **`components/AboutSection.tsx`**: Información de la empresa
- **`components/ContactSection.tsx`**: Formulario de contacto

### Productos
- **`components/BotbeePage.tsx`**: Página de Botbee
- **`components/MonkitPage.tsx`**: Página de Monkit
- **`components/QuizzalPage.tsx`**: Página de Quizzal
- **`components/AppNomedPage.tsx`**: Página de App Nomed

### Backoffice
- **`components/BackofficePage.tsx`**: Panel principal del backoffice
- **`components/BlogForm.tsx`**: Formulario de creación de blogs
- **`components/BlogList.tsx`**: Lista y gestión de blogs

### Autenticación
- **`components/SignInPage.tsx`**: Página de inicio de sesión
- **`components/UnauthorizedPage.tsx`**: Página de acceso denegado

---

## Autenticación y Seguridad

### NextAuth.js Configuration
```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedDomains = ['@nomed.org', '@cread.org.pe']
      const userEmail = user.email || ''
      return allowedDomains.some(domain => userEmail.endsWith(domain))
    }
  }
}
```

### Restricciones de Acceso
- **Backoffice**: Solo usuarios con email @nomed.org o @cread.org.pe
- **APIs**: Validación de sesión en rutas protegidas
- **Formularios**: Validación de datos en frontend y backend

### Headers de Seguridad
```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
      ]
    }
  ]
}
```

---

## Base de Datos

### Estado Actual
El proyecto actualmente utiliza almacenamiento en memoria para simplicidad. Los blogs se almacenan en un array en el servidor.

### Migración a Base de Datos
Para producción, se recomienda implementar MongoDB:

```typescript
// models/Blog.ts
import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  format: { type: String, enum: ['noticias', 'investigacion', 'opinion'] },
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  authorImage: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
```

---

## Despliegue

### Vercel (Recomendado)
1. **Conectar repositorio**:
   ```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Desplegar
   vercel
   ```

2. **Configurar variables de entorno** en el dashboard de Vercel

3. **Configurar dominio personalizado** (opcional)

### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Construir imagen
docker build -t nomed-app .

# Ejecutar contenedor
docker run -p 3000:3000 nomed-app
```

### Variables de Entorno en Producción
```env
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=tu-secret-super-seguro
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
GOOGLE_CHAT_WEBHOOK=tu-webhook-url
```

---

## Troubleshooting

### Errores Comunes

#### 1. Error de Autenticación
```
Error: AccessDenied
```
**Solución**: Verificar que el email esté en los dominios permitidos (@nomed.org, @cread.org.pe)

#### 2. Error de Email
```
Error: Invalid login
```
**Solución**: 
- Verificar credenciales SMTP
- Usar contraseña de aplicación de Gmail
- Verificar que 2FA esté habilitado

#### 3. Error de Build
```
Type error: Property 'user' is possibly 'undefined'
```
**Solución**: Agregar verificaciones de null/undefined:
```typescript
const isAllowed = allowedDomains.some(domain => 
  session?.user?.email?.endsWith(domain)
)
```

#### 4. Error de useSearchParams
```
useSearchParams() should be wrapped in a suspense boundary
```
**Solución**: Envolver el componente en Suspense:
```typescript
<Suspense fallback={<div>Loading...</div>}>
  <ComponentWithSearchParams />
</Suspense>
```

### Logs y Debugging
```bash
# Ejecutar en modo debug
DEBUG=* npm run dev

# Ver logs de NextAuth
DEBUG=nextauth* npm run dev
```

---

## Contribución

### Flujo de Desarrollo
1. **Fork** el repositorio
2. **Crear rama** para feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** cambios: `git commit -m 'Add nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### Estándares de Código
- **TypeScript**: Usar tipos estrictos
- **ESLint**: Seguir reglas de Next.js
- **Prettier**: Formateo automático
- **Commits**: Mensajes descriptivos

### Testing
```bash
# Ejecutar linter
npm run lint

# Ejecutar build
npm run build

# Verificar tipos
npx tsc --noEmit
```

---

## Contacto y Soporte

- **Email**: contacto@nomed.org
- **Documentación**: Este archivo
- **Issues**: GitHub Issues
- **Equipo**: NOMED Development Team

---

**Desarrollado con ❤️ por el equipo NOMED**

*Última actualización: Octubre 2024*
