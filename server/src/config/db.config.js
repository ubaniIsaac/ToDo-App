const mysql = require('mysql');



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'isaac',
    password: 'chimdindu1',
    database: 'todo'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Database connected")
})

module.exports = connection