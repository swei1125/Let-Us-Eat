const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");

router.post('/createRes', (req, res) => {
    const newRes = new Restaurant({
        yelpId: req.body.yelpId,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        categories: req.body.categories,
        rating: req.body.rating,
        lcoation: req.body.location,
        phone: req.body.phone
    })
    newRes.save().then(rest => {
        res.json({
            id: rest.id
        })
    })
})