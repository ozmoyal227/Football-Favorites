require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');



const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ authorized: true });
});


app.post('/login', (req, res) => {
    //validation

    // here i want to authenticate user first
    ;

    const fakeUser = req.body;
    console.log(fakeUser);
    const accessToken = jwt.sign(fakeUser, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });

})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});