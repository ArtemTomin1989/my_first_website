const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: String,
  password: String,
  nickname: String,
  avatarUrl: String,
  age: Number,
  bio: String,
  phoneNumber: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("user", userSchema);
