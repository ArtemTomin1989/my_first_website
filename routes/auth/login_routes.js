const { Router } = require("express");
const db_user = require("../../models/user");
const bcrypt = require("bcryptjs");

const router = new Router();

router.get("/", (req, res) => {
  res.render("auth/login.ejs");
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db_user.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.redirect("/login");
    }

    const is_same = await bcrypt.compare(password, user.password);

    if (!is_same) {
      console.log("Incorrect password");
      return res.redirect("/login");
    }

    req.session.userId = user._id;

    return res.redirect("/add_product");
  } catch (error) {
    console.error(`Error during user login: ${error.message}`);

    return res.redirect("/");
  }
});

module.exports = router;
