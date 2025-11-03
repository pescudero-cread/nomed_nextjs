# 🔌 Documentación de APIs - NOMED

## Índice
1. [Autenticación](#autenticación)
2. [Gestión de Blogs](#gestión-de-blogs)
3. [Formulario de Contacto](#formulario-de-contacto)
4. [Códigos de Estado](#códigos-de-estado)
5. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Autenticación

### POST /api/auth/signin
**Descripción**: Iniciar sesión con Google OAuth

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "provider": "google",
  "callbackUrl": "/backoffice"
}
```

**Respuesta Exitosa** (302):
```
Location: /backoffice
```

**Respuesta de Error** (400):
```json
{
  "error": "AccessDenied",
  "message": "Solo se permite acceso desde dominios @nomed.org y @cread.org.pe"
}
```

---

## Gestión de Blogs

### GET /api/blog
**Descripción**: Obtener lista de blogs

**Headers**:
```
Authorization: Bearer <token>
```

**Respuesta Exitosa** (200):
```json
{
  "blogs": [
    {
      "id": "1234567890",
      "title": "Título del Blog",
      "description": "Descripción del blog",
      "content": "Contenido completo del blog...",
      "format": "noticias",
      "authorName": "Juan Pérez",
      "authorEmail": "juan@nomed.org",
      "authorImage": "https://lh3.googleusercontent.com/...",
      "imageUrl": "/uploads/1234567890-imagen.jpg",
      "createdAt": "2024-10-17T03:00:00.000Z",
      "updatedAt": "2024-10-17T03:00:00.000Z"
    }
  ]
}
```

### POST /api/blog
**Descripción**: Crear nuevo blog

**Headers**:
```
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Body** (FormData):
```
title: "Título del Blog"
description: "Descripción del blog"
content: "Contenido completo del blog..."
format: "noticias" | "investigacion" | "opinion"
authorName: "Juan Pérez"
authorEmail: "juan@nomed.org"
authorImage: "https://lh3.googleusercontent.com/..."
image: [File] (imagen del blog)
```

**Respuesta Exitosa** (201):
```json
{
  "message": "Blog creado exitosamente",
  "blog": {
    "id": "1234567890",
    "title": "Título del Blog",
    "description": "Descripción del blog",
    "content": "Contenido completo del blog...",
    "format": "noticias",
    "authorName": "Juan Pérez",
    "authorEmail": "juan@nomed.org",
    "authorImage": "https://lh3.googleusercontent.com/...",
    "imageUrl": "/uploads/1234567890-imagen.jpg",
    "createdAt": "2024-10-17T03:00:00.000Z",
    "updatedAt": "2024-10-17T03:00:00.000Z"
  }
}
```

**Respuesta de Error** (400):
```json
{
  "message": "Todos los campos son requeridos"
}
```

### DELETE /api/blog/[id]
**Descripción**: Eliminar blog por ID

**Headers**:
```
Authorization: Bearer <token>
```

**Respuesta Exitosa** (200):
```json
{
  "message": "Blog eliminado exitosamente"
}
```

**Respuesta de Error** (404):
```json
{
  "message": "Blog no encontrado"
}
```

### POST /api/blog/generate
**Descripción**: Generar contenido de blog con IA

**Headers**:
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Body**:
```json
{
  "topic": "Inteligencia artificial en la educación",
  "format": "noticias"
}
```

**Respuesta Exitosa** (200):
```json
{
  "content": "# Inteligencia artificial en la educación: Una Perspectiva Actual\n\n## Introducción\nEn el mundo actual, la inteligencia artificial en la educación se ha convertido en un tema de gran relevancia..."
}
```

**Respuesta de Error** (400):
```json
{
  "message": "Tópico y formato son requeridos"
}
```

---

## Formulario de Contacto

### POST /api/contact
**Descripción**: Enviar mensaje de contacto

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "subject": "Consulta sobre productos",
  "description": "Me interesa conocer más sobre Botbee",
  "email": "usuario@ejemplo.com",
  "phone": "+56 9 1234 5678"
}
```

**Respuesta Exitosa** (200):
```json
{
  "message": "Mensaje enviado correctamente"
}
```

**Respuesta de Error** (400):
```json
{
  "message": "Todos los campos son requeridos"
}
```

### POST /api/contact/verify-email
**Descripción**: Enviar código de verificación por email

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Respuesta Exitosa** (200):
```json
{
  "message": "Código de verificación enviado"
}
```

**Respuesta de Error** (400):
```json
{
  "message": "Email es requerido"
}
```

### POST /api/contact/verify-code
**Descripción**: Verificar código de 6 dígitos

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "email": "usuario@ejemplo.com",
  "code": "123456"
}
```

**Respuesta Exitosa** (200):
```json
{
  "message": "Código verificado correctamente"
}
```

**Respuesta de Error** (400):
```json
{
  "message": "Código incorrecto"
}
```

---

## Códigos de Estado

### 2xx - Éxito
- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente

### 3xx - Redirección
- **302 Found**: Redirección (autenticación)

### 4xx - Error del Cliente
- **400 Bad Request**: Datos inválidos o faltantes
- **401 Unauthorized**: No autenticado
- **403 Forbidden**: Acceso denegado
- **404 Not Found**: Recurso no encontrado

### 5xx - Error del Servidor
- **500 Internal Server Error**: Error interno del servidor

---

## Ejemplos de Uso

### JavaScript/Fetch
```javascript
// Crear blog
const formData = new FormData();
formData.append('title', 'Mi Blog');
formData.append('description', 'Descripción del blog');
formData.append('content', 'Contenido del blog...');
formData.append('format', 'noticias');
formData.append('authorName', 'Juan Pérez');
formData.append('authorEmail', 'juan@nomed.org');
formData.append('authorImage', 'https://lh3.googleusercontent.com/...');
formData.append('image', fileInput.files[0]);

const response = await fetch('/api/blog', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);
```

### cURL
```bash
# Enviar mensaje de contacto
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Consulta",
    "description": "Mensaje de prueba",
    "email": "test@ejemplo.com",
    "phone": "+56 9 1234 5678"
  }'
```

### Python/Requests
```python
import requests

# Generar contenido con IA
response = requests.post('http://localhost:3000/api/blog/generate', 
  json={
    'topic': 'Educación con IA',
    'format': 'noticias'
  }
)

content = response.json()['content']
print(content)
```

---

## Rate Limiting

### Límites por IP
- **Ventana**: 15 minutos
- **Máximo**: 100 requests por IP
- **Headers de respuesta**:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1640995200
  ```

### Límites por Usuario
- **Verificación de email**: 5 intentos por hora
- **Creación de blogs**: 10 blogs por día
- **Generación de contenido**: 20 requests por día

---

## Seguridad

### Headers de Seguridad
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
```

### Validación de Datos
- **Email**: Formato válido y dominio permitido
- **Archivos**: Solo imágenes (jpg, png, gif, webp)
- **Tamaño máximo**: 5MB por imagen
- **Contenido**: Sanitización de HTML

### Autenticación
- **JWT**: Tokens con expiración de 7 días
- **Refresh**: Renovación automática
- **Logout**: Invalidación de tokens

---

## Monitoreo y Logs

### Logs de Aplicación
```bash
# Ver logs en desarrollo
npm run dev

# Logs de producción
pm2 logs nomed-app
```

### Métricas
- **Requests por minuto**
- **Tiempo de respuesta**
- **Errores por endpoint**
- **Uso de memoria**

### Alertas
- **Email**: Errores críticos
- **Google Chat**: Notificaciones de contacto
- **Slack**: Alertas del sistema

---

**Última actualización**: Octubre 2024
