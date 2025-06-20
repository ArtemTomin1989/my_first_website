const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Конфігурація хранилища для multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "retroshop_images", // папка у Cloudinary, де зберігатимуться файли
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, height: 800, crop: "limit" }], // опційно: обмеження розміру фото
  },
});

const uploadCloudinary = multer({ storage });

module.exports = uploadCloudinary;
