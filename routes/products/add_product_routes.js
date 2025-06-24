const { Router } = require("express");
const db_product = require("../../models/product");
const isAuthenticated = require("../../middlewares/is_auth");
const upload_product_image = require("../../middlewares/upload_product_image");
const empty_image =
  "https://res.cloudinary.com/dgsz7gzzt/image/upload/v1750790314/empty_image_yfmufu.jpg";

const router = new Router();

router.get("/", isAuthenticated, (req, res) =>
  res.render("products/add_product.ejs", {
    alert_type: "",
    message: "",
  })
);

router.post(
  "/",
  isAuthenticated,
  upload_product_image.single("image"),
  async (req, res) => {
    try {
      const { name, price, description } = req.body;
      let image;
      let public_id; 

      if (!req.file) {
        image = empty_image;
        public_id = null; 
      } else {
        image = req.file.path;
        public_id = req.file.filename; 
      }

      const new_product = new db_product({
        name,
        price,
        description,
        image,
        public_id,
        owner_id: req.session.userId,
      });

      await new_product.save();

      const products = await db_product.find();

      return res.render("products/all_products.ejs", {
        alert_type: "success",
        message: `Product ${new_product.name} is added`,
        products,
      });
    } catch (error) {
      console.log(`Error adding product: ${error.message}`);
      return res.render("index.ejs", {
        alert_type: "error",
        message: `Error adding product: ${error.message}`,
      });
    }
  }
);

module.exports = router;
