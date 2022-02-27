const express = require('express');

const cartController = require('../controller/cart.controller');

const router = express.Router();
const userAuth = require('../middleware/userAuth');
router.get("/add-to-cart/:pid", userAuth.isAuth, cartController.addToCart);
router.get("/remove-from-cart/:pid", userAuth.isAuth, cartController.removeFromCart);

router.get("/view-cart", userAuth.isAuth, cartController.viewCartList);
router.get("/get-cart-item-local", (request, response, next) => {
    let userId = request.session.current_user_id;
    Cart.fetchAllCartItem(userId)
        .then(results => {
            return response.json(results);
        })
        .catch();
});

module.exports = router;