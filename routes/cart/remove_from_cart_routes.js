const { Router } = require("express");
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

    await db_user.updateOne(
      { _id: userId },
      { $pull: { cart: productId } } // фактичне видалення з масиву
    );

    const user = await db_user.findById(userId);

    return res.render("cart/cart.ejs", {
      alert_type: "success",
      message: "Product was removed from cart",
      products: user.cart,
    });
  } catch (error) {
    console.log(`Error removing product from cart: ${error.message}`);
    return res.render("products/all_products.ejs", {
      alert_type: "error",
      message: `Error removing product from cart: ${error.message}`,
    });
  }
});

module.exports = router;
