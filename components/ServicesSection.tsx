'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    id: 'botbee',
    name: 'Botbee',
    description: 'Personajes interactivos para el aprendizaje dinámico',
    image: '/images/characters/botbee.png.png',
    color: 'botbee-honey',
    hoverColor: 'botbee-honey-dark',
    borderColor: 'border-botbee-honey',
    link: '/botbee',
    cta: '¡Crea tu personaje interactivo ahora!'
  },
  {
    id: 'monkit',
    name: 'Monkit',
    description: 'Herramientas para crear contenido educativo interactivo',
    image: '/images/characters/monkit.svg',
    color: 'monkit-orange',
    hoverColor: 'monkit-orange-deep',
    borderColor: 'border-monkit-orange',
    link: '/monkit',
    cta: 'Empieza a crear contenido educativo'
  },
  {
    id: 'quizzal',
    name: 'Quizzal',
    description: 'Plataforma de evaluaciones personalizadas',
    image: '/images/characters/quizzal.png.png',
    color: 'quizzal-green',
    hoverColor: 'quizzal-forest',
    borderColor: 'border-quizzal-green',
    link: '/quizzal',
    cta: 'Crea tu evaluación personalizada ahora'
  },
  {
    id: 'app-nomed',
    name: 'App Nomed',
    description: 'Refuerzo académico interactivo para estudiantes',
    image: '/images/characters/app-nomed.svg',
    color: 'app-nomed-blue',
    hoverColor: 'nomed-primary',
    borderColor: 'border-app-nomed-blue',
    link: '/app-nomed',
    cta: 'Accede a nuestra app para mejorar tu aprendizaje'
  }
]

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 bg-nomed-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-nomed-primary">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestras herramientas de IA diseñadas para revolucionar la educación
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${service.borderColor} border-opacity-20 animate-fade-in hover-lift`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 character-hover">
                <Image 
                  src={service.image} 
                  alt={`${service.name} - Personaje Educativo`} 
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
              <h3 className={`text-xl font-bold text-${service.color} mb-3`}>{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                href={service.link}
                className={`bg-${service.color} text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold border border-${service.color} hover:bg-${service.hoverColor} transition-colors inline-block hover-lift`}
              >
                {service.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
