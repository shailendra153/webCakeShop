const express  = require('express');
const indexController = require('../controller/home.controller');
const router = express.Router();

router.get("/",indexController.homePage);

module.exports = router;
