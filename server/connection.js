const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'J1809-Umida',
    database: 'users'
});

module.exports = connection;