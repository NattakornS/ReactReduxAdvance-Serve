const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session : false});
const requireSignin = passport.authenticate('local',{session : false});

module.exports = function(app){
	// app.get('/',function(req,res,next){
	// 	res.send(['bootle','phone','paper']);
	// });
	// app.get('/',function (req,res,next) {
	// 	console.log("Root");
	// 	res.send({sucess:true});
	// });
	app.get('/',requireAuth , function(req,res){
		res.send({hi: 'there'});
	});
	app.post('/signin',requireSignin,Authentication.signin)
	app.post('/signup',Authentication.signup);

}