/*
===========================================================
 Title:  Authenticate User & Dashbord - aem-angular-test-2
 Author: Al JeMay
 Date:   3 October 2019
===========================================================
*/

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');

router.post('/login',(req,res,next)=>{
    const username = req.body.email;
    const password = req.body.password;
    User.getUserEmail(username,(success,user) => {
        if(success===User.hasError) throw success;
        if(success===false){
            return res.json({
                success: false,
                msg: user
            });
        } 

        User.comparePassword(password,(err, isMatch)=>{
            if(err===User.hasError) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn:604800 //// expires within a week
                });
                res.json({
                    success: true,
                    token: `JWT ${token}`,
                    user:{
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else{
                return res.json({
                    success: false,
                    msg: 'Wrong password!'
                });
            }
        });
    });
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user});
});

module.exports = router;