const { Router } = require("express");
const db_user = require("../../models/user");
const bcrypt = require("bcryptjs");

const router = new Router();

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db_user.findOne({ email });
    if (user) {
      console.log("This user already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const new_user = new db_user({
        email,
        password: hashedPassword,
        nickname: "",
        avatarUrl:
          "https://wiki.legalaid.gov.ua/images/thumb/e/e2/Person1.jpg/360px-Person1.jpg",
        age: 18,
        bio: "",
        phoneNumber: "",
        location: "",
        createdAt: Date.now(),
        lastLogin: Date.now(),
      });
      await new_user.save();

      req.session.userId = new_user._id;

      console.log(`New user ${new_user.email} is added`);
    }
    return res.redirect("/add_product");
  } catch (error) {
    console.error(`Error during user registration: ${error.message}`);

    return res.redirect("/");
  }
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db_user.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.redirect("/auth/login");
    }

    const is_same = await bcrypt.compare(password, user.password);

    if (!is_same) {
      console.log("Incorrect password");
      return res.redirect("/auth/login");
    }

    req.session.userId = user._id;

    return res.redirect("/add_product");
  } catch (error) {
    console.error(`Error during user login: ${error.message}`);

    return res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
