exports.homePage = (request,response,next)=>{
    response.render("homePage.ejs",{
        title: 'cake_on_door'  
    });
}