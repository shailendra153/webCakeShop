exports.isAuth = (request, response, next) => {
    if (request.session.current_customer_id)
        next();
    else
        response.redirect("/login");
}