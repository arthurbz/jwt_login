const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query("SELECT * FROM Users WHERE email = $1;", [email]);
        console.log("User: ", email);

        if (user.rows.length !== 0) {
            console.log("User ", email, " aready exists!");
            return res.status(401).send("User already exists!")
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *;",
            [name, email, bcryptPassword]
        );

        res.json(newUser.rows[0]);
    } catch (error) {
        console.log(error.message);
        req.status(500).send("Server Error!");
    }
});

module.exports = router;