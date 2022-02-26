const product = require('../model/product.model');
const category = require("../model/category.model");
exports.homePage = (request, response, next) => {
    Promise.all([category.categoryList(), product.productList()])
        .then(results => {
            console.log(results);
            return response.render("homePage.ejs", {
                title: "Home",
                categoryList: results[0],
                productList: results[1]
            });
        })
        .catch(err => {
            console.log(err);
            return response.send("Error.....");
        });
}