const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateWithToken = require('../middleware/authenticateToken');

router.get('/profile', authenticateWithToken, profileController.getProfilePage);
router.post('/profile', authenticateWithToken, profileController.updateUserProfile);
router.get('/user/:id', authenticateWithToken, profileController.viewUserProfile);
router.get('/profiles', authenticateWithToken, profileController.viewAllUserProfiles);

module.exports = router;
