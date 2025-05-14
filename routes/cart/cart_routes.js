const { Router } = require("express");
const db_user = require("../../models/user");
const isAuthenticated = require("../../middlewares/is_auth");

const router = new Router();

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await db_user.findById(req.session.userId).populate("cart");

    if (!user) {
      console.error("Користувача не знайдено");
      return res.redirect("/login");
    }

    res.render("products/cart.ejs", { products: user.cart });
  } catch (error) {
    console.error("Помилка при отриманні кошика:", error);
    res.redirect("/all_products");
  }
});

module.exports = router;
