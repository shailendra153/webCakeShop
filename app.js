const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const path = require('path');
const userRouter = require('./routes/user.routes');

const adminRouter = require("./routes/adminRoutes");
const homeRouter = require("./routes/homeRoutes");
const categoryRouter = require('./routes/category.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
// const favoriteRouter = require('./routes/favorite.route');
// const orderRouter = require('./routes/order.routes');
const app = express();
const fileupload = require('express-fileupload');


app.use(fileupload());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'dfkjfrrereprxvncvncvnrorererp'
}));


app.use("/cart", cartRouter);
// app.use("/favorite", favoriteRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
// app.use("/order", orderRouter);
app.use(homeRouter);



app.listen(3000);