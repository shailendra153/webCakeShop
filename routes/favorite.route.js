const express = require('express');
const favoriteController = require('../controller/favorite.controller');
const auth = require('../middleware/customer.auth');
const router = express.Router();
router.get("/add-to-favorite/:pid", auth.isAuth, favoriteController.addInFavorite);
router.get("/remove-from-cart/:pid", auth.isAuth, favoriteController.removeFromFavorite);

module.exports = router;