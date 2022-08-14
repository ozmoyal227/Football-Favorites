const dbOperations = require('../../database/dbOperations');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s" });
}

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const allUsers = await dbOperations.getUsers();
        for (item of allUsers) {
            if (item.username === username) {
                res.status(409).json('Username already exist, please try again.');
                return;
            }
        }
        const user = new User(username, password);
        const adding = await dbOperations.addUser(user);
        res.status(200).json(user);
        return;
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const allUsers = await dbOperations.getUsers();
        for (item of allUsers) {
            if (item.username === username && item.password === password) {
                const user = {
                    id: item.id,
                    username: username,
                    favLeagues: item.favLeagues
                }
                const accessToken = generateAccessToken(user);
                user.token = `Bearer ${accessToken}`;
                res.status(200).json(user);
                return;
            }
        }
        res.status(403).json("Invalid Username or Password, please try again.");
        return;
    } catch (error) {
        res.status(400).json(error.message);
    }
}

// const logout = async (req, res) => {

// }

module.exports = {
    register,
    login,
    // logout
}
