'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Error de Configuración',
          message: 'Hay un problema con la configuración del servidor. Por favor contacta al administrador.',
          icon: '⚙️'
        }
      case 'AccessDenied':
        return {
          title: 'Acceso Denegado',
          message: 'Solo se permite el acceso desde dominios @nomed.org y @cread.org.pe',
          icon: '🚫'
        }
      case 'Verification':
        return {
          title: 'Error de Verificación',
          message: 'El token de verificación ha expirado o es inválido. Por favor intenta nuevamente.',
          icon: '🔐'
        }
      default:
        return {
          title: 'Error de Autenticación',
          message: 'Ocurrió un error inesperado durante la autenticación. Por favor intenta nuevamente.',
          icon: '❌'
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl">{errorInfo.icon}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white mb-4">
            {errorInfo.title}
          </h1>
          
          {/* Message */}
          <motion.div
            className="bg-white rounded-lg shadow-xl p-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-700 text-lg mb-4">
              {errorInfo.message}
            </p>
            
            {error && (
              <div className="bg-gray-100 rounded p-3 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Código de error:</strong> {error}
                </p>
              </div>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/auth/signin">
              <motion.button
                className="w-full bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Intentar Nuevamente
              </motion.button>
            </Link>
            
            <Link href="/">
              <motion.button
                className="w-full border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Volver al Inicio
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
