const {
    response,
    request
} = require('express');
const User = require('../model/user.model');
exports.signup = (request, response, next) => {
    console.log(request.body);
    let user = new User();
    user.cusName = request.body.cusName;
    user.cusEmail = request.body.cusEmail;
    user.cusMobile = request.body.cusMobile;
    user.cusPassword = request.body.cusPassword;
    user.cusAddress = request.body.cusAddress;
    user.cusGender = request.body.cusGender;
    user.signup()
        .then(result => {
            User.getCurrentUser(user.cusEmail)
                .then(results => {
                    request.session.current_customer_id = results[0].id;
                    response.redirect("/");
                })
                .catch();
        })
        .catch(err => {
            console.log(err);
            return response.send("Erro....");
        });
};