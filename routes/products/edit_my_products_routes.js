const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/is_auth");
const db_product = require("../../models/product");
const fs = require("fs");

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const product = await db_product.findById(req.params.id);
    return res.render("products/edit_my_products.ejs", {
      alert_type: "",
      message: "",
      product,
    });
  } catch (error) {
    const my_products = await db_product.find({ owner_id: req.session.userId });
    return res.render("products/my_products.ejs", {
      alert_type: "error",
      message: `Edit form error: ${error.message}`,
      my_products,
    });
  }
});

router.post("/:id", isAuthenticated, async (req, res) => {
  const { name, price, description, old_image } = req.body;
  let image = req.body.image;
  try {
    if (req.file) {
      if (old_image != "uploads/images/empty.jpg") {
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
  } catch (error) {
    return res.render("products/my_products.ejs", {
      alert_type: "error",
      message: `Update error: ${error.message}`,
      my_products,
    });
  }
});

router.post("/:id/delete_image", isAuthenticated, async (req, res) => {
  try {
    const product = await db_product.findById(req.params.id);
    if (!product) {
      return res.redirect("/my_products");
    }

    if (product.image && product.image !== "uploads/images/empty.jpg") {
      const filePath = product.image;

      fs.unlinkSync(filePath);

      res.render("products/edit_my_products.ejs", {
        alert_type: "success",
        message: `Deleted image: ${filePath}`,
        product,
      });

      product.image = "uploads/images/empty.jpg";
      await product.save();
      //
    }
  } catch (error) {
    const product = await db_product.findById(req.params.id);
    return res.render("products/edit_my_products.ejs", {
      alert_type: "error",
      message: `Image delete error: ${error.message}`,
      product,
    });
  }
});

module.exports = router;
