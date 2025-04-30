require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");

const index_routes = require("./routes/index_routes");
const login_routes = require("./routes/auth/login_routes");
const logout_routes = require("./routes/auth/logout_routes");
const register_routes = require("./routes/auth/register_routes");
const my_profile_routes = require("./routes/profile/my_profile_routes");
const add_product_routes = require("./routes/products/add_product_routes");
const my_products_routes = require("./routes/products/my_products_routes");
const edit_profile_routes = require("./routes/profile/edit_profile_routes");
const all_products_routes = require("./routes/products/all_products_routes");
const port = process.env.PORT || 7777;

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: `${process.env.DB_USERNAME}`,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use("/", index_routes);
app.use("/auth/login", login_routes);
app.use("/auth/logout", logout_routes);
app.use("/my_profile", my_profile_routes);
app.use("/auth/register", register_routes);
app.use("/add_product", add_product_routes);
app.use("/my_products", my_products_routes);
app.use("/all_products", all_products_routes);
app.use("/edit_profile", edit_profile_routes);
const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);

    app.listen(port, () => {
      console.log(`Server is running on port - http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Error starting the server: ${error.message}`);
  }
};

start();
