const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    // maybe change here the check to be from local storage
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
        return res.sendStatus(401).json("Error in getting token");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403).json("Token is not valid");
        req.user = user;
        next();
    });

}



// module.export = {
//     validateToken
// }
