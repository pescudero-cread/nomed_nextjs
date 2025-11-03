const { validationResult } = require('express-validator');

// Enhanced Botbee API responses with personality
const botResponses = {
  greetings: [
    '¡Hola! Soy Botbee, tu asistente educativo. ¿En qué puedo ayudarte hoy? 🐝',
    '¡Saludos! Estoy aquí para hacer tu aprendizaje más divertido. ¿Qué te gustaría saber? ✨',
    '¡Hola! Me da mucho gusto conocerte. ¿Tienes alguna pregunta sobre tus estudios? 🌟'
  ],
  math: [
    '¡Excelente pregunta matemática! Te ayudo a resolverlo paso a paso. 📐',
    'Las matemáticas son fascinantes. Vamos a explorar este concepto juntos. 🔢',
    '¡Perfecto! Me encanta hablar de números. ¿Por dónde empezamos? ➕'
  ],
  science: [
    '¡Qué interesante pregunta científica! La ciencia es increíble, ¿verdad? 🧪',
    'Me encanta explorar los misterios de la ciencia contigo. 🔬',
    '¡Excelente! Vamos a descubrir juntos los secretos de la naturaleza. 🌱'
  ],
  language: [
    '¡Qué bonito que quieras mejorar tu lenguaje! Te ayudo con mucho gusto. 📚',
    'El lenguaje es la base de la comunicación. ¡Vamos a practicar juntos! 💬',
    '¡Perfecto! Me encanta ayudar con el lenguaje y la comunicación. ✍️'
  ],
  history: [
    '¡Perfecto! 📚 Soy muy bueno con fechas, eventos históricos y contextos. ¿Qué período histórico te interesa más?',
    '¡Qué emocionante! La historia está llena de aventuras. Vamos a explorar juntos. 🏛️',
    '¡Genial! Me encanta contar historias del pasado. ¿Qué época te fascina? ⏰'
  ],
  default: [
    '¡Qué interesante! Me gusta tu curiosidad. Te ayudo a explorar este tema. 🤔',
    '¡Excelente pregunta! Me encanta aprender contigo. 💡',
    '¡Qué genial! Vamos a descubrir esto juntos. 🚀'
  ]
};

// Personality responses
const personalityResponses = [
  '🐝 ¡Zumbido de emoción! ',
  '✨ ¡Qué emocionante! ',
  '🎯 ¡Perfecto! ',
  '🌟 ¡Increíble! ',
  '🚀 ¡Vamos a volar alto! ',
  '💫 ¡Qué maravilloso! ',
  '🎉 ¡Fantástico! '
];

// Send message to Botbee
const sendMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { message } = req.body;
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Enhanced keyword detection
    let responseType = 'default';
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('buenos')) {
      responseType = 'greetings';
    } else if (lowerMessage.includes('matemática') || lowerMessage.includes('número') || lowerMessage.includes('suma') || lowerMessage.includes('resta') || lowerMessage.includes('multiplicación') || lowerMessage.includes('división')) {
      responseType = 'math';
    } else if (lowerMessage.includes('ciencia') || lowerMessage.includes('experimento') || lowerMessage.includes('naturaleza') || lowerMessage.includes('física') || lowerMessage.includes('química') || lowerMessage.includes('biología')) {
      responseType = 'science';
    } else if (lowerMessage.includes('lenguaje') || lowerMessage.includes('español') || lowerMessage.includes('gramática') || lowerMessage.includes('literatura')) {
      responseType = 'language';
    } else if (lowerMessage.includes('historia') || lowerMessage.includes('histórico') || lowerMessage.includes('pasado') || lowerMessage.includes('época')) {
      responseType = 'history';
    }
    
    // Get random response from the appropriate category
    const selectedResponses = botResponses[responseType];
    const randomResponse = selectedResponses[Math.floor(Math.random() * selectedResponses.length)];
    
    // Add personality
    const personality = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
    const finalResponse = personality + randomResponse;
    
    res.json({
      success: true,
      response: finalResponse,
      timestamp: new Date().toISOString(),
      character: 'Botbee',
      mood: 'happy',
      category: responseType
    });

  } catch (error) {
    console.error('Error in Botbee API:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Create character
const createCharacter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, personality, subject, level } = req.body;
    
    // Simulate character creation
    const character = {
      id: Date.now().toString(),
      name,
      personality,
      subject,
      level,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    res.json({
      success: true,
      character,
      message: 'Personaje creado exitosamente'
    });

  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  sendMessage,
  createCharacter
};
