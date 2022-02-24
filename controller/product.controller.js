const Category = require('../model/category.model');
const path = require("path");
const Product = require("../model/product.model");
exports.saveProduct  = (request,response,next)=>{
     const productImage = "";
    if(request.file){
       productImage = request.file.filename;     
       }
       let product=new Product(request.body.productName,request.body.productPrice*1,request.body.productQty,request.body.CategoryId,productImage,request.body.descriotion);
  
    product.save()
    .then(result=>{
        return response.redirect("/admin/dashboard");
    })
    .catch(err=>{
        console.log(err);
        return response.send("Error....");
    });
}
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