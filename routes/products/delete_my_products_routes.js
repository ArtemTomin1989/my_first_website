const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/is_auth");
const cloudinary = require("../../utils/cloudinary");
const db_product = require("../../models/product");

router.post("/:id", isAuthenticated, async (req, res) => {
  const my_productId = req.params.id;

  try {
    const product = await db_product.findById(my_productId);

    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id); //  Видаляємо з Cloudinary
    }

    await db_product.findByIdAndDelete(my_productId);

    const my_products = await db_product.find({ owner_id: req.session.userId });

    return res.render("products/my_products.ejs", {
      alert_type: "success",
      message: "Product and image deleted",
      my_products,
    });
  } catch (error) {
    console.log("Delete error:", error);
    const my_products = await db_product.find({ owner_id: req.session.userId });

    return res.render("products/my_products.ejs", {
      alert_type: "error",
      message: `Delete error: ${error.message}`,
      my_products,
    });
  }
});

module.exports = router;
