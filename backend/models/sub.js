const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require("./sub");
const subCategories = new Schema({
  name: [],
  option: {
    option1: Boolean,
    option2: Boolean,
    option3: Boolean,
    option4: Boolean,
  },
  cat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
});

module.exports = mongoose.model("subCategories", subCategories);
