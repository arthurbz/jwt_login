const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT name FROM Users WHERE id = $1",
            [req.user.id]
        );

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});

module.exports = router;