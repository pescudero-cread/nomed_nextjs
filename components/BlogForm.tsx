'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface BlogFormData {
  title: string
  description: string
  content: string
  format: 'noticias' | 'investigacion' | 'opinion'
  topic: string
}

export default function BlogForm() {
  const { data: session } = useSession()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BlogFormData>()
  const topic = watch('topic')
  const format = watch('format')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateContent = async () => {
    if (!topic || !format) {
      toast.error('Por favor describe el tópico y selecciona el formato')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, format }),
      })

      if (response.ok) {
        const data = await response.json()
        setValue('content', data.content)
        toast.success('Contenido generado exitosamente')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Error al generar contenido')
      }
    } catch (error) {
      toast.error('Error al generar contenido')
    } finally {
      setIsGenerating(false)
    }
  }

  const onSubmit = async (data: BlogFormData) => {
    if (!selectedImage) {
      toast.error('Por favor selecciona una imagen')
      return
    }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('content', data.content)
      formData.append('format', data.format)
      formData.append('authorName', session?.user?.name || '')
      formData.append('authorEmail', session?.user?.email || '')
      formData.append('authorImage', session?.user?.image || '')
      formData.append('image', selectedImage)

      const response = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success('Blog creado exitosamente')
        // Reset form
        setValue('title', '')
        setValue('description', '')
        setValue('content', '')
        setValue('topic', '')
        setSelectedImage(null)
        setPreviewImage(null)
      } else {
        const error = await response.json()
        toast.error(error.message || 'Error al crear el blog')
      }
    } catch (error) {
      toast.error('Error al crear el blog')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Nuevo Blog</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título del Blog
            </label>
            <input
              {...register('title', { required: 'El título es requerido' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nomed-primary focus:border-transparent"
              placeholder="Ingresa el título del blog"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              {...register('description', { required: 'La descripción es requerida' })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nomed-primary focus:border-transparent"
              placeholder="Breve descripción del blog"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del Blog
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-nomed-primary file:text-white hover:file:bg-nomed-primary-light"
              />
              {previewImage && (
                <div className="w-20 h-20 rounded-lg overflow-hidden border">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Generación de Contenido con IA */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Generar Contenido con IA
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe el tópico
                </label>
                <textarea
                  {...register('topic')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nomed-primary focus:border-transparent"
                  placeholder="Ej: Inteligencia artificial en la educación primaria"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de formato
                </label>
                <select
                  {...register('format')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nomed-primary focus:border-transparent"
                >
                  <option value="">Selecciona un formato</option>
                  <option value="noticias">Noticias</option>
                  <option value="investigacion">Investigación</option>
                  <option value="opinion">Opinión</option>
                </select>
              </div>
            </div>
            
            <button
              type="button"
              onClick={generateContent}
              disabled={isGenerating || !topic || !format}
              className="bg-nomed-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-nomed-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generando...' : 'Generar Contenido con IA'}
            </button>
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido del Blog
            </label>
            <textarea
              {...register('content', { required: 'El contenido es requerido' })}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nomed-primary focus:border-transparent"
              placeholder="Escribe o pega el contenido del blog aquí..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Botón de envío */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creando...' : 'Crear Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
