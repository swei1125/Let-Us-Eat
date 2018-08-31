const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RestaurantSchema = require('./Restaurant');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likedRes: [{
        type: Schema.Types.ObjectId,
        ref: 'restaurants'
    }]
})

module.exports = User = mongoose.model('users', UserSchema);