const { Router } = require("express");
const router = new Router();
const db_user = require("../models/user");

router.get("/", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/auth/login");
    }

    const user = await db_user.findById(req.session.userId);

    if (!user) {
      return res.redirect("/auth/login");
    }

    return res.render("edit_profile.ejs", { user });
  } catch (error) {
    console.error(`Error fetching user data: ${error.message}`);

    return res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/auth/login");
    }

    const { nickname, age, bio, phoneNumber, location } = req.body;

    await db_user.findByIdAndUpdate(req.session.userId, {
      nickname,
      age,
      bio,
      phoneNumber,
      location,
    });

    return res.redirect("/my_profile");
  } catch (error) {
    console.error(`Error updating profile: ${error.message}`);
    return res.redirect("/edit_profile");
  }
});

module.exports = router;
