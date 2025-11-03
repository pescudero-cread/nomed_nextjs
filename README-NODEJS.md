# NOMED - Node.js Application

## 🚀 Descripción

Esta es la versión Node.js del sitio web de NOMED, una plataforma educativa que utiliza inteligencia artificial para transformar la experiencia de aprendizaje. La aplicación incluye 4 productos principales: Botbee, Monkit, Quizzal y App Nomed.

## 📋 Características

- **Framework**: Express.js con EJS como motor de plantillas
- **Arquitectura**: MVC (Model-View-Controller)
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Seguridad**: Helmet, CORS, Rate Limiting
- **Email**: Nodemailer para notificaciones
- **API RESTful**: Endpoints para todas las funcionalidades
- **Responsive**: Diseño adaptativo con Tailwind CSS
- **Animaciones**: CSS personalizadas y JavaScript interactivo

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** (v16+)
- **Express.js** - Framework web
- **EJS** - Motor de plantillas
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Nodemailer** - Envío de emails
- **Socket.io** - Comunicación en tiempo real

### Frontend
- **Tailwind CSS** - Framework CSS
- **JavaScript ES6+** - Interactividad
- **Google Fonts** - Tipografías (Poppins, Inter)
- **SVG Icons** - Iconografía

### Seguridad
- **Helmet** - Headers de seguridad
- **CORS** - Control de acceso
- **Rate Limiting** - Límite de requests
- **bcryptjs** - Hash de contraseñas
- **express-validator** - Validación de datos

## 📁 Estructura del Proyecto

```
nomed-main/
├── server.js                 # Servidor principal
├── package.json             # Dependencias y scripts
├── env.example              # Variables de entorno de ejemplo
├── routes/                   # Rutas de la aplicación
│   ├── index.js             # Rutas principales
│   └── api.js               # Rutas de API
├── controllers/              # Controladores
│   ├── homeController.js     # Controlador principal
│   ├── botbeeController.js   # Controlador Botbee
│   ├── monkitController.js   # Controlador Monkit
│   ├── quizzalController.js  # Controlador Quizzal
│   ├── appNomedController.js # Controlador App Nomed
│   └── api/                  # Controladores de API
│       ├── botbeeApiController.js
│       ├── monkitApiController.js
│       ├── quizzalApiController.js
│       └── contactApiController.js
├── views/                    # Plantillas EJS
│   ├── layout.ejs           # Layout principal
│   ├── index.ejs            # Página principal
│   ├── botbee.ejs           # Página Botbee
│   ├── monkit.ejs           # Página Monkit
│   ├── quizzal.ejs          # Página Quizzal
│   ├── app-nomed.ejs        # Página App Nomed
│   ├── 404.ejs              # Página de error 404
│   ├── error.ejs            # Página de error general
│   └── partials/            # Componentes reutilizables
│       ├── head.ejs
│       ├── header.ejs
│       ├── footer.ejs
│       └── scripts.ejs
├── public/                   # Archivos estáticos
│   ├── css/                 # Estilos CSS
│   ├── js/                  # JavaScript del cliente
│   │   └── main.js         # JavaScript principal
│   └── images/             # Imágenes
├── models/                  # Modelos de base de datos
├── middleware/              # Middleware personalizado
├── utils/                   # Utilidades
└── README-NODEJS.md         # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v16 o superior)
- npm (v8 o superior)
- MongoDB (local o en la nube)

### 1. Clonar e Instalar Dependencias

```bash
# Instalar dependencias
npm install

# Instalar dependencias de desarrollo
npm install --save-dev nodemon
```

### 2. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar variables de entorno
nano .env
```

Configurar las siguientes variables en `.env`:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
MONGODB_URI=mongodb://localhost:27017/nomed
DB_NAME=nomed

# JWT
JWT_SECRET=tu-clave-secreta-super-segura
JWT_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion

# APIs externas
OPENAI_API_KEY=tu-clave-openai
GOOGLE_ANALYTICS_ID=tu-id-google-analytics
```

### 3. Iniciar la Aplicación

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

La aplicación estará disponible en: `http://localhost:3000`

## 📚 API Endpoints

### Páginas Principales
- `GET /` - Página principal
- `GET /botbee` - Página Botbee
- `GET /monkit` - Página Monkit
- `GET /quizzal` - Página Quizzal
- `GET /app-nomed` - Página App Nomed

### API Endpoints
- `POST /api/contact` - Enviar mensaje de contacto
- `POST /api/botbee/chat` - Chat con Botbee
- `POST /api/botbee/create-character` - Crear personaje
- `POST /api/monkit/generate-content` - Generar contenido
- `POST /api/monkit/create-game` - Crear juego
- `POST /api/quizzal/create-quiz` - Crear evaluación
- `POST /api/quizzal/submit-answer` - Enviar respuesta
- `GET /api/quizzal/quiz/:id` - Obtener evaluación
- `GET /api/health` - Estado de la aplicación

## 🎨 Características del Frontend

### Diseño Responsive
- Mobile First Design
- Breakpoints: sm, md, lg, xl
- Grid System con CSS Grid y Flexbox
- Tipografía escalable

### Animaciones CSS
- `bounce-gentle` - Movimiento suave vertical
- `wiggle` - Rotación sutil
- `float` - Flotación con delays
- `slide-in-left/right` - Entrada lateral
- `fade-in` - Aparición gradual
- `pulse-slow` - Pulso lento
- `glow` - Efecto de brillo

### Interactividad JavaScript
- Chat en tiempo real con Botbee
- Demos interactivos para cada producto
- Formularios con validación
- Notificaciones toast
- Smooth scrolling
- Intersection Observer para animaciones

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia con nodemon

# Producción
npm start           # Inicia servidor
npm test           # Ejecuta tests

# Base de datos
npm run db:seed    # Poblar base de datos
npm run db:reset   # Resetear base de datos
```

## 🚀 Despliegue

### Heroku
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login y crear app
heroku login
heroku create nomed-app

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=tu-mongodb-uri

# Desplegar
git push heroku main
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoreo y Logs

- **Morgan** - Logging de requests HTTP
- **Health Check** - Endpoint `/api/health`
- **Error Handling** - Middleware de manejo de errores
- **Rate Limiting** - Protección contra spam

## 🔒 Seguridad

- **Helmet** - Headers de seguridad
- **CORS** - Control de acceso cross-origin
- **Rate Limiting** - Límite de requests por IP
- **Input Validation** - Validación de datos de entrada
- **JWT** - Autenticación segura
- **bcrypt** - Hash de contraseñas

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage

# Tests de integración
npm run test:integration
```

## 📈 Performance

- **Compression** - Compresión gzip
- **Static Files** - Servir archivos estáticos
- **Caching** - Headers de cache
- **Database Indexing** - Índices optimizados

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico:
- Email: soporte@nomed.org
- Documentación: [docs.nomed.org](https://docs.nomed.org)
- Issues: [GitHub Issues](https://github.com/nomed/issues)

## 🔄 Migración desde HTML Estático

Este proyecto Node.js mantiene toda la funcionalidad del sitio HTML original pero añade:

- ✅ Servidor backend con Express.js
- ✅ Base de datos MongoDB
- ✅ API RESTful completa
- ✅ Autenticación y autorización
- ✅ Envío de emails
- ✅ Chat en tiempo real
- ✅ Demos interactivos funcionales
- ✅ Sistema de notificaciones
- ✅ Logging y monitoreo
- ✅ Seguridad mejorada
- ✅ Escalabilidad

## 🎯 Próximas Funcionalidades

- [ ] Autenticación de usuarios
- [ ] Panel de administración
- [ ] Dashboard de analytics
- [ ] Integración con APIs de IA
- [ ] Sistema de notificaciones push
- [ ] Chat en tiempo real con WebSockets
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

---

**NOMED Team** - Transformando la educación con inteligencia artificial 🚀
