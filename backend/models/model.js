const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categories = new Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
  },
  subcategories: [String],
});

module.exports = mongoose.model("categories", categories);
