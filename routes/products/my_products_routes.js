const { Router } = require("express");
const db_product = require("../../models/product");

const router = new Router();
const isAuthenticated = require("../../middlewares/is_auth");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const my_products = await db_product.find({ owner_id: req.session.userId });

    res.render("products/my_products.ejs", {
      my_products,
      alert_type: "",
      message: "",
    });
  } catch (error) {
    console.log(`Error fetching products: ${error.message}`);
    return res.render("index.ejs", {
      alert_type: "error",
      message: `Error fetching products: ${error.message}`,
      my_products,
    });
  }
});

module.exports = router;
