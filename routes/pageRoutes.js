const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authenticateWithToken = require('../middleware/authenticateToken'); 

router.get('/login', pageController.getLoginPage);
router.get('/register', pageController.getRegisterPage);
router.get('/dashboard', authenticateWithToken, pageController.getDashboardPage);

module.exports = router;
