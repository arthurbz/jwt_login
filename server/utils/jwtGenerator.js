const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
    const payload = {
        user: {
          id: user_id
        }
      };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 30})
}

module.exports = jwtGenerator;