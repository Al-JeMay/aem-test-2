/*
===========================================================
 Title:  Authenticate User & Dashbord - aem-angular-test-2
 Author: Al JeMay
 Date:   3 October 2019
===========================================================
*/

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        // console.log('jwt_payload#####',jwt_payload)
        User.getUserID(jwt_payload.id,(success, user) => {
            if(success===User.hasError){
                return done(success, false);
            }else{
                if(success){
                    return done(null, user);
                }else{
                    return done(null, false);
                }
            }
        });
    }));
}
