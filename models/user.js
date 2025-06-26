const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  nickname: {
    type: String,
    default: "",
  },

  avatar: {
    type: String,
    required: true, 
  },

  public_id: {
    type: String, 
    default: null,
  },

  age: {
    type: Number,
    default: null,
  },

  bio: {
    type: String,
    default: "",
  },

  phoneNumber: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

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
      ref: "product",
    },
  ],
});

module.exports = model("user", userSchema);
