const { Router } = require('express');
const { loginController, registerController, logoutController } = require('../../../controllers/sessions.controller');

const router = Router();

// Sessions Routes
router.post('/login', loginController);
router.post('/register', registerController);
router.get('/logout', logoutController);
module.exports = router;