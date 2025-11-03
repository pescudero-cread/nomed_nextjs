const express = require('express');
const router = express.Router();

// Import controllers
const homeController = require('../controllers/homeController');
const botbeeController = require('../controllers/botbeeController');
const monkitController = require('../controllers/monkitController');
const quizzalController = require('../controllers/quizzalController');
const appNomedController = require('../controllers/appNomedController');

// Home page
router.get('/', homeController.getHome);

// Product pages
router.get('/botbee', botbeeController.getBotbee);
router.get('/monkit', monkitController.getMonkit);
router.get('/quizzal', quizzalController.getQuizzal);
router.get('/app-nomed', appNomedController.getAppNomed);

// Contact form
router.post('/contact', homeController.postContact);

module.exports = router;
