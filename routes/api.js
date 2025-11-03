const express = require('express');
const router = express.Router();

// Import API controllers
const botbeeApiController = require('../controllers/api/botbeeApiController');
const monkitApiController = require('../controllers/api/monkitApiController');
const quizzalApiController = require('../controllers/api/quizzalApiController');
const contactApiController = require('../controllers/api/contactApiController');

// Botbee API routes
router.post('/botbee/chat', botbeeApiController.sendMessage);
router.post('/botbee/create-character', botbeeApiController.createCharacter);

// Monkit API routes
router.post('/monkit/generate-content', monkitApiController.generateContent);
router.post('/monkit/create-game', monkitApiController.createGame);

// Quizzal API routes
router.post('/quizzal/create-quiz', quizzalApiController.createQuiz);
router.post('/quizzal/submit-answer', quizzalApiController.submitAnswer);
router.get('/quizzal/quiz/:id', quizzalApiController.getQuiz);

// Contact API routes
router.post('/contact', contactApiController.sendMessage);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
