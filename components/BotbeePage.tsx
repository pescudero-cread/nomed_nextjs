'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function BotbeePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-botbee-honey to-botbee-honey-dark">
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
                Conoce a <span className="text-botbee-highlight">Botbee</span>
              </h1>
              <p className="text-xl leading-relaxed">
                Nuestra abeja educativa que revoluciona el aprendizaje a través de personajes 
                interactivos y personalizados. Botbee adapta su enseñanza a cada estudiante, 
                creando experiencias únicas y motivadoras.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="bg-white text-botbee-honey px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Crear mi Botbee
                </motion.button>
                <motion.button 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-botbee-honey transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Demo
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
                      src="/images/characters/botbee.png.png" 
                      alt="Botbee - Abeja Educativa" 
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                      unoptimized
                      priority
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold">¡Hola! Soy Botbee</h3>
                  <p className="text-lg opacity-90">
                    Tu compañero de aprendizaje inteligente
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
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-botbee-honey">Características de Botbee</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todas las funcionalidades que hacen de Botbee tu mejor aliado educativo
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalización Inteligente',
                description: 'Botbee se adapta al estilo de aprendizaje de cada estudiante, ofreciendo contenido personalizado y relevante.',
                icon: '🧠'
              },
              {
                title: 'Interacción Natural',
                description: 'Conversaciones fluidas y naturales que hacen que el aprendizaje sea más divertido y efectivo.',
                icon: '💬'
              },
              {
                title: 'Gamificación',
                description: 'Sistema de recompensas y logros que motiva a los estudiantes a seguir aprendiendo.',
                icon: '🎮'
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
                <h3 className="text-xl font-bold text-botbee-honey mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-botbee-honey text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins">
              ¿Listo para comenzar tu aventura con Botbee?
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Únete a miles de estudiantes que ya están transformando su aprendizaje con nuestra abeja educativa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-botbee-honey px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Crear mi Botbee Ahora
              </motion.button>
              <Link href="/#contacto">
                <motion.button 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-botbee-honey transition-colors"
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
