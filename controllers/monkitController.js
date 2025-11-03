const getMonkit = (req, res) => {
  const data = {
    title: 'Monkit - Herramientas para crear contenido educativo interactivo',
    description: 'Crea materiales y juegos educativos en segundos. Accede, configura y obtén contenido diverso con Monkit.',
    features: [
      {
        icon: 'book',
        title: 'Generación de Contenido',
        description: 'Crea materiales educativos basados en videos y temas específicos utilizando IA para generar contenido relevante y personalizado.'
      },
      {
        icon: 'smile',
        title: 'Juegos Interactivos',
        description: 'Diseña rompecabezas, sopas de letras y otros juegos educativos que promueven el aprendizaje activo y divertido.'
      },
      {
        icon: 'link',
        title: 'Integración Fácil',
        description: 'Conecta Monkit con tus plataformas educativas existentes para una implementación rápida y sin complicaciones.'
      }
    ],
    demoOptions: [
      {
        id: 'quiz',
        title: '📝 Crear un cuestionario',
        description: 'Genera preguntas automáticamente'
      },
      {
        id: 'game',
        title: '🎮 Diseñar un juego interactivo',
        description: 'Crea juegos educativos divertidos'
      },
      {
        id: 'material',
        title: '📚 Generar material educativo',
        description: 'Materiales de estudio personalizados'
      }
    ]
  };
  
  res.render('monkit', data);
};

module.exports = {
  getMonkit
};
