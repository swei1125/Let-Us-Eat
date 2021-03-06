const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jsonwebtoken = require('jsonwebtoken');
const keys = require("../../config/production_vars");
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const path = require('path');
// router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));


router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already taken';
                return res.status(400).json(errors);
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {

                                const payload = { 
                                    id: user.id, 
                                    name: user.name, 
                                    email: user.email, 
                                    likedResYelpIds: user.likedResYelpIds,
                                    likedResIds: user.likedResIds 
                                };
                                jsonwebtoken.sign(
                                    payload,
                                    keys.secretOrKey,
                                    // Key will expire in one hour
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: 'Bearer ' + token,
                                            user
                                        });
                                    });
                            })
                            .catch(err => console.log(err));
                    })
                })  
            }
        })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
    .then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                const payload = { 
                    id: user.id, 
                    name: user.name, 
                    email: user.email, 
                    likedResYelpIds: user.likedResYelpIds ,
                    likedResIds: user.likedResIds
                };

                jsonwebtoken.sign(
                    payload,
                    keys.secretOrKey,
                    // Key will expire in one hour
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
            } else {
                errors.password = 'Incorrect Password';
                return res.status(400).json(errors);
            }
        })
    })
})

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      User.findOne({email: req.user.email})
        .populate('likedResIds')
        .exec(function(err, user) {
            
            const payload = {
                id: user.id,
                email: user.email,
                name: user.name,
                likedResYelpIds: user.likedResYelpIds,
                likedResIds: user.likedResIds
            }
            jsonwebtoken.sign(
                payload,
                keys.secretOrKey,
                // Key will expire in one hour
                { expiresIn: 3600 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token,
                        user
                    });
                });
            
      })
      
  }
);

router.patch("/deleteRes", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({_id: req.body.userId})
    .then(user => {
        
        const idx1 = user.likedResYelpIds.indexOf(req.body.yelpId);
        const idx2 = user.likedResIds.indexOf(req.body.resId);
        user.likedResYelpIds.splice(idx1, 1);
        user.likedResIds.splice(idx2, 1);
        user.save();

        const payload = { id: user.id, email: user.email, name: user.name, likedResYelpIds: user.likedResYelpIds, likedResIds: user.likedResIds };
        jsonwebtoken.sign(
            payload,
            keys.secretOrKey,
            // Key will expire in one hour
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token,
                    user
                });
            }
        );
    })
});

router.patch('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id })
      .then(user => {
        if (req.body.action === "add") {
          user.likedResYelpIds.push(req.body.yelpId);
          user.likedResIds.push(req.body.resId);
          user.save();
        } else {
          const idx1 = user.likedResYelpIds.indexOf(req.body.yelpId);
          const idx2 = user.likedResIds.indexOf(req.body.resId);
          user.likedResYelpIds.splice(idx1, 1);
          user.likedResIds.splice(idx2, 1);
          user.save();
        }
        const payload = { id: user.id, email: user.email, name: user.name, likedResYelpIds: user.likedResYelpIds, likedResIds: user.likedResIds };
        jsonwebtoken.sign(
          payload,
          keys.secretOrKey,
          // Key will expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user
            });
          }
        );
      })
    
    
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})



module.exports = router;
