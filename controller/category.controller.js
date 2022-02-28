const Category = require('../model/category.model');
const path = require('path');



exports.addCategory = (request, response, next) => {



    const file = request.files.categoryImage;
    const fileName = new Date().getTime() + file.name;
    if (file) {
        const filePath = path.join(__dirname, "../", "public/images", fileName);
        file.mv(filePath, err => {
            if (!err) {
                if (request.body.categoryName && file) {
                    let category = new Category(request.body.categoryName, fileName);
                    category.save().then(result => {
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
exports.viewCategoryList = (request, response, next) => {
    Category.fetchAllCategory()
        .then(results => {
            console.log(results);
            response.render("admin/view_category", {
                title: "Login",
                categoryList: results
            });

        })
        .catch(err => {
            console.log(err);
            return response.send("Erro.....");
        });
}
exports.getCategoryById = (request,response,next)=>{
    Category.fetchCategoryById(request.params.id)
    .then(result=>{
      if(result.length>0){
         response.render('admin/categoryEdit.ejs',{
            username : '',
            product: result[0]
         });
      }
    })
    .catch(err=>{
       console.log(err);
    });
 };
exports.updateCategory =  (request,response)=>{
    let category = new Category();
    console.log(request.body.categoryId)
    category.categoryId = request.params.categoryId;
    category.categoryName = request.body.categoryName;
    category.categoryImage = request.body.categoryImage;
    
    category.update().then(result=>{
       response.redirect("/category/view-category");
    }).catch(err=>{
       console.log(err);
       response.send("Error.....");
    });
 };


 exports.deletecategory = (request,response,next)=>{
    const id = request.params.id;
    Category.delete(id).then(
        ()=>{
            //response.redirect("/user/product-list");
            response.redirect("/category/view-category");
        }
    ).catch();
 };


