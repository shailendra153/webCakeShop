const express = require('express');
const carController = require('../controller/cart.controller');
const auth = require('../middleware/customer.auth');
const router = express.Router();
router.get("/add-to-cart/:pid", auth.isAuth)