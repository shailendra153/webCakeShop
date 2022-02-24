const Category = require('../model/category.model');
const path = require("path");
const Product = require("../model/product.model");
exports.saveProduct = (request, response, next) => {
    console.log(request.body.productName)
    console.log(request.body.productPrice)
    console.log(request.body.productQty)
    console.log(request.body.productDescription)
    console.log(request.body.categoryId)
    console.log(request.files.productImages.name);


    const file = request.files.productImages;
    const fileName = new Date().getTime() + file.name;
    console.log(file.name);

    if (file) {
        const filePath = path.join(__dirname, "../", "public/images", fileName);
        file.mv(filePath, err => {
            if (!err) {
                if (request.body.productName && request.body.productPrice && request.body.productQty && request.body.categoryId && file && request.body.productDescription) {
                    let product = new Product(request.body.productName, request.body.productPrice, request.body.productQty, request.body.categoryId, fileName, request.body.productDescription);
                    product.save().then(result => {
                        response.redirect("/admin/dashboard");
                    }).catch(err => {
                        response.send("Erro.........");
                    });
                }
            } else
                response.send("Error.........");
        });
    }
};
exports.addProductPage = (request, response, next) => {
    Category.categoryList()
        .then(results => {
            console.log(results);
            return response.render("admin/add_product.ejs", {
                title: "Add product",
                categories: results
            });

        })
        .catch(err => {
            console.log(err);
            return response.send("Erro.....");
        });
};