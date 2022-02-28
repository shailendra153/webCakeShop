const { request } = require("express");
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
    static delete(id){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
                let sql = "delete from product where id =?";
                con.query(sql,[parseInt(id)],(err,result)=>{
                  err ? reject(err) : resolve(result);
                  con.release();
                });
            }
            else
              reject(err);
          });
        });
      }
 update(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {
                    console.log(request.body);
                    let sql = "update product set productName=?,productPrice=?,productQuantity=?,productImage=?,description=? where id=?";
                    databaseConnection.query(sql, [this.productName, this.productPrice * 1, this.productQuantity * 1, this.productImage, this.description, this.id * 1], (err, queryResult) => {
                        databaseConnection.release();
                        err ? reject(err) : resolve(queryResult);
                      
                    });

                }
            });
        });

    }
    static fetchProductById(id){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
               let sql = "select * from product where id =?";
               con.query(sql,[id*1],(err,result)=>{
                 err ? reject(err) : resolve(result);
                 con.release();
               });
            }
            else
              reject(err);
          });
        });
     }
    static productList() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, databaseConnection) => {
                if (err)
                    reject(err);
                else {

                    let sql = "select * from product ";
                    databaseConnection.query(sql, (err, queryResult) => {
                        databaseConnection.release();
                        err ? reject(err) : resolve(queryResult);
                    });

                }
            });
        });

    }

}