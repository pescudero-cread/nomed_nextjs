'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function QuizzalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-quizzal-green to-quizzal-forest">
      {/* Hero Section */}
      <section className="py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins">
                Conoce a <span className="text-green-200">Quizzal</span>
              </h1>
              <p className="text-xl leading-relaxed">
                Nuestro búho evaluador que crea evaluaciones personalizadas e inteligentes. 
                Quizzal adapta las preguntas al nivel de cada estudiante, proporcionando 
                retroalimentación inmediata y detallada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="bg-white text-quizzal-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Crear Evaluación
                </motion.button>
                <motion.button 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-quizzal-green transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Demos
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
                <div className="text-center space-y-6">
                  <motion.div 
                    className="w-48 h-48 mx-auto"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <Image 
                      src="/images/characters/quizzal.svg" 
                      alt="Quizzal - Búho Evaluador" 
                      width={192}
                      height={192}
                      className="w-full h-full"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold">¡Hola! Soy Quizzal</h3>
                  <p className="text-lg opacity-90">
                    Tu evaluador inteligente
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-quizzal-green">Características de Quizzal</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todas las funcionalidades que hacen de Quizzal tu mejor aliado para evaluaciones
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Evaluaciones Adaptativas',
                description: 'Las preguntas se adaptan automáticamente al nivel de conocimiento del estudiante.',
                icon: '🎯'
              },
              {
                title: 'Retroalimentación Instantánea',
                description: 'Proporciona explicaciones detalladas y sugerencias de mejora inmediatamente.',
                icon: '💡'
              },
              {
                title: 'Análisis Avanzado',
                description: 'Genera reportes detallados sobre el rendimiento y áreas de mejora.',
                icon: '📊'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-quizzal-green mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-quizzal-green text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins">
              ¿Listo para revolucionar tus evaluaciones?
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Únete a miles de educadores que ya están transformando sus evaluaciones con Quizzal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-quizzal-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Crear mi Primera Evaluación
              </motion.button>
              <Link href="/#contacto">
                <motion.button 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-quizzal-green transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contactar Equipo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
