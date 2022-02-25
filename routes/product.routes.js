const express = require('express');


const router = express.Router();
const productController = require('../controller/product.controller');
const auth = require('../middleware/auth');
router.get("/add-product", auth.isAuth, productController.addProductPage);
router.get("/view-product", auth.isAuth, productController.viewProductPage);

router.post("/add-product", auth.isAuth, productController.saveProduct);
module.exports = router;