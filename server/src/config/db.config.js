const mysql = require('mysql2');
require("dotenv").config();


const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Database connected")
})

module.exports = connection