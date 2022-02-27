  const pool = require('../database/dbconfig');
  module.exports = class Category {
      constructor(categoryName, categoryImage) {
          this.categoryName = categoryName;
          this.categoryImage = categoryImage;
      }

      save() {
          return new Promise((resolve, reject) => {
              pool.getConnection((err, con) => {
                  if (!err) {
                      let sql = "insert into category(categoryName,categoryImage) values(?,?)";
                      con.query(sql, [this.categoryName, this.categoryImage], (err, queryResult) => {
                          con.release();
                          err ? reject(err) : resolve(queryResult);
                      });
                  } else
                      reject(err);
              });
          });
      }
      static delete(id) {
          this.id = id;
          return new Promise((resolve, reject) => {
              pool.getConnection((err, databaseConnection) => {
                  if (err)
                      reject(err);
                  else {

                      let sql = "delete from category where categoryId=?";
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

                      let sql = "update category set categoryName=?,categoryImage=? where categoryId=?";
                      databaseConnection.query(sql, [this.categoryName, this.categoryImage, this.id * 1], (err, queryResult) => {
                          databaseConnection.release();
                          err ? reject(err) : resolve(queryResult);
                      });

                  }
              });
          });

      }
      static categoryById(id) {
          this.id = id;
          return new Promise((resolve, reject) => {
              pool.getConnection((err, databaseConnection) => {
                  if (err)
                      reject(err);
                  else {

                      let sql = "select * from category where categoryId=?";
                      databaseConnection.query(sql, [this.id * 1], (err, queryResult) => {
                          databaseConnection.release();
                          err ? reject(err) : resolve(queryResult);
                      });

                  }
              });
          });

      }
      static fetchAllCategory() {
          return new Promise((resolve, reject) => {
              pool.getConnection((err, databaseConnection) => {
                  if (err)
                      reject(err);
                  else {

                      let sql = "select * from category";
                      databaseConnection.query(sql, (err, queryResult) => {
                          databaseConnection.release();
                          err ? reject(err) : resolve(queryResult);
                      });

                  }
              });
          });

      }
  }