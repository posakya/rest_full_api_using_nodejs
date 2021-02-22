const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
	
	 host: "localhost",
 	 user: "root",
 	 password: "",
  	 database: "gps_track",


});

mysqlConnection.connect((err)=>{
	if (!err) {
		console.log("connected");
	}else{
		console.log("connection failed");
	}
});

module.exports = mysqlConnection;