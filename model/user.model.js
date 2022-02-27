const pool = require('../database/dbconfig');
module.exports = class User {
    constructor(cusName, cusEmail, cusMobile, cusPassword, cusAddress, cusGender) {
        this.cusName = cusName;
        this.cusEmail = cusEmail;
        this.cusMobile = cusMobile;
        this.cusPassword = cusPassword;
        this.cusAddress = cusAddress;
        this.cusGender = cusGender;
    }
    checkUser() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from customer where cusEmail =? and cusPassword = ?";
                    con.query(sql, [this.cusEmail, this.cusPassword], (err, queryResult) => {
                        con.release();
                        err ? reject(err) : resolve(queryResult);
                    });
                } else
                    reject(err);
            });
        });
    }
    static getCurrentUser(cusEmail) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from customer where cusEmail=?";
                    con.query(sql, [cusEmail], (err, queryResult) => {
                        con.release();
                        err ? reject(err) : resolve(queryResult);
                    });
                } else
                    reject(err);
            })
        });
    }
    signup() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into customer(cusName,cusEmail,cusMobile,cusPassword,cusAddress,cusGender) values(?,?,?,?,?,?)";
                    con.query(sql, [this.cusName, this.cusEmail, this.cusMobile, this.cusPassword, this.cusAddress, this.cusGender], (err, queryResult) => {
                        con.release();
                        err ? reject(err) : resolve(queryResult);
                    });
                } else
                    reject(err);
            });
        });
    }
}