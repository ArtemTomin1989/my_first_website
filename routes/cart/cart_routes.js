const { Router } = require("express");
const db_user = require("../../models/user");
const isAuthenticated = require("../../middlewares/is_auth");

const router = new Router();

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await db_user.findById(req.session.userId).populate("cart");

    if (!user) {
      return res.render("auth/login.ejs", {
        alert_type: "error",
        message: "User not found",
      });
    }

    res.render("cart/cart.ejs", {
      alert_type: "",
      message: "",
      products: user.cart,
    });
  } catch (error) {
     console.error("An error occurred while fetching the cart:", error);
    return res.render("cart/cart.ejs", {
      alert_type: "error",
      message: `An error occurred while fetching the cart: ${error.message}`,
    });
  }
});

module.exports = router;
