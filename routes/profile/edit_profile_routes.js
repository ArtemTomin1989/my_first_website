const { Router } = require("express");
const bcrypt = require("bcryptjs");
const router = new Router();
const db_user = require("../../models/user");
const isAuthenticated = require("../../middlewares/is_auth");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await db_user.findById(req.session.userId);

    return res.render("profile/edit_profile.ejs", {
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

router.post("/", isAuthenticated, async (req, res) => {
  try {
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
    return res.render("profile/edit_profile.ejs", {
      alert_type: "error",
      message: `Error updating profile: ${error.message}`,
    });
  }
});

router.post("/delete_profile", isAuthenticated, async (req, res) => {
  try {
    let userId = req.session.userId;
    const { password } = req.body;

    const user = await db_user.findById(userId);
    if (!user) {
      return res.redirect("/login");
    }

    const is_same = await bcrypt.compare(password, user.password);

    if (!is_same) {
      return res.render("auth/login.ejs", {
        alert_type: "error",
        message: "Incorrect password",
      });
    }

    await db_user.findByIdAndDelete(userId);

    return req.session.destroy((error) => {
      if (error) {
        console.error("Session destroy error:", error);
      }
      console.log("User was successfully deleted");

      return res.redirect("/");
    });
  } catch (error) {
    console.error(`Error deleting profile: ${error.message}`);
    return res.redirect("/edit_profile");
  }
});

module.exports = router;
