var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.render('pages/index', 
 		{
 			title: 'Home',
 			module: 'Home'
 		}
 	);
});

module.exports = app;