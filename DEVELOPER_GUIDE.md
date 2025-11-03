# 👨‍💻 Guía del Desarrollador - NOMED

## Índice
1. [Configuración del Entorno](#configuración-del-entorno)
2. [Estructura del Código](#estructura-del-código)
3. [Patrones de Desarrollo](#patrones-de-desarrollo)
4. [Testing](#testing)
5. [Debugging](#debugging)
6. [Contribución](#contribución)
7. [Mejores Prácticas](#mejores-prácticas)

---

## Configuración del Entorno

### Requisitos del Sistema
- **Node.js**: 18.x o superior
- **npm**: 8.x o superior
- **Git**: 2.x o superior
- **Editor**: VS Code (recomendado)

### Extensions de VS Code Recomendadas
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Configuración de VS Code
Crear `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

### Scripts de Desarrollo
```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run type-check   # Verificación de tipos

# Utilidades
npm run clean        # Limpiar archivos generados
npm run analyze      # Análisis del bundle
```

---

## Estructura del Código

### Organización de Componentes
```
components/
├── ui/                 # Componentes base (Button, Input, etc.)
├── layout/             # Componentes de layout (Header, Footer)
├── forms/              # Componentes de formularios
├── pages/              # Componentes de páginas específicas
└── common/             # Componentes compartidos
```

### Convenciones de Naming
```typescript
// Componentes: PascalCase
export default function BlogForm() {}

// Hooks: camelCase con prefijo 'use'
const useBlogData = () => {}

// Utilidades: camelCase
export const formatDate = (date: Date) => {}

// Constantes: UPPER_SNAKE_CASE
export const API_ENDPOINTS = {
  BLOG: '/api/blog',
  CONTACT: '/api/contact'
}
```

### Estructura de Archivos
```typescript
// components/BlogForm.tsx
'use client'  // Solo si usa hooks del cliente

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

// Types
interface BlogFormData {
  title: string
  description: string
  content: string
}

// Component
export default function BlogForm() {
  // Hooks
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm<BlogFormData>()

  // Handlers
  const onSubmit = async (data: BlogFormData) => {
    // Implementation
  }

  // Render
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* JSX */}
    </form>
  )
}
```

---

## Patrones de Desarrollo

### 1. Custom Hooks
```typescript
// hooks/useBlog.ts
import { useState, useEffect } from 'react'

interface Blog {
  id: string
  title: string
  content: string
}

export function useBlog(blogId: string) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/blog/${blogId}`)
        if (!response.ok) throw new Error('Blog not found')
        const data = await response.json()
        setBlog(data.blog)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (blogId) fetchBlog()
  }, [blogId])

  return { blog, loading, error }
}
```

### 2. API Routes Pattern
```typescript
// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema
const BlogSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  format: z.enum(['noticias', 'investigacion', 'opinion'])
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate
    const body = await request.json()
    const validatedData = BlogSchema.parse(body)

    // Business logic
    const blog = await createBlog(validatedData)

    // Response
    return NextResponse.json({ blog }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### 3. Error Boundaries
```typescript
// components/ErrorBoundary.tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2>Algo salió mal</h2>
          <p>Por favor recarga la página o contacta al administrador.</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

## Testing

### Configuración de Jest
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### Tests de Componentes
```typescript
// __tests__/components/BlogForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import BlogForm from '@/components/BlogForm'

// Mock
jest.mock('react-hook-form')
jest.mock('next-auth/react')

describe('BlogForm', () => {
  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn((fn) => fn),
      formState: { errors: {} }
    })
  })

  it('renders form fields', () => {
    render(<BlogForm />)
    
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contenido/i)).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn()
    render(<BlogForm onSubmit={mockSubmit} />)
    
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: 'Test Blog' }
    })
    fireEvent.click(screen.getByRole('button', { name: /crear/i }))
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled()
    })
  })
})
```

### Tests de API
```typescript
// __tests__/api/blog.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/blog/route'

describe('/api/blog', () => {
  it('creates blog with valid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'Test Blog',
        content: 'Test content',
        format: 'noticias'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toHaveProperty('blog')
  })

  it('returns 400 for invalid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: '', // Invalid: empty title
        content: 'Test content'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
  })
})
```

---

## Debugging

### Debug en VS Code
Crear `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "args": ["dev"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Logging
```typescript
// utils/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data)
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error)
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data)
  }
}

// Uso
import { logger } from '@/utils/logger'

export async function POST(request: NextRequest) {
  try {
    logger.info('Creating blog', { body: await request.json() })
    // ... logic
  } catch (error) {
    logger.error('Failed to create blog', error as Error)
    // ... error handling
  }
}
```

### Debug de Performance
```typescript
// utils/performance.ts
export const measurePerformance = (name: string) => {
  const start = performance.now()
  
  return {
    end: () => {
      const duration = performance.now() - start
      console.log(`${name} took ${duration.toFixed(2)}ms`)
      return duration
    }
  }
}

// Uso
const perf = measurePerformance('Blog creation')
// ... código
perf.end()
```

---

## Contribución

### Flujo de Git
```bash
# 1. Crear rama
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 3. Push
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request
```

### Convenciones de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato, espacios
refactor: refactorización
test: tests
chore: tareas de mantenimiento
```

### Pull Request Template
```markdown
## Descripción
Breve descripción de los cambios

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Testing
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Tests manuales

## Screenshots
Si aplica, agregar screenshots

## Checklist
- [ ] Código sigue las convenciones
- [ ] Tests pasan
- [ ] Documentación actualizada
- [ ] No breaking changes
```

---

## Mejores Prácticas

### 1. Performance
```typescript
// Lazy loading de componentes
import dynamic from 'next/dynamic'

const BlogForm = dynamic(() => import('@/components/BlogForm'), {
  loading: () => <div>Cargando...</div>
})

// Memoización
import { memo } from 'react'

const BlogCard = memo(({ blog }: { blog: Blog }) => {
  return <div>{blog.title}</div>
})

// Optimización de imágenes
import Image from 'next/image'

<Image
  src="/blog-image.jpg"
  alt="Blog image"
  width={400}
  height={300}
  priority={false}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Seguridad
```typescript
// Validación de entrada
import { z } from 'zod'

const BlogSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  content: z.string().min(1).max(10000).trim()
})

// Sanitización
import DOMPurify from 'isomorphic-dompurify'

const sanitizedContent = DOMPurify.sanitize(userContent)

// Rate limiting
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

### 3. Accesibilidad
```typescript
// ARIA labels
<button
  aria-label="Eliminar blog"
  aria-describedby="delete-help"
>
  <TrashIcon />
</button>

// Focus management
const focusElement = useRef<HTMLInputElement>(null)

useEffect(() => {
  focusElement.current?.focus()
}, [])

// Keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    onClose()
  }
}
```

### 4. SEO
```typescript
// Metadata dinámico
export async function generateMetadata({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id)
  
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.imageUrl]
    }
  }
}

// Structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "author": {
    "@type": "Person",
    "name": blog.authorName
  }
}
```

---

## Herramientas Útiles

### Scripts de Utilidad
```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "clean": "rm -rf .next node_modules/.cache",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

### Configuración de Prettier
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Configuración de ESLint
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error"
  }
}
```

---

**¡Happy Coding! 🚀**

*Última actualización: Octubre 2024*
