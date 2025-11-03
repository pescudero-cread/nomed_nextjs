// Handlers del App Router para peticiones HTTP y utilidades
import { NextRequest, NextResponse } from 'next/server'
// Escribir archivos de forma asíncrona (para subir imágenes)
import { writeFile } from 'fs/promises'
// Construcción segura de rutas del sistema de archivos
import { join } from 'path'

// Simulación en memoria de una base de datos (NO persistente)
// En producción, reemplazar por un modelo en MongoDB/PostgreSQL
let blogs: any[] = []

// Listar blogs existentes (en memoria)
export async function GET() {
  try {
    return NextResponse.json({ blogs })
  } catch (error) {
    console.error('Error al obtener blogs:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Crear un nuevo blog vía multipart/form-data (incluye imagen)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const format = formData.get('format') as string
    const authorName = formData.get('authorName') as string
    const authorEmail = formData.get('authorEmail') as string
    const authorImage = formData.get('authorImage') as string
    const image = formData.get('image') as File

    if (!title || !description || !content || !format || !image) {
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Guardar imagen en disco dentro de public/uploads
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const imageName = `${Date.now()}-${image.name}`
    const imagePath = join(process.cwd(), 'public', 'uploads', imageName)
    
    // Crear directorio si no existe (manejo tolerante a errores)
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    try {
      await writeFile(imagePath, buffer)
    } catch (error) {
      // Si falla por inexistencia de carpeta, crearla y reintentar
      const fs = require('fs')
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }
      await writeFile(imagePath, buffer)
    }

    // Crear objeto blog y guardarlo en memoria
    const blog = {
      id: Date.now().toString(),
      title,
      description,
      content,
      format,
      authorName,
      authorEmail,
      authorImage,
      imageUrl: `/uploads/${imageName}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    blogs.push(blog)

    return NextResponse.json(
      { message: 'Blog creado exitosamente', blog },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al crear blog:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
