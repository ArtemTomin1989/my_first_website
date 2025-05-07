const { Router } = require("express");
const db_product = require("../../models/product");

const router = new Router();

router.get("/:id", async (req, res) => {
  try {
    const product = await db_product.findById(req.params.id);

    if (!product) {
      console.error("Product not found", req.params.id);
      return res.redirect("/all_products");
    }

    res.render("products/product_details.ejs", { product });
  } catch (error) {
    console.error("Error loading product", error.message);
    res.redirect("/all_products");
  }
});

module.exports = router;
