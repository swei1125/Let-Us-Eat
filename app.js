const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');
const users = require("./routes/api/users");
const restaurants = require("./routes/api/restaurants");

const db = require('./config/production_vars').mongoURI;
mongoose
.connect(db)
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

require('./config/passport')(passport);
app.use(passport.initialize());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/res", restaurants);
app.use(express.static(path.join(__dirname, "/frontend/public")));