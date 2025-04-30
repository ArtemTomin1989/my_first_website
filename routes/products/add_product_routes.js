const { Router } = require("express");
const db_product = require("../../models/product");

const router = new Router();

router.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  res.render("products/add_product.ejs");
});

router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const new_product = new db_product({
      name,
      price,
      description,
      owner_id: req.session.userId,
    });

    await new_product.save();

    console.log(`Product ${new_product.name} is added`);
    return res.redirect("/all_products");
  } catch (error) {
    console.error(`Error adding product: ${error.message}`);

    return res.redirect("/");
  }
});

module.exports = router;
