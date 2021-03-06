const express = require('express');
const router = express.Router();

const mysqlConnection = require('./connection');

const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require("body-parser");


var storage = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null, './api/routes/uploads');    
   }, 
   filename: function (req, file, cb) { 
      cb(null , file.originalname);   
   }
});
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

var upload = multer({ storage: storage,limits : {fileSize : 1000000} }).single("demo_image");

router.post("/image", (req, res) => {
   upload(req, res, (err) => {
    if(err) {
      res.status(400).json(err);
    }
     res.json(req.file);
  });
});

// router.post('/formUser',(req,res,next) => {



	// name = req.body.name, 
 //   email = req.body.email, 
 //   password = req.body.password
	
	// // console.log(name);

	// /*
	// 	{
	// 		"name" : "roshan posakya",
	// 		"email" : "r13@gmail.com",
	// 		"password" : "admin123"
	// 	}
	// */

	// let stmt = "INSERT INTO super_admins(name,email,password) VALUES (?,?,?)";

	// let todo = [name,email,password];

	// mysqlConnection.query(stmt,todo, (err, results, fields) => {

	// 		if (!err) {
	// 				res.status(200).json({
 // 						status: true,
	// 					message: 'user added',
	// 					user_data: fields
	// });
	// 			}else{
	// 				res.status(200).json({
 // 						status: false,
	// 					message: err,

						
	// });
	// 			}
		
	// 	});

// });


router.get('/',(req,res,next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');



	mysqlConnection.query(
			"select * from gps_statuses", (err, rows, fields) => {
				if (!err) {
					res.status(200).json({
 						status: true,
						message: 'user found',
						user_data: rows
	});
				}else{
					res.status(200).json({
 						status: false,
						message: 'no user found',
						
	});
				}
			}
		);

});

router.post('/user',(req,res,next) => {


	/*
		{
			"name" : "roshan posakya",
			"email" : "r13@gmail.com",
			"password" : "admin123"
		}
	*/

	let stmt = "INSERT INTO super_admins(name,email,password) VALUES (?,?,?)";

	let todo = [req.body['name'],req.body['email'],req.body['password']];

	mysqlConnection.query(stmt,todo, (err, results, fields) => {

			if (!err) {
					res.status(200).json({
 						status: true,
						message: 'user added',
						user_data: fields
	});
				}else{
					res.status(200).json({
 						status: false,
						message: err,

						
	});
				}
		
		});

});



router.post('/',(req, res, next) => {


	/*
        {
    
  "data" :  [{
	"name" : "roshan posakya",
	"email" : "r8@gmail.com",
	"password" : "admin123"
},{
	"name" : "roshan posakya1",
	"email" : "r9@gmail.com",
	"password" : "admin1231"
},{
	"name" : "roshan posakya1",
	"email" : "r7@gmail.com",
	"password" : "admin1231"
}
    ]
    
  }

	*/	
	let stmt = "INSERT INTO super_admins(name,email,password) VALUES ?";
	
	var todo = [];
	var todos = [];


req.body['data'].forEach(function(item) {

	todo = [item.name,item.email,item.password];
    todos.push(todo);

	});


	mysqlConnection.query(stmt,[todos], (err, results, fields) => {

			if (!err) {
					res.status(200).json({
 						status: true,
						message: 'user added',
						user_data: results
	});
				}else{
					res.status(200).json({
 						status: false,
						message: err,

						
	});
				}
		
		});

});



router.get('/:productId', (req,res,next) => {
	// const id = req.params.productId;

	mysqlConnection.query(
			"select * from gps_statuses where id = "+req.params.productId, (err, rows, fields) => {
				if (!err) {
					res.status(200).json({
 						status: true,
						message: 'user found',
						user_data: rows
	});
				}else{
					res.status(200).json({
 						status: false,
						message: 'no user found',
						
	});
				}
			}
		);


});

module.exports = router;
