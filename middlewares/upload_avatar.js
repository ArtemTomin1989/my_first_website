const multer = require("multer");
const path = require("path");

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

const avatarFileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage: avatarStorage,
  fileFilter: avatarFileFilter,
});
