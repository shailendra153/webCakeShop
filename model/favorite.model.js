const pool = require('../database/dbconfig');
module.exports = class Favorite {
    constructor(productId, customerId) {
        this.productId = productId;
        this.customerId = customerId;
    }

    addInFavorite() {
        return new promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err)
                    reject(err);
                else {
                    let sql = "insert into favorite(productId,customerId) values(?,?)"
                    con.query(sql, [this.productId, this.customerId], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })

        });
    }
    removeFromFavorite() {
        return new promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err)
                    reject(err);
                else {
                    let sql = "delete from favorite where where productId=? and userId=?"
                    con.query(sql, [this.productId, this.customerId], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })

        });
    }
}