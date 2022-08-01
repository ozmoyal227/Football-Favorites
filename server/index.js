require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;

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