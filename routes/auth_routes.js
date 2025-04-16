const { Router } = require("express");
const db_user = require("../models/user");
const bcrypt = require("bcryptjs");

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const new_user = new db_user({
      email,
      password: hashedPassword,
    });
    await new_user.save();

    req.session.userId = new_user._id;

    console.log(`Нового користувача ${new_user.email} додано`);
  }
  return res.redirect("/add_product");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db_user.findOne({ email });

  if (!user) {
    console.log("Користувач не знайдений");
    return res.redirect("/auth/login");
  }

  const is_same = await bcrypt.compare(password, user.password);

  if (!is_same) {
    console.log("Неправильний пароль");
    return res.redirect("/auth/login");
  }

  req.session.userId = user._id;

  return res.redirect("/add_product");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
