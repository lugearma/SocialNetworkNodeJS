var express = require('express');

var Account = require('./models/Account');

var app = express();

// app.engine();
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
	res.render('index.jade', { layout : false });
});

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

app.listen(3000);
console.log('Escuchando el 3000' );