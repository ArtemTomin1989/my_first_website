const { Router } = require("express");
const db_product = require("../models/product");

const router = new Router();

router.get("/", async (req, res) => {
  const products = await db_product.find();
  res.render("all_products.ejs", { products });
});

module.exports = router;
