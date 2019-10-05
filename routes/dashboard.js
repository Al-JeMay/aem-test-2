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

const config = require('../config/database');

router.get('/',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json(config.charts);
});

module.exports = router;