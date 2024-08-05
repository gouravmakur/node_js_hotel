const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require("./auth");
const LocalStrategy = require('passport-local').Strategy; 
const Person = require('./models/person');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

const PORT  = process.env.PORT || 3000;

//authentication



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });


app.get('/', function (req, res) {
  res.send('Welcome To My Hotel')
})

const personRoutes = require('./Routes/personRoutes');
app.use('/person', localAuthMiddleware, personRoutes);

const menuRoute = require('./Routes/menuRoutes');
app.use('/menu', menuRoute);


app.listen(PORT, ()=>{
    console.log('server is active');
});