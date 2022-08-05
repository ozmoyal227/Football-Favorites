

const dbOperations = require('../../dbOperations');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await dbOperations.getUsers().then(result => result);
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    getAllUsers
}