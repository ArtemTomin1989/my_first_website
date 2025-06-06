const { Router } = require("express");
const router = new Router();
const db_user = require("../../models/user");
const isAuthenticated = require("../../middlewares/is_auth");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await db_user.findById(req.session.userId);

    if (!user) {
      return res.redirect("/login");
    }

    res.render("profile/my_profile.ejs", {
      alert_type: "",
      message: "",
      user,
    });
  } catch (error) {
    return res.render("index.ejs", {
      alert_type: "error",
      message: `Error fetching user data: ${error.message}`,
    });
  }
});

module.exports = router;
