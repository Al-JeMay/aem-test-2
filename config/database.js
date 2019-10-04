/*
===========================================================
 Title:  Authenticate User & Dashbord - aem-angular-test-2
 Author: Al JeMay
 Date:   3 October 2019
===========================================================
*/

//// Should comes from DB
//// Should encrypt all user's info
//// This just MOCK user's data
module.exports = {
    testuser:{
        id:123456,
        name:'Ahmad Azman', 
        username:'aljemay',
        email:'user@aemenersol.com',
        password:'Test@123'
    },
    secret:"aljemay12345"
}