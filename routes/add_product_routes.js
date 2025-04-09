const { Router } = require("express");
const db_product = require("../models/product");

const router = new Router();

router.get("/", (req, res) => {
  res.render("add_product.ejs");
});

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  const new_product = new db_product({ name, price });
  await new_product.save();
  console.log(`Товар ${new_product.name} додано`);
  return res.redirect("/product/list");
});

module.exports = router;
