const { reject } = require('async');
const { promiseImpl } = require('ejs');
const { resolve } = require('path/posix');
const pool = require('../database/dbconfig');
module.exports = class Customer {
    constructor(customerName, customerEmail, customerMobile, customerPassword, customerAddress, customerGender, customerRegisterDate) {
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerMobile = customerMobile;
        this.customerPassword = customerPassword;
        this.customerAddress = customerAddress;
        this.customerGender = customerGender;

    };
    customerRagister() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {

                    let sql = "insert into customer(cusName,cusEmail,cusMobile,cusPassword,cusAddress,cusGender) values(?,?,?,?,?,?)";
                    databaseConnection.query(sql, [this.customerName, this.customerEmail, this.customerMobile, this.customerPassword, this.customerAddress, this.customerGender], (err, queryResult) => {
                        databaseConnection.release();
                        err ? reject(err) : resolve(queryResult);
                    });

                }
            });
        });
    }


}