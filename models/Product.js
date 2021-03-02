const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  rating: [{ userId: String, value: Number }],
  reviews: [{ userId: String, title: String, text: String, date: Date, rating: Number }],
  stock: Number,
  picture: String,
  category: String,
  delay: Number,
  amountSold: { tpye: Number, default: 0 }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
