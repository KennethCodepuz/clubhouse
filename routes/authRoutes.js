const { Router } = require('express');
const authControllers = require('../controllers/authControllers.js');

const router = Router();

router.get('/signup', authControllers.signupGet);
router.get('/login', authControllers.loginGet);

router.post('/signup', authControllers.signupPost);
router.post('/login', authControllers.loginPost);
router.post('/logout', authControllers.logoutPost);

module.exports = router;