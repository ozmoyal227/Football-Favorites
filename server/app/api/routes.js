const express = require('express');
const router = express.Router();
const userController = require('./controllers/user.controller');

router.post('/register',);
router.post('/login',);
router.get('/users', userController.getAllUsers);
router.get('/favTeams',);
router.get('/favLeagues',);

module.exports = {
    router
}