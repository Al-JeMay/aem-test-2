/*
===========================================================
 Title:  Authenticate User & Dashbord - aem-angular-test-2
 Author: Al JeMay
 Date:   3 October 2019
===========================================================
*/

//// Should comes from DB
//// Should encrypt all user's info
//// This just MOCK User's info
module.exports = {
    testuser:{
        id:123456,
        name:'Ahmad Azman', 
        username:'Al~Jemay',
        email:'user@aemenersol.com',
        password:'Test@123'
    },
    charts:{
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
    },
    secret:"aljemay12345"
}