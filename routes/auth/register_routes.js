const { Router } = require("express");
const db_user = require("../../models/user");
const bcrypt = require("bcryptjs");
const empty_avatar = "uploads/avatars/empty_avatar.jpg";

const router = new Router();

router.get("/", (req, res) => {
  res.render("auth/register.ejs", {
    alert_type: "",
    message: "",
  });
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db_user.findOne({ email });
    if (user) {
      return res.render("auth/register.ejs", {
        alert_type: "error",
        message: "This user already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const new_user = new db_user({
        email,
        password: hashedPassword,
        nickname: "",
        avatar: empty_avatar,
        age: 18,
        bio: "",
        phoneNumber: "",
        location: "",
        createdAt: Date.now(),
        lastLogin: Date.now(),
      });
      await new_user.save();

      return res.render("auth/login.ejs", {
        alert_type: "success",
        message: `New user ${new_user.email} is added`,
      });
    }
  } catch (error) {
    console.log(`Error during user registration: ${error.message}`);
    return res.render("auth/register.ejs", {
      alert_type: "error",
      message: `Error during user registration: ${error.message}`,
    });
  }
});

module.exports = router;
