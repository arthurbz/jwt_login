const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

/* REGISTER ROUTE*/
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query("SELECT * FROM Users WHERE email = $1;", [email]);
        console.log("New user: ", email);

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

        const token = jwtGenerator(newUser.rows[0].id);

        res.json({ token });
    } catch (error) {
        console.log(error.message);
        req.status(500).send("Server error!");
    }
});

/* LOGIN ROUTE */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query("SELECT name, email, password FROM Users WHERE email = $1;",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json("Email or password is invalid!");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Email or password is invalid!");
        }

        const token = jwtGenerator(user.rows[0].id);

        res.json({ token });

    } catch (error) {
        console.log(error.message);
        req.status(500).send("Server error!");
    }
});

module.exports = router;