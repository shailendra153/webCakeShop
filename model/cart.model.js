const pool = require('../database/dbconfig');
module.exports = class Cart {
    constructor(productId, customerId) {
        this.productId = productId;
        this.customerId = customerId;
    }

    addInCart() {
        return new promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err)
                    reject(err);
                else {
                    let sql = "insert into cart(productId,customerId) values(?,?)"
                    con.query(sql, [this.productId, this.customerId], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })

        });
    }
    removeFromCart() {
        return new promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err)
                    reject(err);
                else {
                    let sql = "delete from cart where where productId=? and userId=?"
                    con.query(sql, [this.productId, this.customerId], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })

        });
    }
}