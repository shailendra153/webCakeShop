const express = require('express');
const indexController = require('../controller/admin.controller');
const adminController = require('../controller/admin.controller')
const router = express.Router();

router.get("/", indexController.adminLoginPage);

router.post("/login", adminController.adminLoginPost);
router.get("/admin_dashboard", adminController.adminHomepage)
module.exports = router;