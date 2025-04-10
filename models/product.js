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
});

module.exports = model("Product", productSchema);
