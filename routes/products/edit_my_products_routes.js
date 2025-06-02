const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/is_auth");
const db_product = require("../../models/product");
const fs = require("fs");

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const product = await db_product.findById(req.params.id);
    return res.render("products/edit_my_products.ejs", { product });
  } catch (err) {
    console.error("Edit form error:", err);
    return res.redirect("/products/edit_my_products", { product });
  }
});

router.post("/:id", isAuthenticated, async (req, res) => {
  const { name, price, description, old_image } = req.body;
  let image = req.body.image;
  try {
    if (req.file) {
      if (old_image != "images/empty.jpg") {
        let filePath = `${old_image}`;
        fs.unlinkSync(filePath);
      }
      image = req.file.path;
    }
    await db_product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
      image,
    });

    return res.redirect("/my_products");
  } catch (err) {
    console.error("Update error:", err);
    return res.redirect("/my_products");
  }
});

router.post("/:id/delete_image", isAuthenticated, async (req, res) => {
  try {
    const product = await db_product.findById(req.params.id);
    if (!product) {
      return res.redirect("/my_products");
    }

    if (product.image && product.image !== "images/empty.jpg") {
      const filePath = product.image;
      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted image: ${filePath}`);
      } catch (err) {
        console.warn(`Could not delete image file: ${filePath}`, err);
      }

      product.image = "images/empty.jpg";
      await product.save();
    }

    return res.redirect(`/edit_my_products/${product._id}`);
  } catch (err) {
    console.error("Image delete error:", err);
    return res.redirect("/my_products");
  }
});

module.exports = router;
