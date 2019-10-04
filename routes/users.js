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

router.post('/authenticate',(req,res,next)=>{
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
                    expiresIn:604800
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
                // jwt.sign({user}, config.secret, {expiresIn:'30s'}, (err,token)=>{
                //     res.json({
                //         success: true,
                //         token: `JWT ${token}`,
                //         user:{
                //             id: user.id,
                //             name: user.name,
                //             username: user.username,
                //             email: user.email
                //         }
                //     })
                // })
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
    // res.send('PROFILE')
    res.json({user:req.user});
});

router.get('/dashboard',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    // res.send('PROFILE')
    res.json({charts:{
            chartDonut: {
                labels: ['Sales Q1','Sales Q2','Sales Q3','Sales Q4'],
                data: [120, 150, 180, 90],
                type: 'doughnut'
            },
            chartbar: {
                labels:['2006','2007','2008','2009','2010','2011','2012'],
                type:'bar',
                legend:true,
                data:[
                    {
                        data: [65,59,80,81,56,55,40],
                        label: 'Series A',
                    },
                    {
                        data: [28,48,40,19,86,27,90],
                        label: 'Series B',
                    }
               ]
            },
            tableUsers: [ 
                {
                    fname: 'Mark',
                    lname: 'Otto',
                    username: '@mdo',
                },
                {
                    fname: 'Jacob',
                    lname: 'Throton',
                    username: '@fat',
                },
                {
                    fname: 'Larry',
                    lname: 'theBird',
                    username: '@twitter',
                }
            ]
        }
    });
});

module.exports = router;