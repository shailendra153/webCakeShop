const pool = require('../database/dbconfig');
module.exports = class Category {
    constructor(categoryName, categoryImage) {
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
    }
    static fetchAllCategory(){
        return new Promise((resolve,reject)=>{
           pool.getConnection((err,con)=>{
             if(!err){
               let sql = "select * from category";
               con.query(sql,(err,queryResults)=>{
                  con.release();
                  err ? reject(err) : resolve(queryResults);
               });
             }
             else 
               reject(err);
           }); 
        });
    }
    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
              if(!err){  
               let sql = "insert into category(categoryName,categoryImage) values(?,?)";
               con.query(sql,[this.categoryName,this.categoryImage],(err,queryResult)=>{
                 con.release(); 
                 err ? reject(err) : resolve(queryResult);
               });
              }
              else 
                reject(err);
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {

            });
        });
    }
    update() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {

            });
        });
    }
    categoryById(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {

            });
        });
    }
    categoryList() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {

            });
        });
    }
}