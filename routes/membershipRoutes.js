const { Router } = require('express');
const { membershipGet, membershipPost } = require('../controllers/membershipControllers.js');
const { checkUser, requireAuth } = require('../middleware/authMiddleware.js');

const membershipRoutes = Router();

membershipRoutes.get('/membership', checkUser, requireAuth, membershipGet)
membershipRoutes.post('/membership', checkUser, membershipPost)

module.exports = membershipRoutes;