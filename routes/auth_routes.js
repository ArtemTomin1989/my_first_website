const { Router } = require("express");
const db_user = require("../models/user");

const router = new Router();

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await db_user.findOne({ email });
  if (user) {
    console.log("такий користувач вже існує");
  } else {
    const new_user = new db_user({
      email,
      password,
    });
    console.log(`Нового користувача ${new_user.email} додано`);
    await new_user.save();
  }
  return res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

module.exports = router;
