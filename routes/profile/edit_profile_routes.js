const { Router } = require("express");
const bcrypt = require("bcryptjs");
const router = new Router();
const db_user = require("../../models/user");
const isAuthenticated = require("../../middlewares/is_auth");
const upload_avatar = require("../../middlewares/upload_avatar");
const cloudinary = require("../../utils/cloudinary");

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

router.post(
  "/",
  isAuthenticated,
  upload_avatar.single("avatar"),
  async (req, res) => {
    const {
      nickname,
      age,
      bio,
      phoneNumber,
      location,
      old_avatar,
      old_public_id,
    } = req.body;

    let avatar = old_avatar;
    let public_id = old_public_id;

    try {
      if (req.file) {
        avatar = req.file.path;
        public_id = req.file.filename;

        const is_default = old_avatar.includes("empty_avatar");
        if (!is_default && old_public_id) {
          await cloudinary.uploader.destroy(old_public_id);
        }
      }

      await db_user.findByIdAndUpdate(req.session.userId, {
        nickname,
        age,
        bio,
        phoneNumber,
        location,
        avatar,
        public_id,
      });

      return res.redirect("/my_profile");
    } catch (error) {
      const user = await db_user.findById(req.session.userId);
      return res.render("profile/edit_profile.ejs", {
        alert_type: "error",
        message: `Error updating profile: ${error.message}`,
        user,
      });
    }
  }
);

router.post("/delete_profile", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
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

    if (user.public_id) {
      await cloudinary.uploader.destroy(user.public_id);
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
