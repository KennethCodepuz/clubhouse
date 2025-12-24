const { Router } = require('express');
const { createPost, groupGetPosts} = require('../controllers/groupController/groupController.js');
const { checkUser } = require('../middleware/authMiddleware.js');

const groupRoutes = Router();

groupRoutes.get('/group/:group', checkUser, groupGetPosts);

groupRoutes.post('/group/:group', checkUser, createPost);

module.exports = groupRoutes;
