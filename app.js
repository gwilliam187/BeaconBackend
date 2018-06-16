const express = require('express');
const app = express();
const path = require('path');

// Connecting to MySQL
const mysql = require('mysql');
const myconn = require('express-myconnection');
const config = require('./config');
const dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db,
	dateStrings: config.database.dateStrings
};
app.use(myconn(mysql, dbOptions, 'pool'))

app.set('view engine', 'ejs');

const route = require('./routes/routes');
const api = require('./routes/api')

app.use('/', route);
app.use('/api', api);

app.use('/webarch', express.static(__dirname + "/views/webarch"));
app.use('/assets', express.static(__dirname + "/views/assets"));

app.listen(3000, function() {
	console.log("Listening on port 3000");
});