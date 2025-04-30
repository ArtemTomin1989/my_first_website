const { Router } = require("express");
const bcrypt = require("bcryptjs");
const router = new Router();
const db_user = require("../../models/user");

router.get("/", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/auth/login");
    }

    const user = await db_user.findById(req.session.userId);

    return res.render("profile/edit_profile.ejs", { user });
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

router.post("/delete_profile", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/auth/login");
    }

    const userId = req.session.userId;
    const { password } = req.body;

    const user = await db_user.findById(userId);
    if (!user) {
      return res.redirect("/auth/login");
    }

    const is_same = await bcrypt.compare(password, user.password);

    if (!is_same) {
      console.log("User entered incorrect password");

      return req.session.destroy((error) => {
        if (error) {
          console.error("Session destroy error:", error);
        }
        return res.redirect("/");
      });
    }

    await db_user.findByIdAndDelete(userId);
    console.log("User was successfully deleted");
    req.session.destroy((error) => {
      if (error) {
        console.error("Session destroy error:", error);
      }
      return res.redirect("/");
    });
  } catch (error) {
    console.error(`Error deleting profile: ${error.message}`);
    return res.redirect("/edit_profile");
  }
});

module.exports = router;
