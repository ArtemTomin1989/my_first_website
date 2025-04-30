const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
