const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const Person = require('./models/person');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

const PORT  = process.env.PORT || 3000;

//authentication
passport.use(new LocalStrategy(async (username, password, done) =>{

  try {
    console.log('Recived Credential' , username , password);
    const user = await Person.findOne({username : username});

    if(!user){
      return done(null, false , {message : 'Invalid username'});
    }

    const isPasswordMatch = user.password === password ? true : false;

    if(isPasswordMatch){
      return done(null, user);
    }
    else{
      return done(null, false , {message : 'Incorrect Password'});
    }

  } catch (error) {
    
    return done(error);
  }

}));


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',localAuthMiddleware, function (req, res) {
  res.send('Welcome To My Hotel')
})

const personRoutes = require('./Routes/personRoutes');
app.use('/person' , personRoutes);

const menuRoute = require('./Routes/menuRoutes');
app.use('/menu', menuRoute);


app.listen(PORT, ()=>{
    console.log('server is active');
});