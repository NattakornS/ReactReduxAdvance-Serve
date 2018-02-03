const Authentication = require('./controllers/authentication');

module.exports = function(app){
	// app.get('/',function(req,res,next){
	// 	res.send(['bootle','phone','paper']);
	// });
	app.get('/',function (req,res,next) {
		console.log("Root");
		res.send({sucess:true});
	});

	app.post('/signup',Authentication.signup);

}