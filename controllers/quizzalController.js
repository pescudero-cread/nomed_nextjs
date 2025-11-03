const getQuizzal = (req, res) => {
  const data = {
    title: 'Quizzal - Plataforma de evaluaciones personalizadas',
    description: 'Crea evaluaciones personalizadas, simulaciones de exámenes de admisión y certificaciones para docentes.',
    features: [
      {
        icon: 'book',
        title: 'Banco de Preguntas',
        description: 'Importa y organiza un extenso banco de preguntas de diferentes materias y niveles para crear evaluaciones personalizadas.'
      },
      {
        icon: 'zap',
        title: 'Retroalimentación Inmediata',
        description: 'Proporciona retroalimentación instantánea a los estudiantes con explicaciones detalladas y sugerencias de mejora.'
      },
      {
        icon: 'smartphone',
        title: 'Acceso Multiplataforma',
        description: 'Accede a tus evaluaciones desde cualquier dispositivo: computadora, tablet o smartphone, en cualquier momento.'
      }
    ],
    demoQuiz: {
      title: 'Evaluación Demo - Matemáticas',
      currentQuestion: 1,
      totalQuestions: 5,
      progress: 20,
      question: '¿Cuál es el resultado de 15 + 27?',
      options: [
        { id: 'A', text: '41', correct: false },
        { id: 'B', text: '42', correct: true },
        { id: 'C', text: '43', correct: false },
        { id: 'D', text: '44', correct: false }
      ]
    }
  };
  
  res.render('quizzal', data);
};

module.exports = {
  getQuizzal
};
