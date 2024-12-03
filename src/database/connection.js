const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    user: process.env.DB_USER
})

module.exports = pool