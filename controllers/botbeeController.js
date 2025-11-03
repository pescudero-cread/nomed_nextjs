const getBotbee = (req, res) => {
  const data = {
    title: 'Botbee - Personajes interactivos para el aprendizaje dinámico',
    description: 'Crea personajes interactivos que plantean preguntas y explican conceptos de manera dinámica y divertida.',
    features: [
      {
        icon: 'settings',
        title: 'Panel Intuitivo',
        description: 'Crea y configura personajes de manera fácil con nuestro panel intuitivo que no requiere conocimientos técnicos avanzados.'
      },
      {
        icon: 'chat',
        title: 'Conexión Fácil',
        description: 'Conecta tu personaje con WhatsApp, Telegram y otras plataformas de mensajería para llegar a tus estudiantes donde estén.'
      },
      {
        icon: 'check',
        title: 'Respuestas Controladas',
        description: 'Alimenta tu personaje con fuentes confiables como Wikipedia para asegurar respuestas precisas y educativas.'
      }
    ],
    demoMessages: [
      {
        type: 'bot',
        message: '¡Hola! 👋 Soy Botbee, tu asistente educativo. ¿En qué materia puedo ayudarte hoy?'
      }
    ]
  };
  
  res.render('botbee-new', data);
};

module.exports = {
  getBotbee
};
