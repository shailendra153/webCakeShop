const product = require('../model/product.model');
const category = require("../model/category.model");
const User = require('../model/user.model');

exports.homePage = (request, response, next) => {
    let currentUserId = request.session.current_user_id;
    Promise.all([category.fetchAllCategory(), product.fetchAllProduct(currentUserId)])
        .then(results => {
            console.log(results);
            return response.render("homePage.ejs", {
                title: "Home",
                categoryList: results[0],
                productList: results[1],
                isLoggedIn: request.session.current_user_id

            });
        })
        .catch(err => {
            console.log(err);
            return response.send("Error.....");
        });
}

exports.login = (request, response, next) => {
    let user = new User();
    user.cusEmail = request.body.cusEmail;
    user.cusPassword = request.body.cusPassword;
    user.checkUser().
    then(result => {
            if (result.length != 0) {
                request.session.current_user_id = result[0].id;
                return response.redirect("/");
            }
        })
        .catch(err => {
            console.log(err);
            return response.send("Erro.....");
        });
}
exports.signout = (request, response, next) => {
    request.session.current_user_id = null;
    request.session.destroy();
    response.redirect("/");
}
exports.signup = (request, response, next) => {
    response.render("signup.ejs", {
        title: "Sign up"
    });
}
exports.loginPage = (request, response, next) => {
    response.render("login.ejs", {
        title: "User Login"
    })
};