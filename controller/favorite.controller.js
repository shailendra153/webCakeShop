const Favorite = require('../model/favorite.model');

exports.addInCart = (request, response) => {
    let favorite = new Favorite();
    favorite.productId = request.params.pid;
    favorite.customerId = request.session.cureentCustomer;
    favorite.addInFavorite()
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
    let favorite = new Favorite();
    favorite.productId = request.params.pid;
    favorite.customerId = request.session.cureentCustomer;
    favorite.removeFromFavorite()
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