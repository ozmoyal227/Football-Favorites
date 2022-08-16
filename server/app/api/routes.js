const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.get('/users', userController.getAllUsers);
// router.get('/fav/:id', validate, userController.getFav);
router.post('/addLeague/:id', authMiddleware.validateToken, userController.addFavLeague);
router.post('/rmvLeague/:id', userController.rmvLeague);
// router.get('/favTeams/:id', userController.getFavTeams); need to be change for get leagues



module.exports = {
    router
}