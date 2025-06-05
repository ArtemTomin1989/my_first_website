const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  res.render("index.ejs", { alert_type: "", message: "" });
});

module.exports = router;
