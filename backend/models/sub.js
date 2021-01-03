const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require("./sub");
const subCategories = new Schema({
  name: [],
  cat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
});

module.exports = mongoose.model("subCategories", subCategories);
