let keys = {}

if (process.env.IS_PRODUCTION) {
    keys.mongoURI = process.env.MONGO_DB
    keys.secretOrKey = process.env.SECRECT_OR_KEY
    keys.mapKey = process.env.MAP_KEY
    keys.yelpKey = process.env.YELP_KEY   
} else {
    keys = require('./keys')
}

module.exports = keys;