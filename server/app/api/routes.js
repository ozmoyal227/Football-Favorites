const express = require('express');
const router = express.Router();
const userController = require('./controllers/user.controller');

router.post('/register',);
router.post('/login',);
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