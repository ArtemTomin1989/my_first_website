const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = model("user", userSchema);
