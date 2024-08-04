const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const Person = require('./models/person');

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

  module.exports = passport;