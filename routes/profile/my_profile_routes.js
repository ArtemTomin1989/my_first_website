const { Router } = require("express");
const router = new Router();
const db_user = require("../../models/user");

router.get("/", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }

    const user = await db_user.findById(req.session.userId);

    if (!user) {
      return res.redirect("/login");
    }

    res.render("profile/my_profile.ejs", { user });
  } catch (error) {
    console.error(`Error fetching user data: ${error.message}`);

    return res.redirect("/");
  }
});

module.exports = router;
