require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const index_routes = require("./routes/index_routes");
const port = process.env.PORT || 7777;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/views"));

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use("/", index_routes);

const start = async () => {
  await mongoose.connect(`${process.env.DB_URL}`);

  app.listen(port);

  console.log(
    `Сервер запущено на порту ${port}, клік на http://localhost:${port}`
  );
};

start();
