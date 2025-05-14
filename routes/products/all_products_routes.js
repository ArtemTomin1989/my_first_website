const { Router } = require("express");
const db_product = require("../../models/product");

const router = new Router();

router.get("/", async (req, res) => {
  try {

    const products = await db_product.find();
    const userId = req.session.userId;

    res.render("products/all_products.ejs", {
      products,
      userId: userId || "",
    });
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    return res.redirect("/");
  }
});

module.exports = router;
