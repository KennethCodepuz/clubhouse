const { Router } = require('express');
const { valorantGet, leagueGet, genshinGet } = require('../controllers/groupController.js');
const { checkUser } = require('../middleware/authMiddleware.js');

const groupRoutes = Router();

groupRoutes.get('/valorant', checkUser, valorantGet);
groupRoutes.get('/leagueoflegends', leagueGet);
groupRoutes.get('/genshinimpact', genshinGet);

module.exports = groupRoutes;
