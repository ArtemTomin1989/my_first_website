const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // обрізає пробіли з початку/кінця
  },
  price: {
    type: Number,
    required: true,
    min: 0, 
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    default: null,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = model("product", productSchema);
