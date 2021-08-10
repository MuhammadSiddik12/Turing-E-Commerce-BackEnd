const mysql = require('mysql2')
require('dotenv').config()

const conn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected')
})