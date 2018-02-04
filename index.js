//Main starting point of applicatin
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
//DB Setup
mongoose.connect('mongodb://127.0.0.1:27017/auth').then(function(res){
	// console.log(res);
},function(err){
	console.log("ERROR : ",err)
});
console.log("connect");
//App setup
//morgan log request
app.use(morgan('combined'));
//parse any body type to javascript obj
app.use(bodyParser.json({type: '*/*'}));

router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);

console.log("Server listening on port",port);

// /afs
