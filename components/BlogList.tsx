'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Blog {
  id: string
  title: string
  description: string
  content: string
  format: string
  authorName: string
  authorEmail: string
  authorImage: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog')
      if (response.ok) {
        const data = await response.json()
        setBlogs(data.blogs)
      }
    } catch (error) {
      console.error('Error al cargar blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este blog?')) {
      return
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setSelectedBlog(null)
      }
    } catch (error) {
      console.error('Error al eliminar blog:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFormatBadge = (format: string) => {
    const badges = {
      noticias: 'bg-blue-100 text-blue-800',
      investigacion: 'bg-green-100 text-green-800',
      opinion: 'bg-purple-100 text-purple-800'
    }
    return badges[format as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nomed-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestionar Blogs</h2>
        <p className="text-gray-600">{blogs.length} blog{blogs.length !== 1 ? 's' : ''} total</p>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay blogs creados</h3>
          <p className="text-gray-600">Comienza creando tu primer blog en la pestaña "Crear Blog".</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lista de blogs */}
          <div className="space-y-4">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all ${
                  selectedBlog?.id === blog.id ? 'ring-2 ring-nomed-primary' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedBlog(blog)}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFormatBadge(blog.format)}`}>
                        {blog.format.charAt(0).toUpperCase() + blog.format.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={blog.authorImage}
                          alt={blog.authorName}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-500">{blog.authorName}</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDate(blog.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Vista detallada */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            {selectedBlog ? (
              <motion.div
                className="bg-white rounded-lg shadow-sm border p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <Image
                    src={selectedBlog.imageUrl}
                    alt={selectedBlog.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFormatBadge(selectedBlog.format)}`}>
                      {selectedBlog.format.charAt(0).toUpperCase() + selectedBlog.format.slice(1)}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedBlog.title}
                  </h2>
                  
                  <p className="text-gray-600">
                    {selectedBlog.description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Contenido:</h4>
                    <div className="text-sm text-gray-700 max-h-40 overflow-y-auto">
                      {selectedBlog.content}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4 border-t">
                    <img
                      src={selectedBlog.authorImage}
                      alt={selectedBlog.authorName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{selectedBlog.authorName}</p>
                      <p className="text-sm text-gray-500">{selectedBlog.authorEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={() => deleteBlog(selectedBlog.id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                    <button className="flex-1 bg-nomed-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-nomed-primary-light transition-colors">
                      Editar
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <div className="text-gray-400 text-4xl mb-4">👆</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona un blog</h3>
                <p className="text-gray-600">Haz clic en un blog de la lista para ver los detalles.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
