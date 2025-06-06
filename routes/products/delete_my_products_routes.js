const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/is_auth");
const db_product = require("../../models/product");
const fs = require("fs");

router.post("/:id", isAuthenticated, async (req, res) => {
  const my_productId = req.params.id;
  try {
    const product = await db_product.findById(my_productId);
    if (product.image != "uploads/images/empty.jpg") {
      let filePath = `${product.image}`;
      fs.unlinkSync(filePath);
    }

    await db_product.findByIdAndDelete(my_productId);

    const my_products = await db_product.find({ owner_id: req.session.userId });

    res.render("products/my_products.ejs", {
      alert_type: "success",
      message: "Product was successfully deleted",
      my_products,
    });
  } catch (error) {
    console.log("Delete error:", error);
    res.render("products/my_products.ejs", {
      alert_type: "error",
      message: `Delete error: ${error.message}`,
      my_products,
    });
  }
});

module.exports = router;
