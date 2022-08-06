const dbOperations = require('../../dbOperations');
const User = require('../../models/User')

const register = async (req, res, next) => {
    try {
        const username = req.params.username;
        const password = req.params.password;
        const user = new User(username, password);
        const adding = await dbOperations.addUser(user);
        res.send(adding);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

