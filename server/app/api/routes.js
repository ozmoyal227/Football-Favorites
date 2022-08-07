const express = require('express');
const router = express.Router();
const validate = require('../middleware/auth.middleware');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', userController.getAllUsers);
router.get('/fav/:id', userController.getFav);
router.post('/addTeam/:id', userController.addFavTeam);
router.post('/addLeague/:id', userController.addFavLeague);
router.post('/rmvTeam/:id', userController.rmvTeam);
router.post('/rmvLeague/:id', userController.rmvLeague);
// router.get('/favTeams/:id', userController.getFavTeams);



module.exports = {
    router
}