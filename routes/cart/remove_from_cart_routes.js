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

    await db_user.updateOne(
      { _id: userId },
      { $pull: { cart: productId } } // фактичне видалення з масиву
    );

    console.log("Product was removed from cart");
    res.redirect("/cart");
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.redirect("/cart");
  }
});

module.exports = router;
