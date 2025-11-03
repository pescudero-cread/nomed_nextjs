// Handlers y tipos para peticiones del App Router
import { NextRequest, NextResponse } from 'next/server'

// Genera contenido de blog simulado según un tópico y formato
export async function POST(request: NextRequest) {
  try {
    const { topic, format } = await request.json()

    if (!topic || !format) {
      return NextResponse.json(
        { message: 'Tópico y formato son requeridos' },
        { status: 400 }
      )
    }

    // Simulación de generación de contenido con IA
    // En producción, integrar con OpenAI/Google AI/otro proveedor
    const content = generateBlogContent(topic, format)

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error al generar contenido:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Retorna un contenido de ejemplo según formato solicitado
function generateBlogContent(topic: string, format: string): string {
  const templates = {
    noticias: `
# ${topic}: Una Perspectiva Actual

## Introducción
En el mundo actual, ${topic} se ha convertido en un tema de gran relevancia. Los últimos desarrollos en esta área han generado un impacto significativo en diversos sectores.

## Desarrollo
Los avances recientes en ${topic} han demostrado que:

- La tecnología está evolucionando rápidamente
- Los beneficios son cada vez más evidentes
- La adopción está creciendo exponencialmente

## Impacto
El impacto de ${topic} se puede observar en múltiples dimensiones:

1. **Económica**: Contribuye al crecimiento del PIB
2. **Social**: Mejora la calidad de vida de las personas
3. **Tecnológica**: Acelera la innovación

## Conclusiones
${topic} representa una oportunidad única para transformar la manera en que abordamos los desafíos actuales. Es fundamental continuar invirtiendo en investigación y desarrollo para maximizar sus beneficios.

## Sobre la Empresa
En NOMED, estamos comprometidos con la innovación educativa y el desarrollo de soluciones tecnológicas que transformen el aprendizaje.

## Organigrama
Nuestro equipo está compuesto por profesionales especializados en educación, tecnología e inteligencia artificial, trabajando de manera colaborativa para alcanzar nuestros objetivos.

## Sobre los Productos
Nuestros productos están diseñados para optimizar el proceso de aprendizaje mediante el uso de inteligencia artificial, creando experiencias educativas personalizadas y efectivas.
    `,
    
    investigacion: `
# Investigación: ${topic}

## Resumen Ejecutivo
Esta investigación analiza los aspectos fundamentales de ${topic}, proporcionando una visión integral de su estado actual y perspectivas futuras.

## Metodología
Para este estudio se utilizó una metodología mixta que incluye:

- Análisis de datos cuantitativos
- Revisión de literatura especializada
- Entrevistas con expertos en el campo

## Hallazgos Principales
Los resultados de la investigación revelan que:

### 1. Estado Actual
${topic} presenta un desarrollo significativo en los últimos años, con avances notables en diferentes áreas.

### 2. Tendencias Emergentes
Se identifican varias tendencias que están moldeando el futuro de ${topic}:

- Integración tecnológica
- Sostenibilidad
- Accesibilidad

### 3. Desafíos Identificados
Entre los principales desafíos se encuentran:

- Barreras regulatorias
- Limitaciones técnicas
- Recursos limitados

## Recomendaciones
Basado en los hallazgos, se recomienda:

1. Fortalecer la colaboración entre sectores
2. Invertir en investigación y desarrollo
3. Desarrollar marcos regulatorios apropiados

## Conclusiones
${topic} representa un campo en constante evolución que requiere atención continua y enfoques innovadores para maximizar su potencial.

## Sobre la Empresa
NOMED se posiciona como líder en investigación educativa, desarrollando soluciones basadas en evidencia científica.

## Organigrama
Nuestro equipo de investigación está compuesto por doctores y especialistas en diferentes áreas, garantizando un enfoque multidisciplinario.

## Sobre los Productos
Cada producto de NOMED está respaldado por investigación rigurosa y validación empírica, asegurando su efectividad.
    `,
    
    opinion: `
# Opinión: Reflexiones sobre ${topic}

## Mi Perspectiva
Como especialista en el campo, considero que ${topic} representa una oportunidad única para transformar nuestra manera de pensar y actuar.

## ¿Por qué es Importante?
${topic} no es solo una tendencia pasajera, sino un cambio fundamental que está redefiniendo:

- Nuestras expectativas
- Nuestros comportamientos
- Nuestro futuro

## Los Pros y Contras
### Ventajas
- Mayor eficiencia
- Mejores resultados
- Acceso democratizado

### Desventajas
- Curva de aprendizaje
- Costos iniciales
- Resistencia al cambio

## Mi Experiencia Personal
A lo largo de mi carrera, he observado cómo ${topic} ha evolucionado. Los cambios han sido tanto desafiantes como emocionantes.

## Lo que Deberíamos Considerar
Es fundamental que abordemos ${topic} con:

1. **Mente abierta**: Estar dispuestos a aprender
2. **Pensamiento crítico**: Evaluar pros y contras
3. **Visión a largo plazo**: Considerar el impacto futuro

## Mi Recomendación
Basado en mi experiencia, recomiendo que:

- Nos mantengamos informados sobre los desarrollos
- Participemos activamente en la conversación
- Contribuyamos con nuestra perspectiva única

## Reflexión Final
${topic} nos invita a repensar lo que creíamos saber y a abrazar nuevas posibilidades. Es un momento emocionante para estar involucrados en este campo.

## Sobre la Empresa
En NOMED, creemos firmemente en el poder de la innovación educativa y en la importancia de compartir nuestras perspectivas con la comunidad.

## Organigrama
Nuestro equipo diverso aporta diferentes puntos de vista, enriqueciendo nuestras discusiones y decisiones.

## Sobre los Productos
Cada producto refleja nuestra filosofía y valores, diseñado con la convicción de que la educación puede ser transformada positivamente.
    `
  }

  return templates[format as keyof typeof templates] || templates.noticias
}
