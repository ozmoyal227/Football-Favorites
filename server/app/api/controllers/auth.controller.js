const dbOperations = require('../../database/dbOperations');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcrypt');


const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s" });
}

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const allUsers = await dbOperations.getUsers();
        for (item of allUsers) {
            if (item.username === username) {
                res.status(409).json('Username already exist, please try again.');
                return;
            }
        }
        const user = new User(username, hashedPassword);
        const added = await dbOperations.addUser(user);
        if (added)
            res.status(200).json(user);
        else res.status(400).json(user);
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
            if (item.username === username) {
                const isAuth = await bcrypt.compare(password, item.password);
                if (isAuth) {
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
