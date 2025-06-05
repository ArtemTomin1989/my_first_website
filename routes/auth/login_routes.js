const { Router } = require("express");
const db_user = require("../../models/user");
const bcrypt = require("bcryptjs");

const router = new Router();

router.get("/", (req, res) => {
  return res.render("auth/login.ejs", {
    alert_type: "",
    message: "",
  });
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db_user.findOne({ email });

    if (!user) {
      return res.render("auth/login.ejs", {
        alert_type: "error",
        message: "User not found",
      });
    }

    const is_same = await bcrypt.compare(password, user.password);

    if (!is_same) {
      return res.render("auth/login.ejs", {
        alert_type: "error",
        message: "Incorrect password",
      });
    }

    req.session.userId = user._id;

    return res.redirect("/all_products");
  } catch (error) {
    console.log(`Error during user login: ${error.message}`);
    return res.render("auth/login.ejs", {
      alert_type: "error",
      message: `Error during user login: ${error.message}`,
    });
  }

});

module.exports = router;
