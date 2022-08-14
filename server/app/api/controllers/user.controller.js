

const { user } = require('../../config/db.config');
const dbOperations = require('../../database/dbOperations');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await dbOperations.getUsers();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFav = async (req, res) => {
    try {
        const userId = req.params.id;
        fav = await dbOperations.getFavLeagues(userId);
        res.send(fav);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addFavLeague = async (req, res) => {
    try {
        const userId = req.params.id;
        const leagueId = req.body.id;
        const favLeagues = await dbOperations.addToFavLeagues(userId, leagueId);
        res.send(favLeagues);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const rmvLeague = async (req, res, next) => {
    try {
        const id = req.params.id;
        const leagueId = req.body.id;
        const removed = await dbOperations.rmvFromFavLeagues(id, leagueId);
        res.send(removed);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    getAllUsers,
    // getFavTeams,
    getFav,
    addFavLeague,
    rmvLeague
}