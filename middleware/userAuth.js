exports.isAuth = (request, response, next) => {
    if (request.session.currentCustomer)
        next();
    else
        response.redirect("/login");
}