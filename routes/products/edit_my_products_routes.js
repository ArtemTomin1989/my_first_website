const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/is_auth");
const db_product = require("../../models/product");
const cloudinary = require("../../utils/cloudinary"); //
const upload_product_image = require("../../middlewares/upload_product_image");

const empty_image =
  "https://res.cloudinary.com/dgsz7gzzt/image/upload/v1750790314/empty_image_yfmufu.jpg";

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

router.post(
  "/:id",
  isAuthenticated,
  upload_product_image.single("image"),
  async (req, res) => {
    const { name, price, description, old_image, old_public_id } = req.body;
    let image = old_image;
    let public_id = old_public_id;

    try {
      if (req.file) {
        image = req.file.path;
        public_id = req.file.filename;

        if (old_public_id) {
          await cloudinary.uploader.destroy(old_public_id);
        }
      } else if (!req.file && old_image === empty_image) {
        public_id = null;
      }

      await db_product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        description,
        image,
        public_id,
      });

      return res.redirect("/my_products");
    } catch (error) {
      const my_products = await db_product.find({
        owner_id: req.session.userId,
      });
      return res.render("products/my_products.ejs", {
        alert_type: "error",
        message: `Update error: ${error.message}`,
        my_products,
      });
    }
  }
);

router.post("/:id/delete_image", isAuthenticated, async (req, res) => {
  try {
    const product = await db_product.findById(req.params.id);
    if (!product) return res.redirect("/my_products");

    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }

    product.image = empty_image;
    product.public_id = null;
    await product.save();

    return res.render("products/edit_my_products.ejs", {
      alert_type: "success",
      message: `Image was removed.`,
      product,
    });
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
