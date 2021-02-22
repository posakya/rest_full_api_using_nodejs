const express = require('express');

const app = express();

const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');
// const path = require('path');
const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const mysqlConnection = require('./api/routes/connection');

// c onst upload = multer({dest:'uploads/'}).single("demo_image");
// app.use(express.json());
// app.use(express.urlencoded());

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

var storage = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null, './api/routes/uploads');    
   }, 
   filename: function (req, file, cb) { 
      cb(null , file.originalname);   
   }
});


var upload = multer({ storage: storage,limits : {fileSize : 1000000} }).single("demo_image");


app.post("/image", (req, res) => {
   upload(req, res, (err) => {
    if(err) {
      res.status(400).json("Something went wrong!");
    }
     res.json(req.file);
  });
});
// app.post('/file', upload.single('file'), (req,res,next) => {
// 	const file = req.file
// 	console.log(file);
// });


// app.use(express.static(__dirname, 'public'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
// app.use(express.bodyParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(express.json());
// app.use((req, res, next) => {
// 	res.status(200).json({
// 		message: 'It is working!!'
// 	});
// });

module.exports = app;