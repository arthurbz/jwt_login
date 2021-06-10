const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.headers("token");

        if (!jwtToken) {
            res.status(403).json("Not authorized");
        }

        const payload = jwt.verify(jwtToken, proccess.env.JWT_SECRET);

        req.user = payload.user;
    } catch (error) {
        console.error(error.message);
        res.status(403).json("Not authorized");
    }
}