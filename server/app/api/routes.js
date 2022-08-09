const express = require('express');
const router = express.Router();
const validate = require('../middleware/auth.middleware');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/logout', authController.logout);
router.get('/users', userController.getAllUsers);
// router.get('/fav/:id', validate, userController.getFav);
// router.post('/addTeam/:id', validate, userController.addFavTeam);
// router.post('/addLeague/:id', validate, userController.addFavLeague);
// router.post('/rmvTeam/:id', validate, userController.rmvTeam);
// router.post('/rmvLeague/:id', validate, userController.rmvLeague);
// router.get('/favTeams/:id', userController.getFavTeams);



module.exports = {
    router
}