require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;

// ---------testing db
const dbOperations = require('./app/dbOperations');
const User = require('./app/models/User');

// delete table
dbOperations.clearTable();
const user1 = new User(2, 'poz', '[]');
const user2 = new User(3, 'oz', '["123456", "789456"]');
// //add user
dbOperations.addUser(user1);
dbOperations.addUser(user2);

//getting users
dbOperations.getUsers().then(result => console.log('users:', result));

// const getUser = dbOperations.getUserById(user.id).then(result => console.log('user:', result));

//getting favTeams of user
dbOperations.getFavTeams(3).then(result => console.log('favTeams:', result));

//adding to user favTeams
// dbOperations.addToFavTeams(2, '4444');
dbOperations.getUsers().then(result => console.log('users:', result));


// ---------end testing

app.use(express.json());
app.use(cors());

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s" });
}

// API's

app.post('/login', (req, res) => {
    //validation

    // here i want to authenticate user first

    const fakeUser = req.body;
    const accessToken = generateAccessToken(fakeUser.id);
    res.json({ accessToken: accessToken });

})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});