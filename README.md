# NOMED - Plataforma Educativa con IA

NOMED es una plataforma educativa que transforma el aprendizaje mediante inteligencia artificial, ofreciendo soluciones digitales innovadoras para estudiantes y docentes.

## 🚀 Características Principales

### Backoffice
- **Autenticación con Google**: Solo usuarios con email @nomed.org y @cread.org.pe
- **Creación de Blogs**: Sistema completo de gestión de contenido
- **Generación de Contenido con IA**: Creación automática de contenido educativo
- **Gestión de Imágenes**: Subida y gestión de imágenes para blogs
- **Editor de Contenido**: Edición de párrafos específicos (Sobre la Empresa, Organigrama, Sobre los Productos)

### Web Pública
- **Formulario de Contacto**: Con validación de email por código de 6 dígitos
- **Integración con Google Chat**: Notificaciones automáticas
- **reCaptcha**: Protección contra spam
- **Diseño Responsivo**: Optimizado para todos los dispositivos

### Productos NOMED
- **Botbee**: Personajes interactivos para aprendizaje dinámico
- **Monkit**: Herramientas para crear contenido educativo interactivo
- **Quizzal**: Plataforma de evaluaciones personalizadas
- **App Nomed**: Refuerzo académico interactivo para estudiantes

## 🛠️ Tecnologías Utilizadas

- **Next.js 14**: Framework de React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de CSS utilitario
- **NextAuth.js**: Autenticación con Google OAuth
- **Framer Motion**: Animaciones y transiciones
- **React Hook Form**: Manejo de formularios
- **React Hot Toast**: Notificaciones
- **Nodemailer**: Envío de emails

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd nomed-main
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-nextauth-key-here

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Database Configuration
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

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🔧 Scripts Disponibles

- `npm run dev`: Ejecuta el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Ejecuta la aplicación en producción
- `npm run lint`: Ejecuta el linter de ESLint

## 📁 Estructura del Proyecto

```
nomed-main/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── auth/          # Autenticación
│   │   ├── blog/          # Gestión de blogs
│   │   └── contact/       # Formulario de contacto
│   ├── auth/              # Páginas de autenticación
│   ├── backoffice/        # Panel de administración
│   ├── botbee/            # Página de Botbee
│   ├── monkit/            # Página de Monkit
│   ├── quizzal/           # Página de Quizzal
│   ├── app-nomed/         # Página de App Nomed
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React
├── lib/                   # Utilidades y configuraciones
├── public/                # Archivos estáticos
│   ├── images/           # Imágenes
│   └── uploads/          # Imágenes subidas
├── styles/               # Estilos adicionales
├── types/                # Definiciones de TypeScript
└── utils/                # Funciones utilitarias
```

## 🔐 Autenticación

El sistema utiliza NextAuth.js con Google OAuth. Solo usuarios con email de los dominios autorizados pueden acceder al backoffice:

- @nomed.org
- @cread.org.pe

## 📧 Formulario de Contacto

El formulario de contacto incluye:

1. **Validación de Email**: Código de 6 dígitos enviado por email (expira en 60 segundos)
2. **reCaptcha**: Protección contra spam
3. **Integración con Google Chat**: Notificaciones automáticas
4. **Envío de Email**: Confirmación al equipo de NOMED

## 🤖 Generación de Contenido con IA

El backoffice incluye un generador de contenido que crea blogs completos basados en:

- **Tópico**: Descripción del tema
- **Formato**: Noticias, Investigación, Opinión
- **Plantillas**: Contenido estructurado con secciones editables

## 🎨 Diseño y UX

- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Animaciones**: Transiciones suaves con Framer Motion
- **Colores de Marca**: Paleta de colores específica para cada producto
- **Tipografía**: Fuente Poppins para mejor legibilidad

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Docker
```bash
docker build -t nomed-app .
docker run -p 3000:3000 nomed-app
```

## 📝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **NOMED Team**: Desarrollo y diseño
- **Asociación CREAD**: Colaboración educativa

## 📞 Contacto

- **Email**: contacto@nomed.org
- **Ubicación**: Santiago, Chile
- **Website**: [nomed.org](https://nomed.org)

---

Desarrollado con ❤️ por el equipo NOMED