const express = require('express');
const categoryController = require('../controller/category.controller');
const auth = require('../middleware/auth');
const router = express.Router();


router.post("/add", auth.isAuth, categoryController.addCategory);
router.get("/view-category", auth.isAuth, categoryController.viewCategoryList);
router.get('/delete-category/:id',categoryController.deletecategory);
router.get("/categoryEdit/:id",categoryController.getCategoryById);
router.post("/categoryEdit/:categoryId",categoryController.updateCategory);
module.exports = router;