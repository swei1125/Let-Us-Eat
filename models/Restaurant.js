const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  yelpId: String,
  name: String,
  image_url: String,
  price: String,
  categories: [{
    type: String
  }],
  rating: Number,
  location: [{
    type: String
  }],
  phone: String
});

module.exports = Restaurant = mongoose.model('restaurants', RestaurantSchema);