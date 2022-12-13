const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'wekPLYau123456@',
    host: 'localhost',
    port: 5432,
    database: 'reptiles'
});

module.exports = pool;