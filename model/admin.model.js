const pool = require('../database/dbconfig');
module.exports = class Admin {
    constructor(text, password) {
        this.password = password;
        if (parseInt(text))
            this.number = text;
        else
            this.email = text;
    }
    checkAdmin() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {
                    if (this.number) {
                        let sql = "select * from admin where number=? and password=?";
                        databaseConnection.query(sql, [this.number, this.password], (err, queryResult) => {
                            databaseConnection.release();
                            err ? reject(err) : resolve(queryResult);
                        });
                    }
                    if (this.email) {
                        let sql = "select * from admin where email=? and password=?";
                        databaseConnection.query(sql, [this.email, this.password], (err, queryResult) => {
                            databaseConnection.release();
                            err ? reject(err) : resolve(queryResult);
                        });
                    }
                }
            });
        });
    }
}