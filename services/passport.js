const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStategy  = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOption = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOption,function(email,password,done){
    // Verify this email and password, call done eith the user
    // if it is the correct email and password
    // otherwise, call done with false
   
    User.findOne({email: email},function(err,user){
        if(err){return done(err)}
        if(!user){return done(null,fasle)}
        //compare password - is 'password' equal to user.password?
        user.comparePassword(password,function(err,isMatch){
            
            if(err){return done(err);}
            if(!isMatch){return done(null,false);}

            return done(null,user);
        });
    });
});

//setup option for JWT Strategy
const jwtOption = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};
// Create JWT strategy
const jwtLogin = new JwtStategy(jwtOption,function(payload,done){
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' wih that other
    //otherwise, call done without a user object
    User.findById(payload.sub,function(err,user){
        if(err){return done(err,fasle);}

        if(user){
            done(null,user);
        }else{
            done(null,false);
        }
    })

});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);