require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const index_routes = require("./routes/index_routes");
const cart_routes = require("./routes/cart/cart_routes");
const login_routes = require("./routes/auth/login_routes");
const logout_routes = require("./routes/auth/logout_routes");
const register_routes = require("./routes/auth/register_routes");
const add_to_cart_routes = require("./routes/cart/add_to_cart_routes");
const my_profile_routes = require("./routes/profile/my_profile_routes");
const add_product_routes = require("./routes/products/add_product_routes");
const my_products_routes = require("./routes/products/my_products_routes");
const edit_profile_routes = require("./routes/profile/edit_profile_routes");
const all_products_routes = require("./routes/products/all_products_routes");
const remove_from_cart_routes = require("./routes/cart/remove_from_cart_routes");
const product_details_routes = require("./routes/products/product_details_routes");
const edit_my_products_routes = require("./routes/products/edit_my_products_routes");
const delete_my_products_routes = require("./routes/products/delete_my_products_routes");

const port = process.env.PORT || 7777;

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
      autoRemove: "native",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// маршрути
app.use("/", index_routes);
app.use("/cart", cart_routes);
app.use("/login", login_routes);
app.use("/logout", logout_routes);
app.use("/register", register_routes);
app.use("/my_profile", my_profile_routes);
app.use("/add_product", add_product_routes);
app.use("/my_products", my_products_routes);
app.use("/add_to_cart", add_to_cart_routes);
app.use("/all_products", all_products_routes);
app.use("/edit_profile", edit_profile_routes);
app.use("/product_details", product_details_routes);
app.use("/remove_from_cart", remove_from_cart_routes);
app.use("/edit_my_products", edit_my_products_routes);
app.use("/delete_my_products", delete_my_products_routes);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    app.listen(port, () => {
      console.log(`Server is running on port - http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Error starting the server: ${error.message}`);
  }
};

start();
