const express = require("express");

const path = require("path");
const session = require('express-session');
const fileupload = require('express-fileupload');
const bodyParser = require("body-parser");
const adminRouter = require("/routes/admin/route");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'dfkjfrrereprxvncvncvnrorererp'
}));
app.use(fileupload());
app.use("/admin", adminRouter);
app.listen(3000);