const { Router } = require("express");
const db_product = require("../../models/product");
const isAuthenticated = require("../../middlewares/is_auth");
const empty_image = "/images/empty.jpg";

const router = new Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("products/add_product.ejs");
});

router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    let image = req.body.image;

    if (!req.file) {
      image = empty_image;
    } else {
      image = req.file.path;
    }

    const new_product = new db_product({
      name,
      price,
      description,
      image,
      owner_id: req.session.userId,
    });

    await new_product.save();

    console.log(`Product ${new_product.name} is added`);
    return res.redirect("/all_products");
  } catch (error) {
    console.error(`Error adding product: ${error.message}`);

    return res.redirect("/");
  }
});

module.exports = router;
