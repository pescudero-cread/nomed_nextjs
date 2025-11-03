const getAppNomed = (req, res) => {
  const data = {
    title: 'App Nomed - Refuerzo académico interactivo para estudiantes',
    description: 'Aplicación móvil integral con contenido interactivo, gamificación y aprendizaje personalizado.',
    features: [
      {
        icon: 'book',
        title: 'Contenido Interactivo',
        description: 'Matemáticas y otras áreas con contenido interactivo que se adapta al nivel y ritmo de aprendizaje de cada estudiante.'
      },
      {
        icon: 'smile',
        title: 'Gamificación',
        description: 'Sistema de recompensas, logros y niveles que hacen el aprendizaje más atractivo y motivador para los estudiantes.'
      },
      {
        icon: 'clock',
        title: 'Accesible 24/7',
        description: 'Acceso en cualquier momento y lugar desde tu dispositivo móvil, permitiendo estudiar cuando y donde quieras.'
      }
    ],
    mobileScreens: [
      {
        id: 'welcome',
        title: '¡Bienvenido!',
        subtitle: 'Selecciona tu materia favorita',
        content: [
          { type: 'button', text: '📐 Matemáticas', active: true },
          { type: 'button', text: '📚 Historia', active: false },
          { type: 'button', text: '🧪 Ciencias', active: false }
        ]
      },
      {
        id: 'quiz',
        title: 'Matemáticas',
        level: 'Nivel 3',
        progress: 60,
        question: '15 + 27 = ?',
        questionNumber: 'Pregunta 5 de 10',
        options: [
          { text: 'A) 41', correct: false },
          { text: 'B) 42', correct: true }
        ],
        points: 150,
        streak: 3
      },
      {
        id: 'completion',
        title: '¡Nivel Completado!',
        score: '850/1000',
        time: '4:32',
        achievements: '+3',
        actions: [
          { text: 'Siguiente Nivel', primary: true },
          { text: 'Repetir', primary: false }
        ]
      }
    ]
  };
  
  res.render('app-nomed', data);
};

module.exports = {
  getAppNomed
};
