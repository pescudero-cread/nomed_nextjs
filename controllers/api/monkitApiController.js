const { validationResult } = require('express-validator');

// Generate educational content
const generateContent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { type, subject, level, topic } = req.body;
    
    // Simulate content generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let content = {};
    
    switch (type) {
      case 'quiz':
        content = {
          title: `Cuestionario de ${topic}`,
          questions: [
            {
              question: `¿Cuál es la capital de Chile?`,
              options: ['Santiago', 'Valparaíso', 'Concepción'],
              correct: 0
            }
          ]
        };
        break;
      case 'game':
        content = {
          title: `Juego Interactivo - ${topic}`,
          type: 'puzzle',
          grid: ['A', 'B', 'C'],
          description: 'Rompecabezas educativo generado automáticamente'
        };
        break;
      case 'material':
        content = {
          title: `Material Educativo - ${topic}`,
          resources: [
            'Guía de estudio PDF',
            'Presentación interactiva',
            'Resumen ejecutivo'
          ]
        };
        break;
    }
    
    res.json({
      success: true,
      content,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Create educational game
const createGame = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { gameType, subject, difficulty, questions } = req.body;
    
    // Simulate game creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const game = {
      id: Date.now().toString(),
      type: gameType,
      subject,
      difficulty,
      questions: questions || [],
      createdAt: new Date().toISOString(),
      status: 'ready'
    };
    
    res.json({
      success: true,
      game,
      message: 'Juego creado exitosamente'
    });

  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  generateContent,
  createGame
};
