const PoolNamespace = require("mysql/lib/PoolNamespace");
const pool = require("../database/dbconfig");
module.exports = class Product {
    constructor(productName, productPrice, productQuantity, categoryId, productImage, description) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
        this.categoryId = categoryId;
        this.productImage = productImage;
        this.description = description;
    }
    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {
                    console.log(this.productImage);
                    let sql = "insert into product(productName, productPrice, productQuantity, categoryId, productImage, description) values(?,?,?,?,?,?)";
                    databaseConnection.query(sql, [this.productName, this.productPrice * 1, this.productQuantity * 1, this.categoryId * 1, this.productImage, this.description], (err, queryResult) => {
                        databaseConnection.release();
                        err ? reject(err) : resolve(queryResult);
                    });

                }
            });
        });
    }
    delete(id) {
        this.id = id;
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {

                    let sql = "delete from product where id=?";
                    databaseConnection.query(sql, [this.id * 1], (err, queryResult) => {
                        databaseConnection.release();
                        err ? reject(err) : resolve(queryResult);
                    });

                }
            });
        });
    }
    static update(id) {
        this.id = id;

        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {

                    let sql = "update product set productName=?,productPrice=?,productQuantity=?,categoryId=?,productImage=?,description=? where id=?";
                    databaseConnection.query(sql, [this.productName, this.productPrice * 1, this.productQuantity * 1, this.categoryId * 1, this.productImage, this.description, this.id * 1], (err, queryResult) => {
                        databaseConnection.release();
                        err ? reject(err) : resolve(queryResult);
                    });

                }
            });
        });

    }
    static productById(id) {
        this.id = id;
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {

                    let sql = "select * from product where id=?";
                    databaseConnection.query(sql, [this.id * 1], (err, queryResult) => {
                        databaseConnection.release();
                        err ? reject(err) : resolve(queryResult);
                    });

                }
            });
        });

    }
    static fetchAllProduct(currentCustomerId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "";
                    if (currentCustomerId) {
                        sql = "select product.id,product.productName,product.productPrice,product.productQuantity,product.description,product.productImage,cart.productId from product left outer join cart on product.id=cart.productId and cart.customerId=" + currentCustomerId;
                    } else
                        sql = "select * from product";
                    con.query(sql, (err, queryResults) => {
                        con.release();
                        err ? reject(err) : resolve(queryResults);
                    });
                } else
                    reject(err);
            })
        });

    }

}