

const Admin = require('../model/admin.model');
exports.adminLoginPage = (request,response,next)=>{
    response.render("admin/admin_login.ejs",{
        title: "Login"
    });
};