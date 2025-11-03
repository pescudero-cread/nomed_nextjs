'use client'

import { motion } from 'framer-motion'

const team = [
  { name: 'Dr. Juan Pérez', role: 'CEO & Fundador', avatar: 'JP' },
  { name: 'Dra. María López', role: 'CTO', avatar: 'ML' },
  { name: 'Ing. Carlos Ruiz', role: 'Lead Developer', avatar: 'CR' },
  { name: 'Lic. Ana García', role: 'UX Designer', avatar: 'AG' }
]

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-20 bg-nomed-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-nomed-primary">Sobre Nosotros</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-nomed-secondary mb-3">Nuestra Misión</h3>
                <p className="text-gray-700 leading-relaxed">
                  Mejorar la calidad educativa mediante el uso de inteligencia artificial para crear 
                  herramientas digitales que optimicen el proceso de aprendizaje y hagan la educación 
                  más accesible e interactiva para todos.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-nomed-accent-medium mb-3">Nuestra Visión</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ser líderes en la transformación educativa a través de la tecnología, 
                  creando un mundo donde el aprendizaje sea personalizado, eficiente y 
                  accesible para estudiantes de todas las edades y contextos.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-nomed-primary">Nuestro Equipo</h3>
            <div className="grid grid-cols-2 gap-6">
              {team.map((member, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-24 h-24 bg-nomed-primary rounded-full mx-auto mb-4 flex items-center justify-center ring-1 ring-nomed-primary-bright">
                    <span className="text-2xl font-bold text-gray-900">{member.avatar}</span>
                  </div>
                  <h4 className="font-bold text-nomed-primary">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="bg-white rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-nomed-primary mb-3">Alianzas</h4>
              <p className="text-gray-700">
                Trabajamos en colaboración con la <strong>Asociación CREAD</strong> y otras 
                organizaciones educativas para reforzar nuestro compromiso con la mejora 
                de la calidad educativa.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
