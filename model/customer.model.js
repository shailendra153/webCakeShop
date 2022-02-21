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
        this.customerRegisterDate = customerRegisterDate;
    };


    newCustomer() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {

                }
            })
        });
    }
}