const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenFOrUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat:timestamp},config.secret);
}
exports.signin = function(req,res,next){
	// User has already had their email and password auth's
	// We just need to give them a token
	res.send({token: tokenFOrUser(req.user)});

}
exports.signup = function (req,res,next) {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		return res.status(422).send({error: 'You must provide email and password '});
	}
	//See if a user with the given email exists
	User.findOne({email:email},function(err,existingUser){
		if(err){
			return next(err);
		}
		//If a user with email does exist , return error
		if(existingUser){
			return res.status(422).send({error:'Email is in use'});
		}
		//If a user with email does NOT exit , create and save userb record
		const user = new User({
			email: email,
			password: password
		});
		//Repond to request indicating the user was created 
		user.save(function(err){
			if(err){return next(err);}
			res.json({token: tokenFOrUser(user)});
		});
	});





}