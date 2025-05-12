const { Router } = require("express");
const db_product = require("../../models/product");
const db_user = require("../../models/user");

const router = new Router();

router.post("/:productId", async (req, res) => {
  try {
    const userId = req.session.userId;
    const productId = req.params.productId;

    if (!userId) {
      return res.redirect("/login");
    }

    const product = await db_product.findById(productId);
    if (!product) {
      console.error("Product not found");
      return res.redirect("/all_products");
    }

    if (product.owner_id.toString() === userId) {
      console.error("Cannot add your own product to cart");
      return res.redirect("/cart");
    }

    const user = await db_user.findById(userId);
    if (user.cart.includes(productId)) {
      console.error("Product already in cart");
      return res.redirect("/cart");
    }

    user.cart.push(productId);

    await user.save();

    console.log("Product was added");

    res.redirect("/cart");
  } catch (error) {
    console.error("Error adding product to cart:", error);

    res.redirect("/all_products");
  }
});

module.exports = router;
