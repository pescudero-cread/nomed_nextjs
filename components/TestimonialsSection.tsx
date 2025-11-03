'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'María González',
    role: 'Profesora de Matemáticas',
    avatar: 'MG',
    quote: 'Botbee ha revolucionado la forma en que mis estudiantes aprenden. La personalización que ofrece la IA es increíble.'
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Director de Colegio',
    avatar: 'CR',
    quote: 'Las herramientas de NOMED han mejorado significativamente el rendimiento académico de nuestros estudiantes.'
  },
  {
    name: 'Ana Martínez',
    role: 'Estudiante Universitaria',
    avatar: 'AM',
    quote: 'Quizzal me ayuda a prepararme mejor para mis exámenes. Las evaluaciones son muy precisas y útiles.'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-nomed-primary">Testimonios de Usuarios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo nuestras herramientas han transformado la experiencia educativa
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-nomed-background rounded-2xl p-8 text-center animate-slide-up"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-20 h-20 bg-nomed-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{testimonial.avatar}</span>
              </div>
              <h4 className="text-xl font-bold text-nomed-primary mb-2">{testimonial.name}</h4>
              <p className="text-gray-600 mb-4">{testimonial.role}</p>
              <p className="text-gray-700 italic">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
