const { Router } = require("express");
const db_product = require("../../models/product");
const db_user = require("../../models/user");
const isAuthenticated = require("../../middlewares/is_auth");

const router = new Router();

router.post("/:productId", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const productId = req.params.productId;

    if (!userId) {
      return res.redirect("/login");
    }

    const product = await db_product.findById(productId);
    if (!product) {
      return res.render("products/all_products.ejs", {
        alert_type: "error",
        message: "Product not found",
      });
    }

    if (product.owner_id.toString() === userId) {
      return res.render("cart/cart.ejs", {
        alert_type: "error",
        message: "Cannot add your own product to cart",
      });
    }

    const user = await db_user.findById(userId);
    if (user.cart.includes(productId))
      return res.render("cart/cart.ejs", {
        alert_type: "error",
        message: "Product already in cart",
        products: user.cart,
      });

    user.cart.push(productId);

    await user.save();

    await user.populate("cart");

    return res.render("cart/cart.ejs", {
      alert_type: "success",
      message: "Product was added",
      products: user.cart,
    });
  } catch (error) {
    console.log(`Error adding product to cart: ${error.message}`);
    return res.render("products/all_products.ejs", {
      alert_type: "error",
      message: `Error adding product to cart: ${error.message}`,
    });
  }
});

module.exports = router;
