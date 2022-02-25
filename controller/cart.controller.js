const Cart = require('../model/cart.model');

exports.addInCart = (request, response) => {
    let cart = new Cart();
    cart.productId = request.params.pid;
    cart.customerId = request.session.cureentCustomer;
    cart.addInCart()
        .then(result => {
            return response.json({
                message: "success"
            });
        })

    .catch(
        err => {
            return response.jsaon({
                message: "error"
            });

        }
    );

}
exports.removeFromCart = (request, response) => {
    let cart = new Cart();
    cart.productId = request.params.pid;
    cart.customerId = request.session.cureentCustomer;
    cart.removeFromCart()
        .then(result => {
            return response.json({
                message: "success"
            });
        })

    .catch(
        err => {
            return response.jsaon({
                message: "error"
            });

        }
    );

}