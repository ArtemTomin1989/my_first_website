const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/is_auth");

const db_product = require("../../models/product");

router.get("/:id",isAuthenticated, async (req, res) => {
  try {
    const product = await db_product.findById(req.params.id);
    return res.render("products/edit_my_products.ejs", { product });
  } catch (err) {
    console.error("Edit form error:", err);
    return res.redirect("/products/edit_my_products", { product });
  }
});

router.post("/:id",isAuthenticated, async (req, res) => {
  const { name, price, description } = req.body;
  try {
    await db_product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
    });

    return res.redirect("/my_products");
  } catch (err) {
    console.error("Update error:", err);
    return res.redirect("/my_products");
  }
});
module.exports = router;
