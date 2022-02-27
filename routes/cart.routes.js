const express = require('express');

const cartController = require('../controller/cart.controller');

const router = express.Router();
const userAuth = require('../middleware/userAuth');
const Cart = require('../model/cart.model');
router.get("/add-to-cart/:pid", userAuth.isAuth, cartController.addToCart);
router.get("/remove-from-cart/:pid", userAuth.isAuth, cartController.removeFromCart);

router.get("/view-cart", userAuth.isAuth, (request, response, next) => {
    let customerId = request.session.current_customer_id;
    Cart.fetchAllCartItem(customerId)
        .then(results => {
            console.log(results);
            response.render("view_cart.ejs", {
                title: "Cart",
                cartItemList: results,
                isLoggedIn: request.session.current_customer_id
            });
        })
        .catch();
});
router.get("/get-cart-item-local", (request, response, next) => {
    let customerId = request.session.current_customer_id;
    Cart.fetchAllCartItem(customerId)
        .then(results => {
            return response.json(results);
        })
        .catch();
});

module.exports = router;