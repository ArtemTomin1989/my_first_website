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
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "product", // назва моделі продукту
    },
  ],
});

module.exports = model("user", userSchema);
