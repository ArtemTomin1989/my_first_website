const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/is_auth");

const db_product = require("../../models/product");

router.post("/:id", isAuthenticated, async (req, res) => {
  const my_productId = req.params.id;
  try {
    await db_product.findByIdAndDelete(my_productId);
    console.log("product was successfully deleted");
    return res.redirect("/my_products");
  } catch (err) {
    console.error("Delete error:", err);
    return res.redirect("/my_products");
  }
});

module.exports = router;
