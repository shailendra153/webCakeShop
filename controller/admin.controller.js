const { request } = require('express');
const Admin = require('../model/admin.model');
exports.adminLoginPage = (request, response, next) => {
    response.render("admin/admin_login.ejs", {
        title: "Login"
    });
};
exports.adminHomepage = (request, response, next) => {
    response.render("adminHome.ejs", {
        title: "Admin HomePage"
    });

}
exports.adminLoginPost = (request, response, next) => {
    const email = request.body.email;
    const password = request.body.password;
    let admin = new Admin(email, password);
    admin.checkAdmin().then(results => {
        if (results.length > 0) {
            request.session.current_user = email;
            response.redirect("/admin/dashboard");
            console.log("Login Success")
        } else
            console.log("Login Failed...");
    }).catch(err => {
        console.log(err);
    });
};