const Category = require('../model/category.model');
const path = require("path");
const Product = require("../model/product.model");
exports.saveProduct = (request, response, next) => {
    console.log(request.body.productName)
    console.log(request.body.productPrice)
    console.log(request.body.productQty)
    console.log(request.body.productDescription)
    console.log(request.body.categoryId)



    const file = request.files.productImages;
    const fileName = new Date().getTime() + file.name;
    console.log(file.name);

    if (file.name) {
        const filePath = path.join(__dirname, "../", "public/images", fileName);
        file.mv(filePath, err => {
            if (!err) {
                if (request.body.productName && request.body.productPrice && request.body.productQuantity && request.body.categoryId && fileName && request.body.productDescription) {
                    let product = new Product(request.body.productName, request.body.productPrice, request.body.productQuantity, request.body.categoryId, fileName, request.body.productDescription);
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
exports.viewProductPage = (request, response, next) => {
    Product.productList()
        .then(results => {
            console.log(results);
            response.render("admin/view_product", {
                title: "Login",
                productList: results
            });

        })
        .catch(err => {
            console.log(err);
            return response.send("Erro.....");
        });
}
exports.getProductById = (request,response,next)=>{
    Product.fetchProductById(request.params.id)
    .then(result=>{
      if(result.length>0){
         response.render('admin/productEdit.ejs',{
            username : '',
            product: result[0]
         });
      }
    })
    .catch(err=>{
       console.log(err);
    });
 };
exports.updateProduct =  (request,response)=>{
    let product = new Product();
    product.id = request.body.id;
    console.log(request.body);
    product.productName = request.body.productName;
    product.productPrice = request.body.productPrice;
    product.productQuantity = request.body.productQuantity;
    product.productImage = request.body.productImage;
    product.description = request.body.description;
    console.log(product);
    product.update().then(result=>{
       response.redirect("/product/view-product");
    }).catch(err=>{
       console.log(err);
       response.send("Error.....");
    });
 };


 exports.deleteProduct = (request,response,next)=>{
    const id = request.params.id;
    Product.delete(id).then(
        ()=>{
            //response.redirect("/user/product-list");
            response.redirect("/product/view-product");
        }
    ).catch();
 };


