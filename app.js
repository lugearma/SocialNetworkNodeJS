var express = require('express');

var app = express();

// app.engine();
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
	res.render('index.jade', { layout : false });
});

app.listen(3000);