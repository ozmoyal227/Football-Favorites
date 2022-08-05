require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;
const routes = require('./app/api/routes');

// ---------testing db
const dbOperations = require('./app/dbOperations');
const User = require('./app/models/User');

// create table
// dbOperations.createTable();

// clear table data
dbOperations.clearTable();
const user1 = new User(1, 'poz', '[]', '["111111", "222222"]');
const user2 = new User(2, 'oz', '["123456", "789456"]', '[]');
// //add user
dbOperations.addUser(user1);
dbOperations.addUser(user2);

// const getUser = dbOperations.getUserById(user.id).then(result => console.log('user:', result));


// ---------end testing

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s" });
}

// API's

app.use('/api', routes.router);

// app.post('/login', (req, res) => {
//     //validation

//     // here i want to authenticate user first

//     const fakeUser = req.body;
//     const accessToken = generateAccessToken(fakeUser.id);
//     res.json({ accessToken: accessToken });

// })

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});