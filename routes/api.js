var express = require('express');
var app = express();

app.get('/currClass/:student_id/:beacon_id', function(req, res) {
	req.getConnection(function(error, conn) {
		let studentId = conn.escape(req.params.student_id);
		// let beaconId = mysql.escape(req.params.beacon_id);
		let beaconId = 'test';
		let sql = 
			'SELECT co.name, cl.start_time, cl.end_time ' +
			'FROM student_has_course sco ' +
			'INNER JOIN `course` co ON co.`course_id` = sco.`fk_course_id` ' +
			'INNER JOIN `class` cl ON cl.`fk_course_id` = (' +
				'SELECT fk_course_id FROM class WHERE fk_room_id = (' + 
						'SELECT room_id FROM room WHERE beacon="' + beaconId + '")) ' +
			'WHERE NOW() BETWEEN (cl.`start_time` - INTERVAL 5 MINUTE) AND (cl.`start_time` + INTERVAL 1 MINUTE)';
		// console.log(sql);
		conn.query(sql, function(err, rows, fields) {
			if(err) throw err;
			// if(!rows.length) {
			// 	res.json(n) null;
			// } else {
			// 	return rows[0];
			// }
			var resultJson = JSON.stringify(rows);
    		resultJson = JSON.parse(resultJson);
    		res.json(resultJson);
		});
	});
});

app.get('/major', function(req, res) {
    req.getConnection(function(error, conn) {
    	conn.query('SELECT * FROM `major`', function(err, rows, fields) {
    		if(err) throw err;
    		
    		var resultJson = JSON.stringify(rows);
    		resultJson = JSON.parse(resultJson);
    		res.json(resultJson);
    	});
    });
});

app.get('/course', function(req, res) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM `course`', function(err, rows, fields) {
			if(err) throw err;

			var resultJson = JSON.stringify(rows);
    		resultJson = JSON.parse(resultJson);
    		res.json(resultJson);
		});
	});
});

app.get('/room', function(req, res) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM `room`', function(err, rows, fields) {
			if(err) throw err;

			var resultJson = JSON.stringify(rows);
    		resultJson = JSON.parse(resultJson);
    		res.json(resultJson);
		});
	});
})

module.exports = app;