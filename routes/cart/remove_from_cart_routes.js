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

    const user = await db_user.findById(userId);

    user.cart = user.cart.filter((itemId) => itemId.toString() !== productId);

    await user.save();
    console.log("product was removed");
    res.redirect("/cart");
  } catch (error) {
    console.error("Error removing product from cart:", error);

    res.redirect("/cart");
  }
});

module.exports = router;
