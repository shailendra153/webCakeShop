const express = require('express');
const homeController = require('../controller/home.controller');
const router = express.Router();

router.get("/", homeController.homePage);
router.get("/login", homeController.loginPage);
router.get("/signup", homeController.signup);
router.get("/signout", homeController.signout);
router.post("/login", homeController.login);

module.exports = router;