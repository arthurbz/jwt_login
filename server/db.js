const Pool = require("pool").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "DATABASE_JWT"
});

module.exports = pool;