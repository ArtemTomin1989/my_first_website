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
    console.log(`Нового користувача ${new_user.email} додано`);
    await new_user.save();
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

  console.log(`Користувач ${user.email} успішно увійшов`);
  return res.redirect("/add_product");
});


module.exports = router;
