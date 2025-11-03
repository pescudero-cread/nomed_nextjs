'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="inicio" className="bg-white text-gray-900 py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-nomed-primary-light to-nomed-primary-bright opacity-20"></div>
      <div className="floating-particles"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins">
              Transformando la educación con
              <span className="text-nomed-secondary"> inteligencia artificial</span>
            </h1>
            <p className="text-xl leading-relaxed">
              Soluciones digitales que optimizan el aprendizaje de estudiantes y docentes 
              mediante inteligencia artificial, creando experiencias educativas innovadoras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="bg-nomed-primary text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold border border-nomed-primary-bright hover:bg-nomed-primary-bright transition-colors animate-bounce-in hover-lift"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comenzar Ahora
              </motion.button>
              <motion.button 
                className="border-2 border-nomed-primary text-nomed-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-nomed-primary-light hover:text-gray-900 transition-colors hover-lift"
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
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 character-hover">
              <div className="text-center space-y-6">
                <motion.div 
                  className="w-32 h-32 mx-auto character-entrance"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Image 
                    src="/images/characters/botbee.svg" 
                    alt="Botbee - Abeja Educativa" 
                    width={128}
                    height={128}
                    className="w-full h-full"
                  />
                </motion.div>
                <h3 className="text-2xl font-bold">IA Educativa</h3>
                <p className="text-lg opacity-90">Personalización del aprendizaje para cada estudiante</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
