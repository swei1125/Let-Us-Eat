const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");

router.post('/createRes', (req, res) => {
    
    const newRes = new Restaurant({
        yelpId: req.body.yelpId,
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        categories: req.body.categories,
        rating: req.body.rating,
        location: req.body.location,
        phone: req.body.phone
    })
    newRes.save()
        .then(rest => {
            res.json(rest)
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    Restaurant.findOne({yelpId: id}).then(rest => {
        res.json(rest)
    })

})

module.exports = router;