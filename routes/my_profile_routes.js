const { Router } = require("express");
const router = new Router();
const db_user = require("../models/user");

router.get("/", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }

  const user = await db_user.findById(req.session.userId).lean();

  if (!user) {
    return res.redirect("/auth/login");
  }

  res.render("my_profile.ejs", { user });
});

module.exports = router;
