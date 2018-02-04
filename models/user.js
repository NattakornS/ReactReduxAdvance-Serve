const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//Define our model
const userSechema = new Schema({
	email: {type: String, unique: true ,lowercase: true},
	password: String
});
// Onsave Hook, encrypt password
// Before saving a model, run this function
userSechema.pre('save',function(next){
	// get acess to user model
	const user = this;
	// generate a salt then ru n callback
	bcrypt.genSalt(10, function(err ,salt){
		if(err){
			return next(err);
		}
		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password,salt,null,function(err,hash){
			if(err){return next(err);}
			//overwritge plain text password with encrypted password
			user.password = hash;
			next();
		})
	});
});
userSechema.methods.comparePassword = function(candidatePassword,callback){
	bcrypt.compare(candidatePassword,this.password,function(err, isMatch){
		if(err){return callback(err);}

		callback(null, isMatch);
	});
}

//Create the model class
const ModelClass = mongoose.model("user",userSechema);


//Export the model
module.exports = ModelClass;