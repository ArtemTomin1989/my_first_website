const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

const productImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "product_images", // папка в Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const productFileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format for product"), false);
  }
};

const upload_product_image = multer({
  storage: productImageStorage,
  fileFilter: productFileFilter,
});

module.exports = upload_product_image;
