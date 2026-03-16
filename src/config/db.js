const { Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432
})
module.exports = pool;