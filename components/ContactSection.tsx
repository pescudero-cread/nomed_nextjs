'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface ContactForm {
  subject: string
  description: string
  email: string
  phone: string
  verificationCode?: string
}

export default function ContactSection() {
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ContactForm>()
  const email = watch('email')

  const sendVerificationCode = async () => {
    if (!email) {
      toast.error('Por favor ingresa tu email primero')
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch('/api/contact/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success('Código de verificación enviado a tu email')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Error al enviar el código')
      }
    } catch (error) {
      toast.error('Error al enviar el código de verificación')
    } finally {
      setIsVerifying(false)
    }
  }

  const verifyCode = async () => {
    if (!verificationCode) {
      toast.error('Por favor ingresa el código de verificación')
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch('/api/contact/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      })

      if (response.ok) {
        setIsEmailVerified(true)
        toast.success('Email verificado correctamente')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Código inválido')
      }
    } catch (error) {
      toast.error('Error al verificar el código')
    } finally {
      setIsVerifying(false)
    }
  }

  const onSubmit = async (data: ContactForm) => {
    if (!isEmailVerified) {
      toast.error('Por favor verifica tu email primero')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Mensaje enviado correctamente')
        // Reset form
        setValue('subject', '')
        setValue('description', '')
        setValue('email', '')
        setValue('phone', '')
        setIsEmailVerified(false)
        setVerificationCode('')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Error al enviar el mensaje')
      }
    } catch (error) {
      toast.error('Error al enviar el mensaje')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-nomed-secondary">Contacto</h2>
            <p className="text-xl text-gray-600">
              ¿Listo para transformar tu experiencia educativa? ¡Contáctanos!
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl font-bold text-nomed-secondary mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-nomed-primary rounded-lg flex items-center justify-center ring-1 ring-nomed-primary-bright">
                      <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">contacto@nomed.org</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-nomed-secondary rounded-lg flex items-center justify-center ring-1 ring-white/30">
                      <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Ubicación</h4>
                      <p className="text-gray-600">Santiago, Chile</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-nomed-background rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-nomed-secondary mb-6">Envíanos un Mensaje</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Asunto</label>
                  <input
                    {...register('subject', { required: 'El asunto es requerido' })}
                    className="form-input"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <div className="flex space-x-2">
                    <input
                      {...register('email', { 
                        required: 'El email es requerido',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido'
                        }
                      })}
                      className="form-input flex-1"
                      placeholder="tu@email.com"
                      disabled={isEmailVerified}
                    />
                    {!isEmailVerified && (
                      <button
                        type="button"
                        onClick={sendVerificationCode}
                        disabled={isVerifying || !email}
                        className="bg-nomed-primary text-gray-900 px-4 py-3 rounded-lg border border-nomed-primary-bright hover:bg-nomed-primary-bright transition-colors disabled:opacity-50"
                      >
                        {isVerifying ? 'Enviando...' : 'Verificar'}
                      </button>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {!isEmailVerified && email && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Código de Verificación</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="form-input flex-1"
                        placeholder="Ingresa el código de 6 dígitos"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={verifyCode}
                        disabled={isVerifying || verificationCode.length !== 6}
                        className="bg-nomed-primary text-gray-900 px-4 py-3 rounded-lg border border-nomed-primary-bright hover:bg-nomed-primary-bright transition-colors disabled:opacity-50"
                      >
                        {isVerifying ? 'Verificando...' : 'Confirmar'}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      El código expira en 60 segundos
                    </p>
                  </div>
                )}

                {isEmailVerified && (
                  <div className="bg-nomed-primary-light border border-nomed-primary-bright text-gray-900 px-4 py-3 rounded">
                    ✓ Email verificado correctamente
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                  <input
                    {...register('phone', { required: 'El teléfono es requerido' })}
                    className="form-input"
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
                  <textarea
                    {...register('description', { required: 'La descripción es requerida' })}
                    rows={4}
                    className="form-input"
                    placeholder="Cuéntanos sobre tu proyecto educativo"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isEmailVerified}
                  className="w-full bg-nomed-primary text-gray-900 py-3 rounded-lg font-semibold border border-nomed-primary-bright hover:bg-nomed-primary-bright transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
