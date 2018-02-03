const User = require('../models/user');

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
			res.json(user);
		});
	});





}