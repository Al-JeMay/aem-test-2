/*
===========================================================
 Title:  Authenticate User & Dashbord - aem-angular-test-2
 Author: Al JeMay
 Date:   3 October 2019
===========================================================
*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

//// User route
const users = require('./routes/users');
// const charts = require('./routes/charts');

//// Port number
const port = 3000;

//// CORS Middleware
app.use(cors());

//// Set static folder
app.use(express.static(path.join(__dirname,'public')));

//// Body Parser Middelware
app.use(bodyParser.json());

//// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
// app.use('/dashboard', charts);

//// Index Route
app.get('/', (req, res)=>{
    res.send('Invalid Endpoint!')
})

//// Start server
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})