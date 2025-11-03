const { validationResult } = require('express-validator');

// Sample quiz data
const sampleQuizzes = {
  '1': {
    id: '1',
    title: 'Matemáticas Básicas',
    questions: [
      {
        id: 1,
        question: '¿Cuál es el resultado de 15 + 27?',
        options: [
          { id: 'A', text: '41', correct: false },
          { id: 'B', text: '42', correct: true },
          { id: 'C', text: '43', correct: false },
          { id: 'D', text: '44', correct: false }
        ],
        explanation: '15 + 27 = (10 + 20) + (5 + 7) = 30 + 12 = 42'
      },
      {
        id: 2,
        question: '¿Cuál es el resultado de 8 × 7?',
        options: [
          { id: 'A', text: '54', correct: false },
          { id: 'B', text: '56', correct: true },
          { id: 'C', text: '58', correct: false },
          { id: 'D', text: '60', correct: false }
        ],
        explanation: '8 × 7 = 56. Puedes verificarlo sumando 8 siete veces: 8+8+8+8+8+8+8 = 56'
      }
    ],
    totalQuestions: 2
  }
};

// Create quiz
const createQuiz = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, subject, level, questions } = req.body;
    
    // Simulate quiz creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const quiz = {
      id: Date.now().toString(),
      title,
      subject,
      level,
      questions: questions || [],
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    res.json({
      success: true,
      quiz,
      message: 'Evaluación creada exitosamente'
    });

  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Submit answer
const submitAnswer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { quizId, questionId, answerId } = req.body;
    
    // Simulate answer processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the question and check if answer is correct
    const quiz = sampleQuizzes[quizId];
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    const selectedOption = question.options.find(opt => opt.id === answerId);
    const isCorrect = selectedOption ? selectedOption.correct : false;
    
    res.json({
      success: true,
      isCorrect,
      explanation: question.explanation,
      correctAnswer: question.options.find(opt => opt.correct)
    });

  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Get quiz
const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    
    const quiz = sampleQuizzes[id];
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    res.json({
      success: true,
      quiz
    });

  } catch (error) {
    console.error('Error getting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  createQuiz,
  submitAnswer,
  getQuiz
};
