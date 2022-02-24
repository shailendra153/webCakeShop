const mysql = require('mysql');
module.exports = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    connectionLimit: 100,
    database: 'cake_on_door'
});