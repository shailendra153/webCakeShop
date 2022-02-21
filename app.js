const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const adminRouter = require("./routes/adminRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));


app.use(adminRouter);



app.listen(4000);