const pool = require("../database/dbconfig");
module.exports = class Product {
  constructor(productName, productPrice, productQty, productDescription, categoryId, frontViewImage, backViewImage, leftViewImage, rightViewImage) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQty = productQty;
    this.productDescription = productDescription;
    this.categoryId = categoryId;
    this.frontViewImage = frontViewImage;
    this.backViewImage = backViewImage;
    this.leftViewImage = leftViewImage;
    this.rightViewImage = rightViewImage;
  }

  save() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        console.log(this.categoryId + "c");
        if (!err) {
          let sql = "insert into product(productName,productPrice,productQty,productDescription,categoryId,frontViewImage,backViewImage,leftViewImage,rightViewImage) values(?,?,?,?,?,?,?,?,?)";
          con.query(sql, [
            this.productName,
            this.productPrice * 1,
            this.productQty * 1,
            this.productDescription,
            1,
            this.frontViewImage,
            this.backViewImage,
            this.leftViewImage,
            this.rightViewImage
          ], (err, queryResult) => {
            con.release();
            err ? reject(err) : resolve(queryResult);
          });
        } else
          reject(err);
      })
    });
  }
}