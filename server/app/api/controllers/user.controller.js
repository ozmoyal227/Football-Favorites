

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

const getFav = async (req, res, next) => {
    try {
        const userId = req.params.id;
        fav = await dbOperations.getFav(userId);
        res.send(fav);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addFavLeague = async (req, res, next) => {
    try {
        const id = req.params.id;
        const leagueId = req.body.id;
        const added = await dbOperations.addToFavLeagues(id, leagueId);
        res.send(added);
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