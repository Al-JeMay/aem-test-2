/*
===========================================================
 Title:  Authenticate User & Dashbord - aem-angular-test-2
 Author: Al JeMay
 Date:   3 October 2019
===========================================================
*/

const config = require('../config/database');
const hasError = 'HAS_ERROR';

exports.hasError = hasError;

////A MOCK User's Model
////Define all user's models
////such as - register new user
////        - get user ID
////        - get user EMAIL
////        - compare user PASSWORD

////find@get user ID from DB
////this jut mock activity, data should comes from DB
module.exports.getUserID = function(id,callback) {
    try{
        if(id === config.testuser.id){
            callback(true,config.testuser)
        }else{
            callback(false,`No exist user with this ${id}`)
        }
    }catch(err){
        callback(hasError,err)
    }
    
}

////find@get user EMAIL from DB
////this jut mock activity, data should comes from DB
module.exports.getUserEmail = function(email,callback) {
    try{
        if(email === config.testuser.email){
            callback(true,config.testuser)
        }else{
            callback(false,`No exist user with this email address: ${email}`)
        }
    }catch(err){
        callback(hasError,err)
    }
}

////compare user password with the real password from DB
////this jut mock activity, data should comes from DB
module.exports.comparePassword = function(candidatePassword, callback){
    try{
        if(candidatePassword === config.testuser.password){
            callback(null, true);
        }else{
            callback(null, false);
        }
    }catch(err){
        callback(hasError,err)
    }
}

