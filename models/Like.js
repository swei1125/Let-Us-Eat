const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const LikeSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    res: {
        type: Schema.Types.ObjectId,
        ref: 'restaurants'
    }

});

module.exports = Like = mongoose.model("likes", LikeSchema);