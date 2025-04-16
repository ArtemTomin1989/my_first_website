require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");

const auth_routes = require("./routes/auth_routes");
const index_routes = require("./routes/index_routes");
const add_product_routes = require("./routes/add_product_routes");
const all_products_routes = require("./routes/all_products_routes");

const port = process.env.PORT || 7777;

app.use(express.json());
app.use(express.static(__dirname + "/views"));
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
app.use("/auth", auth_routes);
app.use("/add_product", add_product_routes);
app.use("/all_products", all_products_routes);

const start = async () => {
  await mongoose.connect(`${process.env.DB_URL}`);

  app.listen(port);

  console.log(
    `Сервер запущено на порту ${port}, клік на http://localhost:${port}`
  );
};

start();
