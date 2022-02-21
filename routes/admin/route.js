const express = require('express');
const router = express.Router();
const controll = require("../../controllers/adminController/adminController");
router.get('/', controll.login);
module.exports = router;