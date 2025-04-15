const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
  },

  price: {
    type: Number,
  },

  description: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "user", // назва моделі користувача
  },
});

module.exports = model("product", productSchema);
