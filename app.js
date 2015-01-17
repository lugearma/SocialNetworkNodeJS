var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var RedisStore = require('connect-redis')(session);

var Account = require('./models/Account');

var app = express();

// app.engine();
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret : 'botudoEsNegro',
	store : new RedisStore({}),
	resave: false,
	saveUninitialized: true
}));

mongoose.connect('mongodb://localhost/nodebackbone');

app.get('/', function (req, res){
	res.render('index');
});

//Register Handler
app.post('/register', function (req, res){

	var firstName = req.param('firstName','');
	var lastName = req.param('lastName', '');
	var email = req.param('email', null);
	var password = req.param('password', null);

	if(email == null || password == null){
		res.send(400);
		return;
	}

	Account.register(email, password, firstName, lastName);
	res.send(200);
});

//Login Handler
app.post('/login', function (req, res){
	console.log('login request');

	var email = req.param('email', null);
	var password = req.param('password', null);

	if (null == email || email.length < 1 || null == password || password.length <1){
		res.send(400);
		return;
	}

	Account.login(email, password, function (success){
		if (!success){
			res.send(400);
			return;
		}

		console.log('El login fue exito');
		res.send(200);
	});
});

//Forgot Handler
app.post('/forgotpassword', function (req, res){
	var hostname = req.handers.host;
	var restPasswordUrl = 'http://' + hostname + '/restpassword';
	var email = req.param('email', null);

	if (null == email || email.length < 1){
		res.send(400);
		return;
	}

	Account.forgotPassword(email, resetPasswordUrl, function (success){
		if (success)
			res.send(200);
		else
			res.send(404);
	});
});

//Handler resetPassword
app.get('/resetPassword', function (req, res){
	var accountId = req.param('accountId', null);
	res.render('resetPassword', { locals : { accountId : accountId }	});
});

app.post('/resetPassword', function (req, res){
	var accountId = req.param('accountId', null);
	var password = req.param('password', null);

	if (null != accountId && null != password)
		Account.changePassword(accountId, password);

	res.render('resetPasswordSuccess');
});

//Handler if Logedin
app.get('/account/authenticated', function (req, res){
	if(req.session.loggedIn)
		res.send(200);
	else
		res.send(401);
});

app.listen(3000);
console.log('Escuchando el 3000' );