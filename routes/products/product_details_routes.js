const { Router } = require("express");
const db_product = require("../../models/product");

const router = new Router();

router.get("/:id", async (req, res) => {
  try {
    const product = await db_product.findById(req.params.id);
    const products = await db_product.find();
    const userId = req.session.userId;

    if (!product)
      return res.render("products/all_products.ejs", {
        products,
        userId: userId || "",
        alert_type: "error",
        message: "Product not found",
      });

    return res.render("products/product_details.ejs", {
      product,
      userId: userId || "",
      alert_type: "",
      message: "",
    });
  } catch (error) {
    console.log(`Error loading product: ${error.message}`);
    return res.render("products/all_products.ejs", {
      products,
      userId: userId || "",
      alert_type: "error",
      message: `Error loading product: ${error.message}`,
    });
  }
});

module.exports = router;
