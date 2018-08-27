const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  id: String,
  name: String,
  image_url: String,
  url: String,
  price: String,
  rating: Number,
  location: Object,
  phone: String
});

module.exports = Restaurant = mongoose.model('restaurants', RestaurantSchema);