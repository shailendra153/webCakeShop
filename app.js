const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const adminRouter = require("./routes/adminRoutes");
const homeRouter = require("./routes/homeRoutes");
const categoryRouter = require('./routes/category.routes');
const productRouter = require('./routes/product.routes');

const app = express();
const fileupload = require('express-fileupload');


app.use(fileupload());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'dfkjfrrereprxvncvncvnrorererp'
}));



app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use(homeRouter);



app.listen(3000);