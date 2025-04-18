const { Router } = require("express");
const db_product = require("../models/product");

const router = new Router();

router.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  res.render("add_product.ejs");
});

router.post("/", async (req, res) => {
  const { name, price, description } = req.body;

  const new_product = new db_product({
    name,
    price,
    description,
    user: req.session.userId,
  });

  await new_product.save();

  console.log(`Товар ${new_product.name} додано`);
  return res.redirect("/all_products");
});

module.exports = router;
