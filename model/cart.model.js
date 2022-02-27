const pool = require('../database/dbconfig');
module.exports = class Cart {
    constructor(productId, customerId) {
        this.productId = productId;
        this.customerId = customerId;
    }
    static fetchAllCartItem(customerId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    console.log("my sql tak pahoch rahi he....");
                    let sql = "select product.id,product.productName,product.productPrice,product.productQuantity,product.description,product.productImage,cart.id as cartId from product inner join cart on product.id = cart.productId where cart.customerId = ?";
                    con.query(sql, [customerId * 1], (err, queryResults) => {
                        con.release();
                        err ? reject(err) : resolve(queryResults);
                    });
                } else
                    reject(err);
            });
        });
    }


    addItemInCart() {
        console.log("in ssql");
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
                    let sql = "delete from cart where productId=? and customerId=?"
                    con.query(sql, [this.productId, this.customerId], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })

        });
    }
}