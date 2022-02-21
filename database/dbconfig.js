const mysql = require('mysql');
module.exports = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    connectionLimit: 100,
    database: ' cake_on_door;'
});