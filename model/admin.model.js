const pool = require('../database/dbconfig');
module.exports = class Admin {
    constructor(email, password) {
        this.password = password;
        this.email = email;
    }
    checkAdmin() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {

                    let sql = "select * from admin where email=? and password=?";
                    databaseConnection.query(sql, [this.email, this.password], (err, queryResult) => {
                        databaseConnection.release();
                        err ? reject(err) : resolve(queryResult);
                    });

                }
            });
        });
    }
}